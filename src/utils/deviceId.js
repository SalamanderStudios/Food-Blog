/**
 * Device ID generation and management using browser fingerprinting
 * Creates a persistent device identifier that survives localStorage clearing
 */

import Fingerprint2 from 'fingerprintjs2'

const DEVICE_ID_KEY = 'borg_device_id'

/**
 * Generate a device ID based on browser fingerprint
 * @returns {Promise<string>} The generated device ID
 */
const generateDeviceId = () => {
  return new Promise((resolve) => {
    Fingerprint2.get((components) => {
      const values = components.map((component) => component.value)
      const murmur = Fingerprint2.x64hash128(values.join(''), 31)
      resolve(murmur)
    })
  })
}

/**
 * Get or create a device ID
 * First checks localStorage, if not found, generates new one and stores it
 * @returns {Promise<string>} The device ID
 */
export const getDeviceId = async () => {
  // Check if we already have a stored device ID
  let deviceId = localStorage.getItem(DEVICE_ID_KEY)

  if (!deviceId) {
    // Generate new device ID based on browser fingerprint
    deviceId = await generateDeviceId()
    // Store it for future use
    localStorage.setItem(DEVICE_ID_KEY, deviceId)
  }

  return deviceId
}

/**
 * Check if this device has already rated a recipe
 * @param {number|string} recipeId - The recipe ID
 * @returns {Promise<boolean>} True if already rated
 */
export const hasDeviceRated = async (recipeId) => {
  const deviceId = await getDeviceId()
  const ratedKey = `rated_recipe_${recipeId}_device`
  const storedDeviceId = localStorage.getItem(ratedKey)
  return storedDeviceId === deviceId
}

/**
 * Mark this device as having rated a recipe and store the rating entry key
 * @param {number|string} recipeId - The recipe ID
 * @param {number} rating - The rating value (1-5)
 * @param {string} entryKey - The Firebase entry key for this rating
 * @returns {Promise<void>}
 */
export const markDeviceRated = async (recipeId, rating, entryKey) => {
  const deviceId = await getDeviceId()
  const ratedKey = `rated_recipe_${recipeId}_device`
  const ratingKey = `rated_recipe_${recipeId}_rating`
  const entryKeyStorageKey = `rated_recipe_${recipeId}_entry_key`
  
  localStorage.setItem(ratedKey, deviceId)
  localStorage.setItem(ratingKey, rating)
  localStorage.setItem(entryKeyStorageKey, entryKey)
}

/**
 * Get the rating this device submitted for a recipe
 * @param {number|string} recipeId - The recipe ID
 * @returns {number|null} The rating or null if not rated
 */
export const getDeviceRating = (recipeId) => {
  const ratingKey = `rated_recipe_${recipeId}_rating`
  const rating = localStorage.getItem(ratingKey)
  return rating ? parseInt(rating, 10) : null
}

/**
 * Get the Firebase entry key for this device's rating
 * @param {number|string} recipeId - The recipe ID
 * @returns {string|null} The entry key or null if not rated
 */
export const getDeviceRatingEntryKey = (recipeId) => {
  const entryKeyStorageKey = `rated_recipe_${recipeId}_entry_key`
  return localStorage.getItem(entryKeyStorageKey)
}
