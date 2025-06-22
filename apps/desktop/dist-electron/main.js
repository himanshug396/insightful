import path, { dirname } from "path";
import { app, BrowserWindow } from "electron";
import convict from "convict";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const config = convict({
  server: {
    port: {
      doc: "The Vite dev server port",
      format: "port",
      default: 5173,
      env: "PORT"
    }
  }
});
config.load({});
config.validate({ allowed: "strict" });
const DEV_PORT = config.get("server.port");
async function createWindow() {
  console.log("preload script path", path.join(__dirname, "preload.js"));
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // <-- add this block:
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js")
    }
  });
  if (process.env.NODE_ENV === "development") {
    await mainWindow.loadURL(`http://localhost:${DEV_PORT}`);
    mainWindow.webContents.openDevTools();
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
console.log("PRELOAD SCRIPT LOADED", __filename);
