import { ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'

interface AdminGuardProps {
  children: ReactNode
  onNavigate: (page: string) => void
  requiredRole?: 'admin' | 'internal' | 'any'
}

export function AdminGuard({ children, onNavigate, requiredRole = 'admin' }: AdminGuardProps) {
  // Check if user is authenticated as admin
  const isAdmin = sessionStorage.getItem('zalpha_admin') === 'true'
  const isInternal = sessionStorage.getItem('zalpha_internal') === 'true'

  const hasAccess =
    requiredRole === 'any'
      ? isAdmin || isInternal
      : requiredRole === 'admin'
      ? isAdmin
      : isInternal

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">
              This page requires {requiredRole === 'any' ? 'admin or internal' : requiredRole} access.
              Please sign in with appropriate credentials.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={() => onNavigate('admin-dashboard')} className="w-full">
              Go to Admin Login
            </Button>
            <Button onClick={() => onNavigate('landing')} variant="outline" className="w-full">
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
