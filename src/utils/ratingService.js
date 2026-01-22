import { database } from '../config/firebase'
import { ref, push, set, onValue, query, orderByChild } from 'firebase/database'

export const saveRating = async (recipeId, rating, entryKey = null) => {
  try {
    console.log('Saving rating:', recipeId, rating, 'entryKey:', entryKey)
    const ratingsRef = ref(database, `ratings/recipe_${recipeId}`)
    
    if (entryKey) {
      // Update existing rating entry to preserve the database average
      const existingEntryRef = ref(database, `ratings/recipe_${recipeId}/${entryKey}`)
      await set(existingEntryRef, {
        rating,
        timestamp: new Date().toISOString()
      })
      console.log('Rating updated successfully')
    } else {
      // Create new rating entry (first time rating)
      const newEntryRef = await push(ratingsRef, {
        rating,
        timestamp: new Date().toISOString()
      })
      console.log('Rating saved successfully with key:', newEntryRef.key)
      return newEntryRef.key
    }
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
