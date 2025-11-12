import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleTheme } from '@/store/slices/appSlice'

export function SettingsPage() {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector((state) => state.app)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-lg text-muted-foreground">Customize your application preferences</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the app looks and feels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Current theme: <span className="font-medium capitalize">{theme}</span>
              </p>
            </div>
            <Button variant="outline" onClick={() => dispatch(toggleTheme())}>
              Toggle Theme
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Application */}
      <Card>
        <CardHeader>
          <CardTitle>Application</CardTitle>
          <CardDescription>Manage application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Launch at startup</Label>
              <p className="text-sm text-muted-foreground">
                Automatically start the app when you log in
              </p>
            </div>
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Minimize to tray</Label>
              <p className="text-sm text-muted-foreground">
                Hide window to system tray instead of closing
              </p>
            </div>
            <Button variant="outline" disabled>
              Enabled
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Storage</CardTitle>
          <CardDescription>Manage your application data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Clear cache</Label>
              <p className="text-sm text-muted-foreground">
                Remove temporary files and cached data
              </p>
            </div>
            <Button variant="outline">Clear Cache</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Export data</Label>
              <p className="text-sm text-muted-foreground">Download your data as JSON</p>
            </div>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* About Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced</CardTitle>
          <CardDescription>Advanced settings and actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Open DevTools</Label>
              <p className="text-sm text-muted-foreground">Open developer tools for debugging</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                // In production, you'd send IPC message to open devtools
                console.log('Open DevTools')
              }}
            >
              Open DevTools
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Reset to defaults</Label>
              <p className="text-sm text-muted-foreground">
                Reset all settings to their default values
              </p>
            </div>
            <Button variant="outline" className="text-destructive">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
