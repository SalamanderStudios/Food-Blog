# Vercel Deployment Guide for Food Blog

## Quick Start

Your React food blog is ready to be deployed on Vercel. Follow these steps:

### Step 1: Prepare Your Repository
1. Initialize Git in your project (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Food blog project"
   ```

2. Push to GitHub/GitLab/Bitbucket:
   - Create a new repository on GitHub (or your preferred Git provider)
   - Push your local repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/food-blog.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your Git provider (GitHub, GitLab, or Bitbucket)
3. Click "New Project"
4. Import your `food-blog` repository
5. Vercel will auto-detect your Vite configuration
6. Click "Deploy" - that's it!

#### Option B: Using Vercel CLI
1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from your project directory:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project to Vercel

### Step 3: Configure Environment Variables (Optional)
If you need environment variables, add them in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables (they'll be available during build and runtime)

## Project Configuration

Your project includes:
- **vite.config.js** - Vite configuration (Vercel auto-detects this)
- **vercel.json** - Vercel-specific build and output settings
- **.vercelignore** - Files to exclude from deployment

## Performance Optimization

Vercel automatically:
- Compresses assets (Gzip/Brotli)
- Optimizes images
- Enables HTTP/2
- Provides CDN caching
- Generates serverless functions from API routes (if added)

## Continuous Deployment

Once deployed:
- **Automatic deploys**: Every push to your main branch automatically deploys
- **Preview deployments**: Pull requests get temporary preview URLs
- **Production URL**: Your main branch deploys to your production domain

## Domain Configuration

To add a custom domain:
1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

## Monitoring and Analytics

Vercel provides built-in:
- Real-time logs
- Analytics (Web Vitals, traffic data)
- Error tracking
- Performance insights

## Troubleshooting

### Build Fails
- Check that `npm run build` works locally
- Verify all dependencies are in `package.json`
- Check Vercel logs for specific errors

### Blank Page After Deployment
- Ensure React Router paths are correct
- Check browser console for JavaScript errors
- Verify API endpoints (if using backend)

### Performance Issues
- Use Vercel Analytics to identify bottlenecks
- Consider code splitting with React lazy loading
- Optimize images before deployment

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
