import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock electron API for tests
global.window.electron = {
  getVersion: async () => ({ success: true, data: '1.0.0' }),
  showNotification: async () => ({ success: true, data: undefined }),
  openExternal: async () => ({ success: true, data: undefined }),
  dbQuery: async <T>() => ({ success: true, data: [] as T }),
  onMainMessage: () => () => {},
  onNavigateTo: () => () => {},
}
