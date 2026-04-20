import { signOut } from '@/lib/auth'
import { useAuth } from '@/components/AuthProvider'

/**
 * Se muestra cuando el user está autenticado en Supabase pero NO tiene
 * perfil en admin_effix_profiles (o está desactivado).
 */
export function NoAccessView() {
  const { user, profile } = useAuth()

  const reason = !profile
    ? 'Tu cuenta existe pero no está registrada en el panel admin del Grupo Effi.'
    : profile.is_active
      ? null
      : 'Tu cuenta admin fue desactivada. Contactá a un super admin.'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] p-6">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <h1 className="font-semibold text-2xl text-[#0E2A47] mb-3">
            Acceso restringido
          </h1>
          <p className="text-sm text-slate-600 mb-2">
            {reason ?? 'Tu cuenta aún no tiene permisos asignados.'}
          </p>
          <p className="text-xs text-slate-500 mb-6">
            Cuenta conectada: <span className="font-mono">{user?.email}</span>
          </p>
          <button
            onClick={() => void signOut()}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
