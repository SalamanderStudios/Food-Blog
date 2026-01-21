import { database } from '../config/firebase'
import { ref, push, onValue, query, orderByChild } from 'firebase/database'

export const saveRating = async (recipeId, rating) => {
  try {
    console.log('Saving rating:', recipeId, rating)
    const ratingsRef = ref(database, `ratings/recipe_${recipeId}`)
    await push(ratingsRef, {
      rating,
      timestamp: new Date().toISOString()
    })
    console.log('Rating saved successfully')
    return true
  } catch (error) {
    console.error('Error saving rating:', error)
    return false
  }
}

export const getRatings = (recipeId, callback) => {
  try {
    console.log('Setting up listener for recipe:', recipeId)
    const ratingsRef = ref(database, `ratings/recipe_${recipeId}`)
    const unsubscribe = onValue(ratingsRef, (snapshot) => {
      const data = snapshot.val()
      console.log('Ratings data received:', data)
      if (data) {
        const ratingsArray = Object.values(data).map(item => item.rating)
        console.log('Ratings array:', ratingsArray)
        callback(ratingsArray)
      } else {
        console.log('No ratings data')
        callback([])
      }
    })
    return unsubscribe
  } catch (error) {
    console.error('Error getting ratings:', error)
    callback([])
    return () => {}
  }
}
