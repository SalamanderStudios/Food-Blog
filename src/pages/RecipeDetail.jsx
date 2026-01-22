import { recipes } from '../data/recipes'
import { useState, useEffect, useRef } from 'react'
import { saveRating, getRatings } from '../utils/ratingService'
import '../styles/pages.css'

function RecipeDetail({ recipeId, onBack }) {
  const recipe = recipes.find(r => r.id === recipeId)
  const [userRating, setUserRating] = useState(0)
  const [hasRated, setHasRated] = useState(false)
  const [allRatings, setAllRatings] = useState([])
  const [loading, setLoading] = useState(true)
  const unsubscribeRef = useRef(null)

  if (!recipe) {
    return <div className="recipe-detail">Recipe not found</div>
  }

  // Fetch ratings from Firebase on component mount and set up real-time listener
  useEffect(() => {
    setLoading(true)
    unsubscribeRef.current = getRatings(recipe.id, (ratings) => {
      setAllRatings(ratings)
      setLoading(false)
    })

    // Cleanup listener on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [recipe.id])

  const handleStarClick = async (rating) => {
    setUserRating(rating)
    setHasRated(true)
    // Save to Firebase - the real-time listener will automatically update
    await saveRating(recipe.id, rating)
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
              <span className={`tag vegetarian ${recipe.vegetarian ? 'vegetarian-yes' : 'vegetarian-no'}`}>
                {recipe.vegetarian ? '🌱 Vegetarian' : 'Contains Meat'}
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
            <p>⭐ {recipe.rating}/5</p>
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
                  className={`rating-star ${star <= userRating ? 'filled' : ''}`}
                  onClick={() => handleStarClick(star)}
                >
                  ⭐
                </span>
              ))}
            </div>
            {hasRated && <p className="rating-feedback">Thanks for rating!</p>}
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
