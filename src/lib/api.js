const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

if (import.meta.env.PROD && !configuredApiUrl) {
  console.error(
    "VITE_API_URL is not configured. Set it in the Vercel project environment variables.",
  );
}

export const API_URL = configuredApiUrl || (import.meta.env.DEV ? "http://localhost:5000" : "");
