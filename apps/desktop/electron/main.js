// electron/main.js
import path from "path";
// import { app, BrowserWindow } from 'electron'
import { app, BrowserWindow } from 'electron';
import convict from "convict";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. Define your schema (with defaults)
const config = convict({
  server: {
    port: {
      doc: "The Vite dev server port",
      format: "port",
      default: 5173,
      env: "PORT",
    },
  },
});

// 2. Load an (empty) object so convict knows to merge & resolve defaults
config.load({});
// log it out and check existence
// console.log('🔍 Trying to load config from:', configFilePath);
// console.log('📁 Exists?', fs.existsSync(configFilePath));

// now load it (or fall back)
// if (fs.existsSync(configFilePath)) {
//   config.loadFile(configFilePath);
// } else {
//   console.warn('⚠️  Config file not found; loading empty object instead.');
//   config.load({});
// }
// 3. Resolve any substitutions & strictly validate
config.validate({ allowed: "strict" });

// 4. Now it's safe to read
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
      preload: path.join(__dirname, "preload.js"),
    },
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

console.log('PRELOAD SCRIPT LOADED', __filename);
