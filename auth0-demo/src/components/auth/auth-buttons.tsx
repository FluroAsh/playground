'use client'

import { useAuth } from '@/hooks/use-auth'

export const LoginButton = () => {
  const { login } = useAuth()

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => login()}>
      Log In
    </button>
  )
}

export const LogoutButton = () => {
  const { logout } = useAuth()

  return (
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => logout()}>
      Log Out
    </button>
  )
}
