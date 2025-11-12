/**
 * Type-safe IPC communication types
 */

export interface IpcResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface NotificationOptions {
  title: string
  body: string
}

export interface ElectronAPI {
  // App
  getVersion: () => Promise<IpcResponse<string>>

  // Notifications
  showNotification: (options: NotificationOptions) => Promise<IpcResponse<void>>

  // Shell
  openExternal: (url: string) => Promise<IpcResponse<void>>

  // Database
  dbQuery: <T = unknown>(query: string) => Promise<IpcResponse<T>>

  // Event listeners
  onMainMessage: (callback: (message: string) => void) => () => void
  onNavigateTo: (callback: (path: string) => void) => () => void
}

export type IpcChannels =
  | 'app:getVersion'
  | 'notification:show'
  | 'shell:openExternal'
  | 'db:query'
  | 'main-process-message'
  | 'navigate-to'

declare global {
  interface Window {
    electron: ElectronAPI
  }
}
