const { contextBridge, desktopCapturer } = require("electron");
console.log("🔌 available electron keys:", Object.keys({ contextBridge, desktopCapturer }));
console.log("🔌 preload loaded — desktopCapturer is", !!desktopCapturer);
contextBridge.exposeInMainWorld("electronAPI", {
  captureScreen: async () => {
    const sources = await desktopCapturer.getSources({ types: ["screen"] });
    if (!sources.length) {
      throw new Error("No screen sources found");
    }
    return sources[0].thumbnail.toPNG().buffer;
  }
});
