// ElectronAPI.ts
export interface ElectronAPI {
  invoke: <T = any>(channel: string, ...args: any[]) => Promise<T>;
}
