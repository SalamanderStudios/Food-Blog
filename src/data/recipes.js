// Sample recipes data for the food blog
import { calculateTotalTime } from '../utils/recipeHelpers.js'
import JakesBruschettaImage from '../assets/JakesBruschetta.jpg'
import BreadCheeseSaladImage from '../assets/BreadCheeseSalad.jpg'

export const recipes = [
  {
    id: 1,
    title: "Mario's Brother's Bruschetta",
    author: "Jake Thalacker",
    country: "Vatican City",
    region: "Europe",
    date: "2025-01-20",
    category: "Appetizers",
    image: JakesBruschettaImage,
    rating: 5,
    prepTime: "15 minutes",
    cookTime: "12 minutes",
    servings: "12 pieces",
    difficulty: "Easy",
    description: "Delicious and easy-to-make bruschetta with fresh tomatoes, mozzarella, hot honey, basil, and garlic on toasted bread.",
    get totalTime() {
      return calculateTotalTime(this.prepTime, this.cookTime);
    },
    ingredients: [
      { header: "For the Toasts" },
      "1 baguette",
      "3 Tbsp extra virgin olive oil",
      "1/3 cup shredded parmesan cheese",
      { header: "For the Topping" },
      "3 Roma tomatoes, diced",
      "1/3 cup basil or Italian parsley leaves, chopped",
      "4 garlic cloves, minced",
      "1 Tbsp balsamic vinegar",
      "2 Tbsp extra virgin olive oil",
      "1/2 tsp sea salt",
      "1/4 tsp black pepper",
      "Balsamic glaze (optional)",
      "Hot honey for drizzling",
      "8 oz fresh mozzarella, sliced"
    ],
    instructions: [
      { header: "Make the Tomato Bruschetta Topping:" },
      "Core and dice tomatoes (or use a food chopper). Drain any excess juice and transfer tomatoes to a medium bowl.",
      "Chop basil/parsley – Stack basil leaves and roll them into a tube. Using a sharp knife, thinly slice the basil into ribbons and transfer to the bowl with tomatoes.",
      "Finely mince 5 garlic cloves. Mix 1 tsp of minced garlic into 3 Tbsp olive oil and set aside. Add remaining minced garlic to the mixing bowl with tomatoes.",
      "Season tomatoes with 2 Tbsp olive oil, 1 Tbsp balsamic, 1/2 tsp salt and 1/4 tsp black pepper. Stir gently to combine and set aside to marinate for 15 minutes.",
      "",
      { header: "Make the Bruschetta Toasts:" },
      "Preheat oven to 400˚F with a rack in the center of the oven. Place toasts on a parchment-lined baking sheet. Cut toasts into 1/2\" thick slices, slicing diagonally.",
      "Arrange toasts on the prepared baking sheet and brush the garlic infused olive oil on both sides of toasts. Sprinkle tops with parmesan cheese and bake at 400˚F for 7 minutes or until the edges are golden brown.",
      "To Serve: Arrange the toasts on a platter and the tomato topping in a separate bowl. Drizzle hot honey on top of the toast, then layer on slice of mozzarella. Spoon the tomato mixture over the toasts and serve with a drizzle of extra virgin olive oil and balsamic glaze."
    ]
  },
  {
    id: 2,
    title: "Bread Cheese Salad",
    author: "Jake Thalacker",
    country: "Greece",
    region: "Europe",
    date: "2025-01-06",
    category: "Salads",
    image: BreadCheeseSaladImage,
    rating: 4.5,
    prepTime: "10 minutes",
    cookTime: "8 minutes",
    servings: 4,
    difficulty: "Easy",
    description: "A refreshing garden salad with crisp vegetables, bread cheese, and a homemade lemon oil dressing.",
    get totalTime() {
      return calculateTotalTime(this.prepTime, this.cookTime);
    },
    ingredients: [
        
      "2 Tbsp. fresh lemon juice",
      "1/4 cup plus 2 tbsp. extra-virgin olive oil, divided",
      "Kosher salt",
      "Freshly ground black pepper",
      "8 oz. Bread Cheese, cut into 1/4\" slices",
      "1 large or 2 small pieces of pita or naan",
      "2 cups loosely packed arugula and spinach mix",
      "1 medium navel orange, peeled, cut into segments",
      "Pinch of crushed red pepper flakes",
      { header: "Optional:" },
      "2 Tbsp. chopped fresh dill",
      "2 carrots, peeled and julienned",
      "2 Tbsp. chopped fresh mint",
      "1 cup canned chickpeas, drained, rinsed"

    ],
    instructions: [
      "Preaheat oven to 400˚F.",
      "In a large bowl, whisk dill, mint, carrots, lemon juice, and 1/4 c. oil; season with salt and black pepper. Add chickpeas and toss to combine.",
      "Once oven is preheated, put pita in oven. Toast for about 5-6 minutes until golden brown and crisp. Remove from oven and set aside to cool. Once cool, break into bite-sized pieces.",
      "In a large skillet over medium heat, heat 1 tbsp. oil. Add Bread Cheese and cook, turning occasionally, until charred and golden on both sides, 4 to 6 minutes. Transfer to a large paper plate. Once cooled, slice into 1/2in by 1in strips ",
      "Add arugula, orange, bread cheese, and pita to bowl with oil mixture and toss to combine; season with salt, black pepper, and crushed red pepper flakes."
    ]
  },
  {
    id: 3,
    title: "Creamy Pasta Carbonara",
    author: "Emma Romano",
    country: "Italy",
    region: "Europe",
    date: "2025-01-20",
    category: "Main Courses",
    image: "https://images.unsplash.com/photo-1612874742237-6526221fcf4d?w=400&h=300&fit=crop",
    rating: 4.8,
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "Medium",
    description: "An authentic Italian pasta carbonara with a creamy sauce made from eggs and pancetta.",
    get totalTime() {
      return calculateTotalTime(this.prepTime, this.cookTime);
    },
    ingredients: [
      "1 pound spaghetti",
      "6 oz pancetta, diced",
      "4 large eggs",
      "1 cup Parmesan cheese, grated",
      "2 cloves garlic, minced",
      "Black pepper",
      "Salt"
    ],
    instructions: [
      "Bring a large pot of salted water to a boil and cook spaghetti until al dente.",
      "While pasta cooks, fry pancetta in a large skillet until crispy.",
      "In a bowl, whisk together eggs, Parmesan, and black pepper.",
      "Reserve 1 cup of pasta water before draining.",
      "Add hot pasta to the pancetta in the skillet.",
      "Remove from heat and quickly stir in egg mixture.",
      "Add pasta water gradually while stirring to create a creamy sauce.",
      "Serve immediately with extra Parmesan and black pepper."
    ]
  },
  {
    id: 4,
    title: "Homemade Vegetable Soup",
    author: "Lisa Martinez",
    country: "Spain",
    region: "Europe",
    date: "2025-01-22",
    category: "Soups",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    rating: 4.2,
    prepTime: "15 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "Easy",
    description: "A wholesome and comforting vegetable soup perfect for any season.",
    get totalTime() {
      return calculateTotalTime(this.prepTime, this.cookTime);
    },
    ingredients: [
      "2 tbsp olive oil",
      "1 onion, diced",
      "3 carrots, diced",
      "3 celery stalks, diced",
      "2 potatoes, cubed",
      "4 cups vegetable broth",
      "1 can diced tomatoes",
      "2 cups spinach",
      "Salt and pepper to taste",
      "Fresh herbs (basil, thyme)"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat.",
      "Sauté onion, carrots, and celery until softened (about 5 minutes).",
      "Add potatoes and cook for another 5 minutes.",
      "Pour in vegetable broth and diced tomatoes.",
      "Bring to a boil, then reduce heat and simmer for 15 minutes.",
      "Add spinach and fresh herbs.",
      "Season with salt and pepper to taste.",
      "Simmer for 5 more minutes and serve hot."
    ]
  }
];
