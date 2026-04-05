const { app, BrowserWindow } = require('electron');
const path = require('path');

function criarJanela() {
  const janela = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  janela.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(criarJanela);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});