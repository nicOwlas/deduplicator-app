// preload.js
const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("fs", {
  readFileSync: (path, options) => fs.readFileSync(path, options),
});
