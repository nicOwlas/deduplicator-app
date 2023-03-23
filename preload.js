// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  showDirectoryPicker: async () => {
    return ipcRenderer.invoke("show-directory-picker");
  },
  convertHeic: async (src) => {
    return await ipcRenderer.invoke("convert-heic", src);
  },
});
