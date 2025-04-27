'use client'

import { Auth0Provider } from '@auth0/auth0-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const domain = process.env.NEXT_PUBLIC_DOMAIN ?? ''
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID ?? ''

export const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
