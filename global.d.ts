// global.d.ts
declare global {
  interface Window {
    electronAPIs: {
      showDirectoryPicker: () => Promise<string | null>;
    };
  }
}

export {};
