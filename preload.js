// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPIs", {
  showDirectoryPicker: async () => {
    return ipcRenderer.invoke("show-directory-picker");
  },
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
});
