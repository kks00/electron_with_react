const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    invokeFunction: (args) => ipcRenderer.invoke('invokeFunction', args)
});