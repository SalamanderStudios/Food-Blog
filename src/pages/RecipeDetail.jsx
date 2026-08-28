import { recipes } from '../data/recipes'
import { useState, useEffect, useMemo, useRef } from 'react'
import { saveRating, getRatings } from '../utils/ratingService'
import { hasDeviceRated, markDeviceRated, getDeviceRating, getDeviceRatingEntryKey } from '../utils/deviceId'
import { getAverageRating } from '../utils/recipeHelpers'
import '../styles/pages.css'

function RecipeDetail({ recipeId, onBack }) {
  const recipe = useMemo(() => recipes.find(r => r.id === recipeId), [recipeId])
  const [userRating, setUserRating] = useState(0)
  const [hasRated, setHasRated] = useState(false)
  const [allRatings, setAllRatings] = useState([])
  const [hoveredStar, setHoveredStar] = useState(0)
  const unsubscribeRef = useRef(null)

  // Fetch ratings from Firebase on component mount and set up real-time listener
  useEffect(() => {
    if (!recipe) {
      return undefined
    }

    // Check if this device has already rated this recipe using fingerprint
    const checkDeviceRating = async () => {
      try {
        const alreadyRated = await hasDeviceRated(recipe.id)
        if (alreadyRated) {
          const storedRating = getDeviceRating(recipe.id)
          if (storedRating) {
            setHasRated(true)
            setUserRating(storedRating)
          }
        }
      } catch (error) {
        console.error('Error checking device rating:', error)
      }
    }

    checkDeviceRating()

    unsubscribeRef.current = getRatings(recipe.id, (ratings) => {
      setAllRatings(ratings)
    })

    // Cleanup listener on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [recipe])

  if (!recipe) {
    return <div className="recipe-detail">Recipe not found</div>
  }

  const handleStarClick = async (rating) => {
    // Check if they've already rated
    if (hasRated) {
      // Allow update to a different rating
      const confirmUpdate = window.confirm('Update your rating for this recipe?')
      if (!confirmUpdate) return
    }
    
    setUserRating(rating)
    setHasRated(true)
    
    // Get the existing entry key if they've already rated (for updates)
    const existingEntryKey = hasRated ? getDeviceRatingEntryKey(recipe.id) : null
    
    // Save to Firebase (either new entry or update existing)
    const entryKey = await saveRating(recipe.id, rating, existingEntryKey)
    
    // Mark this device as having rated using device fingerprint
    // Use existing key if updating, otherwise use the returned key from new rating
    await markDeviceRated(recipe.id, rating, existingEntryKey || entryKey)
  }

  const averageRating = allRatings.length > 0 
    ? (allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length).toFixed(1)
    : 'No ratings yet'

  return (
    <div className="recipe-detail">
      <button className="back-button" onClick={onBack}>← Back to Recipes</button>
      
      <article className="recipe-article">
        <header className="recipe-header">
          <div className="recipe-title-section">
            <h1>{recipe.title}</h1>
            <p className="recipe-meta-info">
              By <strong>{recipe.author}</strong> | {new Date(recipe.date + 'T00:00:00').toLocaleDateString()}
            </p>
            <p className="recipe-country">
              <strong>Country:</strong> {recipe.country}
            </p>
            <div className="recipe-tags">
              <span className="tag category">{recipe.category}</span>
              <span className={`tag difficulty difficulty-${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>
              <span className="tag region">{recipe.region}</span>
              {recipe.borgNight && <span className="tag borgnight">B.O.R.G. Night</span>}
              <span className={`tag vegetarian ${recipe.vegetarian ? 'vegetarian-yes' : 'vegetarian-no'}`}>
                {recipe.vegetarian ? 'Vegetarian' : 'Contains Meat'}
              </span>
            </div>
          </div>
        </header>

        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="recipe-hero-image"
        />

        <div className="recipe-info-grid">
          <div className="info-box">
            <h3>Prep Time</h3>
            <p>{recipe.prepTime}</p>
          </div>
          <div className="info-box">
            <h3>Cook Time</h3>
            <p>{recipe.cookTime}</p>
          </div>
          <div className="info-box">
            <h3>Total Time</h3>
            <p>{recipe.totalTime}</p>
          </div>
          <div className="info-box">
            <h3>Servings</h3>
            <p>{recipe.servings}</p>
          </div>
          <div className="info-box">
            <h3>B.O.R.G. Rating</h3>
            <p>⭐ {getAverageRating(recipe.ratings).toFixed(1)}/5</p>
          </div>
          <div className="info-box">
            <h3>Reader's Rating</h3>
            <p>{typeof averageRating === 'number' ? `⭐ ${averageRating}/5` : averageRating}</p>
          </div>
          <div className="info-box rating-box">
            <h3>Your Rating</h3>
            <div className="user-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`rating-star ${star <= (hoveredStar || userRating) ? 'filled' : ''} ${hasRated ? 'disabled' : ''}`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => !hasRated && setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  style={{ cursor: hasRated ? 'not-allowed' : 'pointer' }}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>

        <section className="recipe-section">
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </section>

        <section className="recipe-section ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              ingredient.header ? (
                <li key={index} className="ingredient-header">
                  <strong>{ingredient.header}</strong>
                </li>
              ) : (
                <li key={index}>
                  <input type="checkbox" id={`ingredient-${index}`} />
                  <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
                </li>
              )
            ))}
          </ul>
        </section>

        <section className="recipe-section instructions">
          <h2>Instructions</h2>
          <div className="instructions-content">
            {recipe.instructions.map((instruction, index) => (
              instruction.header ? (
                <h3 key={index} className="instruction-header">{instruction.header}</h3>
              ) : instruction === "" ? (
                <div key={index} style={{ height: '10px' }}></div>
              ) : (
                <div key={index} className="instruction-step">
                  <strong>{recipe.instructions.slice(0, index).filter(i => i !== "" && !i.header).length + 1}.</strong>
                  <span>{instruction}</span>
                </div>
              )
            ))}
          </div>
        </section>

        <section className="recipe-section tips">
          <h2>💡 Tips & Variations</h2>
          <p>Feel free to customize this recipe to your taste! You can add your own ingredients or modify the cooking time based on your oven's characteristics.</p>
        </section>
      </article>
    </div>
  )
}

export default RecipeDetail
