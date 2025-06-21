import path from "path";
import { app, BrowserWindow } from "electron";
import convict from "convict";
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
  const mainWindow = new BrowserWindow({
    /* … */
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
