const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Carga tu aplicación web
  win.loadURL('http://localhost:5173'); // O la URL que estés usando
}

// Llamada cuando Electron haya terminado de inicializar
app.whenReady().then(createWindow);

// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
