const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

let tray = null;
let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  tray = new Tray(path.join(__dirname, "trayIcon.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: "Start Tracking", click: () => {} },
    { label: "Stop Tracking", click: () => {} },
    { label: "Quit", click: () => app.quit() }
  ]);
  tray.setToolTip("Insightful Client");
  tray.setContextMenu(contextMenu);
});
