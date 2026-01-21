import { recipes } from '../data/recipes'
import '../styles/pages.css'

function Home({ onRecipeClick }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to B.O.R.G. Night</h2>
          <p>Discover the recipes made on B.O.R.G Night</p>
        </div>
      </section>

      <section className="featured-recipes">
        <h2>Featured Recipes</h2>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
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

      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get weekly recipes delivered to your inbox</p>
        <form className="newsletter-form">
          <input 
            type="email" 
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  )
}

export default Home
