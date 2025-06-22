// src/types/electron.d.ts

export {}; // make this a module

declare global {
  interface Window {
    electronAPI?: {
      /**
       * Captures the primary screen and returns the raw PNG bytes as an ArrayBuffer.
       */
      captureScreen: () => Promise<ArrayBuffer>;
    };
  }
}

declare interface ElectronAPI {
  captureScreen: () => Promise<ArrayBuffer>;
}
