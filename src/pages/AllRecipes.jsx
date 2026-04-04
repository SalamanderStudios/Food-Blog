import { recipes } from '../data/recipes'
import { useState } from 'react'
import { getAverageRating } from '../utils/recipeHelpers'
import '../styles/pages.css'

function AllRecipes({ onRecipeClick }) {
  const [sortBy, setSortBy] = useState('date')
  const [selectedDifficulties, setSelectedDifficulties] = useState({
    Easy: true,
    Medium: true,
    Hard: true
  })
  const [selectedCategories, setSelectedCategories] = useState({
    Appetizers: true,
    Salads: true,
    'Main Courses': true,
    Soups: true
  })
  const [showVegetarianOnly, setShowVegetarianOnly] = useState(false)
  const [showBorgNightOnly, setShowBorgNightOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulties(prev => ({
      ...prev,
      [difficulty]: !prev[difficulty]
    }))
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  // Helper function to normalize text by removing diacritics
  const normalizeText = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  }

  // Sort recipes based on selected sort option
  const getSortedRecipes = () => {
    let filtered = [...recipes]
    
    // Apply difficulty filter - only show selected difficulties
    const selectedDiffs = Object.keys(selectedDifficulties).filter(d => selectedDifficulties[d])
    if (selectedDiffs.length > 0) {
      filtered = filtered.filter(recipe => selectedDiffs.includes(recipe.difficulty))
    }

    // Apply category filter - only show selected categories
    const selectedCats = Object.keys(selectedCategories).filter(c => selectedCategories[c])
    if (selectedCats.length > 0) {
      filtered = filtered.filter(recipe => selectedCats.includes(recipe.category))
    }

    // Apply vegetarian filter
    if (showVegetarianOnly) {
      filtered = filtered.filter(recipe => recipe.vegetarian)
    }

    // Apply B.O.R.G. Night filter
    if (showBorgNightOnly) {
      filtered = filtered.filter(recipe => recipe.borgNight)
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const normalizedSearchTerm = normalizeText(searchTerm)
      filtered = filtered.filter(recipe => 
        normalizeText(recipe.title).includes(normalizedSearchTerm) ||
        normalizeText(recipe.author).includes(normalizedSearchTerm) ||
        normalizeText(recipe.description).includes(normalizedSearchTerm) ||
        normalizeText(recipe.country).includes(normalizedSearchTerm) ||
        normalizeText(recipe.region).includes(normalizedSearchTerm)
      )
    }

    // Apply sorting
    switch(sortBy) {
      case 'date':
        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
      case 'borg-rating':
        return filtered.sort((a, b) => b.rating - a.rating)
      case 'reader-rating':
        return filtered.sort((a, b) => (b.averageReaderRating || 0) - (a.averageReaderRating || 0))
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
        return filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
      default:
        return filtered
    }
  }

  const sortedRecipes = getSortedRecipes()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h2>Recipes</h2>
          <p>Browse our complete collection of B.O.R.G. Night recipes</p>
        </div>
      </section>

      <section className="featured-recipes">
        <div className="search-box-container">
          <input
            type="text"
            placeholder="Search recipes by name, author, country, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-sort-container">
          <div className="filters-section">
            <div className="filter-group">
              <label className="filter-label">Difficulty</label>
              <div className="checkboxes-row">
                {['Easy', 'Medium', 'Hard'].map(difficulty => (
                  <label key={difficulty} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedDifficulties[difficulty]}
                      onChange={() => handleDifficultyChange(difficulty)}
                    />
                    <span>{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Dish Type</label>
              <div className="checkboxes-row">
                {['Appetizers', 'Salads', 'Main Courses', 'Soups'].map(category => (
                  <label key={category} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories[category]}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Options</label>
              <div className="checkboxes-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={showVegetarianOnly}
                    onChange={() => setShowVegetarianOnly(!showVegetarianOnly)}
                  />
                  <span>Vegetarian</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={showBorgNightOnly}
                    onChange={() => setShowBorgNightOnly(!showBorgNightOnly)}
                  />
                  <span>B.O.R.G. Night</span>
                </label>
              </div>
            </div>
          </div>

          <div className="sort-section">
            <label htmlFor="sort-select" className="sort-label">Sort by</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="date">Most Recent</option>
              <option value="borg-rating">B.O.R.G. Rating</option>
              <option value="reader-rating">Reader Rating</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>
        </div>

        <div className="recipe-count">
          Showing {sortedRecipes.length} recipe{sortedRecipes.length !== 1 ? 's' : ''}
        </div>

        <div className="recipe-grid">
          {sortedRecipes.map((recipe) => (
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
                  <span className="rating">⭐ {getAverageRating(recipe.ratings).toFixed(1)}/5</span>
                </div>
                <p className="recipe-description">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AllRecipes
