// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  showDirectoryPicker: async () => {
    return await ipcRenderer.invoke("show-directory-picker");
  },
});
