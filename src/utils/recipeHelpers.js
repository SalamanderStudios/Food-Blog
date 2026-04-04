// Helper function to calculate total time from prep and cook time
export function calculateTotalTime(prepTime, cookTime) {
  const extractMinutes = (timeStr) => {
    // Check if the time string contains "hour" or "hr"
    const hourMatch = timeStr.match(/(\d+)\s*(?:hour|hr)/i);
    const minuteMatch = timeStr.match(/(\d+)\s*(?:minute|min)/i);
    
    let totalMinutes = 0;
    if (hourMatch) {
      totalMinutes += parseInt(hourMatch[1]) * 60;
    }
    if (minuteMatch) {
      totalMinutes += parseInt(minuteMatch[1]);
    }
    return totalMinutes;
  };
  
  const prepMinutes = extractMinutes(prepTime);
  const cookMinutes = extractMinutes(cookTime);
  const totalMinutes = prepMinutes + cookMinutes;
  
  // Convert back to hours and minutes if needed
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (minutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
  }
  
  return `${totalMinutes} minutes`;
}

// Helper function to calculate average rating from ratings object
export function getAverageRating(ratingsObject) {
  if (!ratingsObject || typeof ratingsObject !== 'object') {
    return 0;
  }
  
  const ratingsArray = Object.values(ratingsObject).filter(rating => rating !== null && rating !== undefined);
  if (ratingsArray.length === 0) {
    return 0;
  }
  
  const sum = ratingsArray.reduce((acc, rating) => acc + rating, 0);
  const raw = sum / ratingsArray.length;
  // Stable rounding to 1 decimal to avoid floating-point toFixed edge-cases
  const avg = Math.round((raw + 1e-9) * 10) / 10;
  return avg;
}
