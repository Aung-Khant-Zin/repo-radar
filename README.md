# GitHub Profile Analyzer

A responsive React application that surfaces GitHub profile information, high-level statistics, and recently updated repositories using the GitHub REST API. The project matches the provided portfolio brief and is ready to deploy to platforms such as Vercel.

## Features
- 🔎 **GitHub username search** with error handling for empty values, missing users, and API rate limits.
- 👤 **Profile overview** that shows avatar, bio, location, company, repo/follower counts, and a link to the GitHub profile.
- 📊 **Language usage chart** built with Recharts so viewers can see which languages dominate a developer’s public work.
- 📁 **Recent repository list** (top five) with descriptions, languages, stars, forks, plus **sorting (latest/stars)** and an **inline language filter**.
- 🕘 **Search history** that stores the last several usernames locally for one-click lookups during portfolio demos.
- 🖥️/📱 **Device-specific layouts** – desktop gets a sticky profile sidebar with dual columns, while mobile switches to a stacked card experience with elevated tiles.
- ⏳ **Loading indicator** that keeps users informed while data is fetched.
- 🌙 **Dark mode toggle** that switches between light and dark themes without a reload.

## Tech Stack
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Recharts](https://recharts.org) for lightweight data viz
- GitHub REST API
- CSS Modules (plain CSS file)

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
3. **Build for production**
   ```bash
   npm run build
   ```
4. **Preview the production build locally**
   ```bash
   npm run preview
   ```

### Environment Notes
- No GitHub token is required for public data, but authenticated requests can be added in `src/services/githubApi.js` if you need higher rate limits.
- The project was scaffolded manually (mirroring the Vite React template) because the remote scaffolding command is blocked in this environment.
=======
# github-user-analyzer
A React app fetching GitHub user stats
>>>>>>> 5d336039bbf026a5e5b36bf166d2f07dfb0c6d2c
