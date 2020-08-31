const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    minWidth: 1024,
    minHeight: 700,
    maxWidth: 1024,
    maxHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js',
    },
    titleBarStyle: 'hidden',
  });
  const urlLocation = isDev ? 'http://localhost:8000' : 'xxx';
  mainWindow.loadURL(urlLocation);
});
