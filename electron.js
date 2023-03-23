// electron.js
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const fetch = require("node-fetch");
const next = require("next");
const path = require("path");
const sharp = require("sharp");

const isDev = process.env.NODE_ENV === "development";

const { dialog } = require("electron");

ipcMain.handle("show-directory-picker", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });

  if (result.filePaths && result.filePaths.length > 0) {
    return result.filePaths[0];
  } else {
    return null;
  }
});

let mainWindow;

// Prepare the Next.js app
const nextApp = next({ dev: isDev });
const nextHandler = nextApp.getRequestHandler();

async function createWindow() {
  // Wait for the Next.js app to be ready
  await nextApp.prepare();

  // Start the Next.js server in development mode
  if (isDev) {
    const server = require("http").createServer(nextHandler);
    server.listen(3000, (err) => {
      if (err) throw err;
    });
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  // Load the Next.js app
  const startUrl = isDev ? "http://localhost:3000" : "app://./index.html";
  if (isDev) {
    mainWindow.loadURL(startUrl);
  } else {
    mainWindow.loadURL(startUrl);
    nextApp.setAssetPrefix("app://.");
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

ipcMain.handle("convert-heic", async (event, heicSrc) => {
  try {
    let data;
    if (heicSrc.startsWith("http://") || heicSrc.startsWith("https://")) {
      const response = await fetch(heicSrc);
      data = await response.buffer();
    } else {
      data = await fs.promises.readFile(heicSrc);
    }
    const convertedBuffer = await sharp(data).toFormat("jpeg").toBuffer();
    return convertedBuffer;
  } catch (error) {
    console.error("Error converting HEIC file:", error);
    throw error;
  }
});

ipcMain.handle("read-file", async (event, filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.buffer);
      }
    });
  });
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
