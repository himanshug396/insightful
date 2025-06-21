import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, fn) => ipcRenderer.on(channel, (_e, ...args) => fn(...args))
});
