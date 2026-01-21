import { useState } from 'react'
import './App.css'

// Simple in-memory routing component (no external dependencies needed)
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import About from './pages/About'

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
              🍽️ Delicious Bites
            </h1>
            <p className="tagline">Homemade recipes, made simple</p>
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
                className={`nav-button ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => navigateTo('about')}
              >
                About
              </button>
            </li>
            <li>
              <button 
                className={`nav-button ${currentPage === 'contact' ? 'active' : ''}`}
              >
                Contact
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
        {currentPage === 'recipe' && <RecipeDetail recipeId={selectedRecipeId} onBack={() => navigateTo('home')} />}
        {currentPage === 'about' && <About />}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Delicious Bites. All rights reserved.</p>
          <div className="social-links">
            <a href="#" title="Facebook">f</a>
            <a href="#" title="Instagram">📷</a>
            <a href="#" title="Twitter">𝕏</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
