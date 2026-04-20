import { useState, type FormEvent } from 'react'
import { signInWithPassword, sendPasswordReset } from '@/lib/auth'

export function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signInWithPassword(email.trim(), password)
      // El AuthProvider detecta el cambio de sesión automáticamente.
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      setError(translateAuthError(msg))
    } finally {
      setLoading(false)
    }
  }

  async function handleReset() {
    if (!email.trim()) {
      setError('Ingresá tu email primero y tocá "Olvidé mi contraseña".')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await sendPasswordReset(email.trim())
      setResetSent(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-semibold text-3xl tracking-tight text-[#0E2A47]">
            Grupo Effi · Admin
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Acceso al panel de administración interno
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BC49C]"
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BC49C]"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {resetSent && (
            <div className="rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700">
              Enviamos el link de reset a tu correo. Revisá la bandeja.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0E2A47] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0A1F35] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="w-full text-center text-xs text-slate-500 hover:text-[#0E2A47] underline-offset-2 hover:underline"
          >
            Olvidé mi contraseña
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Usás los mismos credenciales que en UGC Colombia.
          <br />
          Si no tenés acceso, contactá a un super admin.
        </p>
      </div>
    </div>
  )
}

function translateAuthError(msg: string): string {
  const lower = msg.toLowerCase()
  if (lower.includes('invalid login')) return 'Email o contraseña incorrectos.'
  if (lower.includes('email not confirmed')) return 'Tu email aún no está confirmado.'
  if (lower.includes('user not found')) return 'No existe una cuenta con ese email.'
  if (lower.includes('too many')) return 'Demasiados intentos. Esperá unos minutos.'
  return msg
}
