// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPIs", {
  showDirectoryPicker: async () => {
    return ipcRenderer.invoke("show-directory-picker");
  },
});
