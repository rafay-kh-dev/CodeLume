# CodeLume

## Deploying the frontend and backend

The Vercel project deploys the React frontend only. Deploy `codelume-backend`
to a Node-compatible host (such as Render, Railway, or a VPS), then add the
backend's public URL as the Vercel environment variable `VITE_API_URL` for
the **Production** environment. Redeploy the frontend after saving the
variable.

For local development, copy `.env.example` to `.env` and use:

```text
VITE_API_URL=http://localhost:5000
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
