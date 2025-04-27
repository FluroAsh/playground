'use client'

import { useAuth0 } from '@auth0/auth0-react'

export const useAuth = () => {
  const { isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently, isLoading } = useAuth0()

  const logoutWithRedirect = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    })
  }

  return {
    isAuthenticated,
    user,
    login: loginWithRedirect,
    logout: logoutWithRedirect,
    getToken: getAccessTokenSilently,
    isLoading
  }
}
