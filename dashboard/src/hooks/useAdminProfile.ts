import { useAuth } from '@/components/AuthProvider'
import type { AdminRole } from '@/types/admin'

/**
 * Conveniencia para checar permisos del admin actual.
 * Uso:
 *   const { isAdmin, isSuperAdmin, canEdit } = useAdminProfile()
 *   if (!canEdit('leads')) return <ReadOnlyBanner />
 */
export function useAdminProfile() {
  const { profile, hasAdminAccess, loading } = useAuth()

  const role: AdminRole | null = profile?.role ?? null
  const isSuperAdmin = role === 'super_admin'
  const isAdmin = isSuperAdmin || role === 'admin'
  const isViewer = role === 'viewer'

  return {
    profile,
    role,
    loading,
    isAuthenticated: hasAdminAccess,
    isSuperAdmin,
    isAdmin,
    isViewer,
    /** ¿Puede editar la entidad dada? Reglas básicas — refinar por módulo después. */
    canEdit: (entity: 'leads' | 'campaigns' | 'users' | 'settings'): boolean => {
      if (!role) return false
      if (isSuperAdmin) return true
      if (entity === 'users' || entity === 'settings') return false
      return isAdmin
    },
    /** ¿Tiene acceso al módulo admin dado? */
    canAccess: (module: 'overview' | 'leads' | 'campaigns' | 'users' | 'brands' | 'audit' | 'settings'): boolean => {
      if (!role) return false
      if (isSuperAdmin) return true
      if (module === 'users' || module === 'settings') return false
      return true
    },
  }
}
