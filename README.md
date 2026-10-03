# CodeLume

CodeLume is a premium, high-performance digital agency platform engineered for high-ticket corporate clients. The architecture focuses on delivering a luxury user experience, combining zero-latency routing with advanced WebGL graphics and buttery-smooth page transitions.

## Deploying the frontend and backend

The Vercel project deploys the React frontend only. Deploy `codelume-backend`
to a Node-compatible host (such as Render, Railway, or a VPS), then add the
backend's public URL as the Vercel environment variable `VITE_API_URL` for
the **Production** environment. Redeploy the frontend after saving the
variable.

For local development, copy `.env.example` to `.env` and use:

```text
VITE_API_URL=http://localhost:5000


# Clone the repository
git clone [https://github.com/rafay-kh-dev/CodeLume.git](https://github.com/rafay-kh-dev/CodeLume.git)

# Navigate to the project directory
cd CodeLume

# Install dependencies
npm install

# Start the development server
npm run dev
