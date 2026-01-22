import { useState } from 'react'
import './App.css'

// Simple in-memory routing component (no external dependencies needed)
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import About from './pages/About'
import AllRecipes from './pages/AllRecipes'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedRecipeId, setSelectedRecipeId] = useState(null)

  const navigateTo = (page, recipeId = null) => {
    setCurrentPage(page)
    if (recipeId) {
      setSelectedRecipeId(recipeId)
    }
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      <header className="header">
        <nav className="navbar">
          <div className="logo-section">
            <h1 onClick={() => navigateTo('home')} className="logo">
              🍽️ B.O.R.G. Night
            </h1>
            <p className="tagline">Bites Of Random Geography</p>
          </div>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${currentPage === 'all-recipes' ? 'active' : ''}`}
                onClick={() => navigateTo('all-recipes')}
              >
                Recipes
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => navigateTo('about')}
              >
                About
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        {currentPage === 'home' && <Home onRecipeClick={(id) => {
          setSelectedRecipeId(id)
          navigateTo('recipe', id)
        }} />}
        {currentPage === 'all-recipes' && <AllRecipes onRecipeClick={(id) => {
          setSelectedRecipeId(id)
          navigateTo('recipe', id)
        }} />}
        {currentPage === 'recipe' && <RecipeDetail recipeId={selectedRecipeId} onBack={() => navigateTo('home')} />}
        {currentPage === 'about' && <About />}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 B.O.R.G. Night. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
