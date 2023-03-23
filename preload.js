// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  showDirectoryPicker: async () => {
    return ipcRenderer.invoke("show-directory-picker");
  },
  convertHeic: async (src) => {
    return await ipcRenderer.invoke("convert-heic", src);
  },
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
});
