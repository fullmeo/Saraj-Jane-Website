# Sarah-Jane Iffra - Website Deployment

This guide provides instructions for deploying the Sarah-Jane Iffra website.

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [npm](https://www.npmjs.com/) (v7 or higher)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/fullmeo/Saraj-Jane-Website.git
    cd sarah-jane-iffra-website
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Development

To run the website locally for development, use the following command. This will start a live server on port 3000.

```bash
npm start
```

## Building for Production

To build the website for production, run the following command. This will minify the CSS and JavaScript files and place them in the `dist` directory.

```bash
npm run build
```

## Deployment Options

You can deploy this website to various hosting platforms. Here are a few recommended options:

### Option 1: Netlify (Recommended)

Netlify is the recommended hosting platform for this project. It offers automatic deployments from Git, free HTTPS, and a global CDN.

1.  **Connect your Git repository** to Netlify.
2.  **Configure the build settings:**
    *   **Build command:** `npm run build`
    *   **Publish directory:** `.`
3.  **Deploy your site.**

The `netlify.toml` file in the root of the project provides the necessary configuration for Netlify.

### Option 2: Vercel

Vercel is another excellent option for deploying static websites.

1.  **Install the Vercel CLI:**

    ```bash
    npm install -g vercel
    ```

2.  **Log in to your Vercel account:**

    ```bash
    vercel login
    ```

3.  **Deploy the website:**

    ```bash
    vercel --prod
    ```

### Option 3: GitHub Pages

You can also deploy the website to GitHub Pages.

1.  **Update the `homepage` field** in your `package.json` with your GitHub Pages URL:

    ```json
    "homepage": "https://your-username.github.io/sarah-jane-iffra-website"
    ```

2.  **Run the deployment script:**

    ```bash
    npm run deploy
    ```

This will build the website and push the contents of the `dist` directory to the `gh-pages` branch of your repository.

## SEO and Analytics

*   **Google Analytics:** Replace `GA_MEASUREMENT_ID` in `index.html` with your actual Google Analytics measurement ID.
*   **Google Search Console:**
    1.  Add your domain as a property in [Google Search Console](https://search.google.com/search-console).
    2.  Verify ownership of the domain.
    3.  Submit the sitemap: `https://your-domain.com/sitemap.xml`.
