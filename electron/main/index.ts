import { app, BrowserWindow, Tray } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { WindowStateManager } from './window-state-manager'
import { setupIPC } from './ipc-handlers'
import { createSystemTray } from './system-tray'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '../..')
const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

export const VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let windowStateManager: WindowStateManager | null = null

function createWindow() {
  // Initialize window state manager
  windowStateManager = new WindowStateManager()
  const windowState = windowStateManager.getState()

  mainWindow = new BrowserWindow({
    ...windowState,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'Electron Boilerplate',
    backgroundColor: '#ffffff',
  })

  // Track window state changes
  windowStateManager.track(mainWindow)

  // Test actively push message to the Electron-Renderer
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Load the app
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // Handle window close - minimize to tray instead
  mainWindow.on('close', (event) => {
    if (!(app as { isQuitting?: boolean }).isQuitting) {
      event.preventDefault()
      mainWindow?.hide()
    }
  })
}

// App lifecycle
app.whenReady().then(() => {
  // Setup IPC handlers
  setupIPC()

  // Create window
  createWindow()

  // Create system tray
  tray = createSystemTray(mainWindow)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    } else {
      mainWindow?.show()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  ;(app as { isQuitting?: boolean }).isQuitting = true
  windowStateManager?.saveState(mainWindow!)
})

// Cleanup
app.on('will-quit', () => {
  tray?.destroy()
})
