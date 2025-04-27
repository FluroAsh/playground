'use client'

import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const UserProfile = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  const { user, isLoading, getToken } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Not authenticated</div>
  }

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await getToken()
      setAccessToken(token)
    }

    getAccessToken()
  }, [])

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
      {user.picture && (
        <div className="mb-4">
          <Image src={user.picture} alt="Profile picture" width={80} height={80} className="rounded-full" />
        </div>
      )}
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>

      <div className="mt-4 bg-white p-4 rounded w-full">
        <h3 className="font-bold mb-2">User Profile</h3>
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">{JSON.stringify(user, null, 2)}</pre>
      </div>

      {accessToken && (
        <div className="mt-4 p-4 rounded w-full bg-white">
          <h2 className="font-bold mb-2">Access Token</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm max-w-full text-wrap break-all">{accessToken}</pre>
        </div>
      )}
    </div>
  )
}
