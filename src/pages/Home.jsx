import { recipes } from '../data/recipes'
import '../styles/pages.css'

function Home({ onRecipeClick }) {
  // Filter for B.O.R.G. Night recipes only
  const borgRecipes = recipes.filter(recipe => recipe.borgNight === true)
  
  // Sort recipes by date (most recent first) and take the 6 most recent
  const recentRecipes = [...borgRecipes]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)

  // Sort recipes by B.O.R.G. rating (highest first) and take top 6 from ALL recipes
  const favoriteRecipes = [...recipes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  // Get a random recipe from all recipes
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to B.O.R.G. Night</h2>
          <p>Discover the recipes made on B.O.R.G. Night</p>
        </div>
      </section>

      <section className="featured-recipes">
        <h2>Recent B.O.R.G. Recipes</h2>
        <div className="recipe-grid">
          {recentRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="recipe-card"
              onClick={() => onRecipeClick(recipe.id)}
            >
              <div className="recipe-image-container">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="recipe-image"
                />
                <span className="recipe-badge">{recipe.category}</span>
              </div>
              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p className="recipe-author">By {recipe.author}</p>
                <div className="recipe-meta">
                  <span className={`difficulty difficulty-${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>
                  <span className="tag region">{recipe.region}</span>
                  <span className="rating">⭐ {recipe.rating}/5</span>
                </div>
                <p className="recipe-description">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-recipes">
        <h2>Favorite Recipes</h2>
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="recipe-card"
              onClick={() => onRecipeClick(recipe.id)}
            >
              <div className="recipe-image-container">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="recipe-image"
                />
                <span className="recipe-badge">{recipe.category}</span>
              </div>
              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p className="recipe-author">By {recipe.author}</p>
                <div className="recipe-meta">
                  <span className={`difficulty difficulty-${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>
                  <span className="tag region">{recipe.region}</span>
                  <span className="rating">⭐ {recipe.rating}/5</span>
                </div>
                <p className="recipe-description">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="random-recipe-section">
        <button 
          className="random-recipe-button"
          onClick={() => onRecipeClick(randomRecipe.id)}
        >
          Try a Random Recipe
        </button>
      </section>
    </div>
  )
}

export default Home
