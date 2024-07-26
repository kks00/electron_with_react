const { app, BrowserWindow, ipcMain, protocol  } = require('electron');
const path = require("path");
const url = require('url');

const ref = require('ref-napi');
const ffi = require('ffi-napi');

const REACT_DEBUG_MODE = true;

let win = null;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1152,
        height: 864,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.webContents.on('will-navigate', (event, url) => {
        event.preventDefault();

        const hash_addr = url.substr(url.lastIndexOf('/'));
        win.webContents.executeJavaScript(`window.location.hash = "${hash_addr}";`).then(() => {

        });
    });
}

app.whenReady().then(() => {
    createWindow();

    if (!REACT_DEBUG_MODE) {
        win.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
    }
    else {
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();

        if (!REACT_DEBUG_MODE)
            win.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
        else
            win.loadURL('http://localhost:3000');
    }
});

const user32 = ffi.Library('user32', {
    'MessageBoxA': ['int', ['int', 'string', 'string', 'int']]
});

const library = ffi.Library('library', {
    'get_info': ['string', []]
})

ipcMain.handle('invokeFunction', async (event, ...args) => {
    // const message = args[0];
    // user32.MessageBoxA(0, message, 'invokeFunction', 0 | 0x40);
    return library.get_info();
});