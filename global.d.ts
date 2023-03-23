// global.d.ts
declare global {
  interface Window {
    electronAPI: {
      showDirectoryPicker: () => Promise<string | null>;
    };
  }
}

export {};
