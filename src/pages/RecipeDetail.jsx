import { recipes } from '../data/recipes'
import '../styles/pages.css'

function RecipeDetail({ recipeId, onBack }) {
  const recipe = recipes.find(r => r.id === recipeId)

  if (!recipe) {
    return <div className="recipe-detail">Recipe not found</div>
  }

  return (
    <div className="recipe-detail">
      <button className="back-button" onClick={onBack}>← Back to Recipes</button>
      
      <article className="recipe-article">
        <header className="recipe-header">
          <div className="recipe-title-section">
            <h1>{recipe.title}</h1>
            <p className="recipe-meta-info">
              By <strong>{recipe.author}</strong> | {new Date(recipe.date).toLocaleDateString()}
            </p>
            <div className="recipe-tags">
              <span className="tag category">{recipe.category}</span>
              <span className="tag difficulty">{recipe.difficulty}</span>
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
            <h3>Servings</h3>
            <p>{recipe.servings}</p>
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
              <li key={index}>
                <input type="checkbox" id={`ingredient-${index}`} />
                <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe-section instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
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
