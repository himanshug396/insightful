// electron/main.js
import path from 'path'
import { app, BrowserWindow } from 'electron'
import convict from 'convict'

// 1. Define your schema (with defaults)
const config = convict({
  server: {
    port: {
      doc: 'The Vite dev server port',
      format: 'port',
      default: 5173,
      env: 'PORT'
    }
  }
})

// 2. Load an (empty) object so convict knows to merge & resolve defaults
config.load({})
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
config.validate({ allowed: 'strict' })

// 4. Now it’s safe to read
const DEV_PORT = config.get('server.port')

async function createWindow() {
  const mainWindow = new BrowserWindow({ /* … */ })
  if (process.env.NODE_ENV === 'development') {
    await mainWindow.loadURL(`http://localhost:${DEV_PORT}`)
    mainWindow.webContents.openDevTools()
  } else {
    await mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
