# Delicious Bites - Food Blog Deployment Guide

## Overview
This is a React-based food blog application built with Vite. It's ready to be deployed to the internet for public access.

## Project Structure
```
src/
├── App.jsx              # Main app with routing
├── App.css              # Header, footer, and app-wide styles
├── pages/
│   ├── Home.jsx         # Recipe list page
│   ├── RecipeDetail.jsx # Individual recipe page
│   └── About.jsx        # About page
├── data/
│   └── recipes.js       # Recipe data
├── styles/
│   └── pages.css        # Page-specific styles
├── main.jsx             # React entry point
└── index.css            # Global styles
```

## Features
- 📱 Responsive design (mobile, tablet, desktop)
- 🍽️ Recipe list with cards
- 📖 Detailed recipe pages with ingredients and instructions
- 🔍 Easy navigation between pages
- ✅ Interactive ingredient checklist
- 📧 Newsletter subscription form
- ℹ️ About page with team information

## Local Development

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
cd food-blog
npm install
```

### Running Locally
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```
This creates an optimized build in the `dist/` folder.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)
Vercel is perfect for Vite projects and offers free hosting.

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign up with your GitHub account
4. Click "Import Project"
5. Select your repository
6. Vercel will auto-detect Vite settings
7. Click "Deploy"

Your site will be live at a URL like: `https://your-project.vercel.app`

### Option 2: Netlify
Netlify also provides excellent support for Vite apps.

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Sign up with your GitHub account
4. Click "New site from Git"
5. Select your repository
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

### Option 3: GitHub Pages
For a free, simple hosting solution.

1. Update `vite.config.js`:
```javascript
export default {
  base: '/your-repo-name/',
  // ... rest of config
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add to `package.json` scripts:
```json
"deploy": "npm run build && gh-pages -d dist"
```

4. Run:
```bash
npm run deploy
```

5. In your GitHub repo settings, set Pages source to "gh-pages" branch

### Option 4: Traditional Web Hosting
For shared/VPS hosting:

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` folder contents to your web server's public directory

3. Configure your web server to serve `index.html` for all routes (important for SPA routing):

**For Apache (.htaccess):**
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**For Nginx:**
```nginx
try_files $uri $uri/ /index.html;
```

## Custom Domain Setup

After deploying to any platform:

1. Purchase a custom domain from a domain registrar (GoDaddy, Namecheap, etc.)
2. Update DNS settings to point to your hosting platform:
   - **Vercel**: Add CNAME record
   - **Netlify**: Add CNAME or use Netlify DNS
   - **GitHub Pages**: Add CNAME record
   - **Traditional hosting**: Update A records

## Adding Your Own Recipes

To add more recipes:

1. Edit `src/data/recipes.js`
2. Add new recipe objects to the `recipes` array following this format:

```javascript
{
  id: 5,
  title: "Your Recipe Title",
  author: "Your Name",
  date: "2025-01-22",
  category: "Category",
  image: "https://image-url.com/image.jpg",
  prepTime: "15 minutes",
  cookTime: "30 minutes",
  servings: 4,
  difficulty: "Easy",
  description: "Short description",
  ingredients: ["ingredient 1", "ingredient 2"],
  instructions: ["step 1", "step 2"]
}
```

## Performance Tips

- Use compressed images (WebP format for modern browsers)
- Optimize images before adding to recipes
- Consider using a CDN for images
- Monitor Core Web Vitals

## SEO Optimization

For better search engine visibility:

1. Update `index.html` with proper meta tags
2. Add descriptions and keywords for each recipe
3. Install a SEO plugin for meta management
4. Create a `sitemap.xml`
5. Submit to Google Search Console

## Environment Variables

For future features (contact forms, analytics):

Create a `.env` file:
```
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_KEY=your-key
```

Access in code: `import.meta.env.VITE_API_URL`

## Troubleshooting

### Page doesn't load after deployment
- Ensure your hosting serves `index.html` for all routes
- Check browser console for errors
- Verify the `base` path in `vite.config.js` matches your deployment

### Images not showing
- Use absolute URLs (https://...)
- Ensure image URLs are publicly accessible
- Check image dimensions and file size

### Styles not applying
- Clear browser cache (Ctrl+Shift+Delete)
- Verify CSS files are included in build
- Check for CSS conflicts

## Next Steps

- Add a contact form with email functionality
- Implement recipe search and filtering
- Add user comments on recipes
- Create an admin panel for managing recipes
- Add recipe ratings and reviews
- Implement a comment system

---

**Ready to share your food blog with the world! 🚀**
