# How to Deploy to GitHub Pages

## 1. Setup Repository
1. Create a new repository on GitHub.
2. Initialize git in your project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

## 2. Install Dependencies
Run this command to install React, Vite, and the deployment tool:
```bash
npm install
```

## 3. Deploy
Run this single command to build the website and upload it to GitHub Pages:
```bash
npm run deploy
```

## 4. Enable GitHub Pages
1. Go to your repository **Settings** on GitHub.
2. Click **Pages** on the left sidebar.
3. Ensure **Source** is set to `gh-pages` branch.
4. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
