import type { ReactNode } from 'react'
import { useAdminProfile } from '@/hooks/useAdminProfile'
import type { AdminRole } from '@/types/admin'

interface ProtectedRouteProps {
  children: ReactNode
  /** Si se pasa, exige que el user tenga uno de estos roles. */
  requiresRole?: AdminRole[]
  fallback?: ReactNode
}

/**
 * Envuelve una vista para exigir roles concretos. Asume que el AuthProvider
 * ya resolvió la sesión — usar sólo dentro del árbol autenticado.
 */
export function ProtectedRoute({ children, requiresRole, fallback }: ProtectedRouteProps) {
  const { role } = useAdminProfile()

  if (!role) {
    return (
      <>{fallback ?? <RoleDeniedMessage message="Tu cuenta no tiene un rol asignado." />}</>
    )
  }

  if (requiresRole && !requiresRole.includes(role)) {
    return (
      <>
        {fallback ?? (
          <RoleDeniedMessage
            message={`Este módulo es solo para: ${requiresRole.join(', ')}.`}
          />
        )}
      </>
    )
  }

  return <>{children}</>
}

function RoleDeniedMessage({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
      <h3 className="font-semibold mb-1">Permisos insuficientes</h3>
      <p>{message}</p>
    </div>
  )
}
