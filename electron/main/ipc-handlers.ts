import { ipcMain, Notification, shell } from 'electron'
import type { IpcResponse } from '../shared/types'

export function setupIPC() {
  // Example: Get app version
  ipcMain.handle('app:getVersion', async (): Promise<IpcResponse<string>> => {
    try {
      const { app } = await import('electron')
      return { success: true, data: app.getVersion() }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get version',
      }
    }
  })

  // Example: Show notification
  ipcMain.handle(
    'notification:show',
    async (
      _event,
      options: { title: string; body: string }
    ): Promise<IpcResponse<void>> => {
      try {
        const notification = new Notification({
          title: options.title,
          body: options.body,
        })
        notification.show()
        return { success: true, data: undefined }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to show notification',
        }
      }
    }
  )

  // Example: Open external URL
  ipcMain.handle('shell:openExternal', async (_event, url: string): Promise<IpcResponse<void>> => {
    try {
      await shell.openExternal(url)
      return { success: true, data: undefined }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to open URL',
      }
    }
  })

  // Database operations (to be implemented with Prisma)
  ipcMain.handle('db:query', async (_event, _query: string): Promise<IpcResponse<unknown>> => {
    try {
      // TODO: Implement database query logic with Prisma
      return { success: true, data: [] }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Database query failed',
      }
    }
  })
}
