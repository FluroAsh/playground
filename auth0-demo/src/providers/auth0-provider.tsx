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
      // The Auth0 domain and client ID are fundamental for identifying your application.
      domain={domain}
      clientId={clientId}
      //  authorizationParams are passed to the Auth0 `/authorize` endpoint.
      //  This endpoint initiates the authentication and authorization process, redirecting the user to the Auth0 `login/consent` page.
      authorizationParams={{
        // redirect_uri specifies where Auth0 should redirect the user back to after authentication.
        // This URI MUST be registered in your Auth0 Application's "Allowed Callback URLs".
        // Using window.location.origin makes it dynamic for different environments (dev, prod).
        // The fallback is essential for scenarios where 'window' might not be immediately available (e.g., SSR).
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
      }}
      // This callback is invoked after the user is redirected back from Auth0.
      // It uses the onRedirectCallback defined above to handle the post-authentication navigation.
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
