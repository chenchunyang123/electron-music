const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    minWidth: 1024,
    minHeight: 680,
    webPreferences: {
      nodeIntegration: true,
    },
    titleBarStyle: 'hidden',
  });
  const urlLocation = isDev ? 'http://localhost:8000' : 'xxx';
  mainWindow.loadURL(urlLocation);
});
