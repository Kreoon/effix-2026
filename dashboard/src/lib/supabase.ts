import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error(
    'Variables Supabase faltantes. Revisá que .env.local tenga VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.'
  )
}

/**
 * Cliente Supabase singleton. Sin <Database> genérico porque complica los
 * updates/rpc; los tipos se aplican manualmente en cada view via casts
 * (AdminLead, AdminProfile, etc.) cuando se consumen los resultados.
 */
export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'effi-admin-auth',
  },
})
