'use client'

import Image from 'next/image'
import { useAuth } from '@/hooks/use-auth'
import { LoginButton, LogoutButton } from '@/components/auth/auth-buttons'
import { UserProfile } from '@/components/auth/user-profile'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-neutral-900 text-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-3xl">
        <div className="flex justify-between items-center w-full">
          <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={120} height={30} priority />
          <div>
            {isLoading ? (
              <p className="text-gray-800 font-medium">Loading...</p>
            ) : isAuthenticated ? (
              <LogoutButton />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-lg p-6 border border-gray-200 text-gray-900">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Auth0 Demo</h1>

          {isLoading ? (
            <div className="flex justify-center my-8">
              <p className="text-gray-800 font-medium">Loading authentication status...</p>
            </div>
          ) : isAuthenticated ? (
            <div className="my-6">
              <UserProfile />
            </div>
          ) : (
            <div className="bg-gray-100 p-6 rounded-lg text-center my-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Welcome to the Auth0 Demo</h2>
              <p className="mb-6 text-gray-800">
                You are not currently authenticated. Click the button below to log in.
              </p>
              <LoginButton />
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-100 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900">Implementation Notes</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-blue-900">
              <li>Auth0 is not configured with credentials by default</li>
              <li>Update domain and clientId in `.env` with your actual Auth0 values — refer to `.env.example`</li>
              <li>The login button will redirect to Auth0 for authentication</li>
              <li>After login, user information will be displayed on this page</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-blue-700 font-medium"
          href="https://auth0.com/docs/quickstart/spa/react"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Auth0 React SDK Docs
        </a>
      </footer>
    </div>
  )
}
