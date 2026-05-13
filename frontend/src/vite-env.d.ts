/// <reference types="vite/client" />

// Type-safe access to environment variables. Add new keys here as we use them.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
