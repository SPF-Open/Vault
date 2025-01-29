/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
  interface InternalError{
    code?: string;
    title: string;
    message?: string;
    meta?: any;
  }
}

export {}