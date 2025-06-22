// // EXPOSE any APIs you need in the renderer:
// const fs = require('fs')
// console.log('→ preload.__dirname:', __dirname)
// console.log('→ preload exists?', fs.existsSync(path.join(__dirname, 'preload.cjs')))
// console.log('→ electron module keys:', Object.keys(require('electron')))

// const { contextBridge, desktopCapturer } = require('electron')
// console.log('🔌 preload.cjs loaded, desktopCapturer=', !!desktopCapturer)
// contextBridge.exposeInMainWorld('electronAPI', {
//   send: (channel, data) => ipcRenderer.send(channel, data),
//   on: (channel, fn) => ipcRenderer.on(channel, (_e, ...args) => fn(...args)),
//   captureScreen: async () => {
//     const sources = await desktopCapturer.getSources({ types: ['screen'] });
//     // pick primary screen; each source has `.thumbnail` (a NativeImage)
//     const pngBuffer = sources[0].thumbnail.toPNG();
//     return pngBuffer;
//   }
// })

// // electron/preload.js
const { contextBridge, desktopCapturer } = require('electron')
console.log('🔌 available electron keys:', Object.keys({ contextBridge, desktopCapturer }));
console.log('🔌 preload loaded — desktopCapturer is', !!desktopCapturer)
contextBridge.exposeInMainWorld('electronAPI', {
  captureScreen: async () => {
    // This will remain empty until macOS Screen Recording is granted… 
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    if (!sources.length) {
      throw new Error('No screen sources found');
    }
    // Return raw PNG buffer
    return sources[0].thumbnail.toPNG().buffer;
  }
});
