/**
 * @typedef {Object} RecipeIngredient
 * @property {string} [header] - Optional section header for ingredients
 */

/**
 * @typedef {Object} RecipeInstruction
 * @property {string} [header] - Optional section header for instructions
 */

/**
 * @typedef {Object} Recipe
 * @property {number} id - Unique recipe identifier
 * @property {string} title - Recipe title
 * @property {string} author - Recipe author name
 * @property {string} country - Country of origin
 * @property {string} region - Geographic region
 * @property {string} date - Date recipe was added (YYYY-MM-DD format)
 * @property {string} category - Recipe category (Appetizers, Salads, Main Courses, Soups)
 * @property {string} image - Image asset import
 * @property {number} rating - B.O.R.G. rating (1-5)
 * @property {string} prepTime - Preparation time (e.g., "15 minutes")
 * @property {string} cookTime - Cooking time (e.g., "12 minutes")
 * @property {string|number} servings - Number of servings or portion description
 * @property {string} difficulty - Recipe difficulty (Easy, Medium, Hard)
 * @property {boolean} vegetarian - Whether recipe is vegetarian
 * @property {string} description - Recipe description
 * @property {(RecipeIngredient|string)[]} ingredients - Array of ingredients (strings or header objects)
 * @property {(RecipeInstruction|string)[]} instructions - Array of instructions (strings or header objects)
 */

/**
 * Creates a recipe object with all required fields
 * @param {Recipe} recipeData - Recipe data object
 * @returns {Recipe} Complete recipe object with totalTime getter
 */
export function createRecipe(recipeData) {
  const { calculateTotalTime } = require('../utils/recipeHelpers.js');
  
  return {
    ...recipeData,
    get totalTime() {
      return calculateTotalTime(this.prepTime, this.cookTime);
    }
  };
}
