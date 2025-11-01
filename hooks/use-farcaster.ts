"use client"

import { useEffect, useState } from "react"

interface FarcasterUser {
  fid: number
  username: string
  displayName: string
  pfpUrl: string
}

interface FarcasterContext {
  user: FarcasterUser | null
  isReady: boolean
  isLoading: boolean
  error: string | null
}

export function useFarcaster(): FarcasterContext {
  const [context, setContext] = useState<FarcasterContext>({
    user: null,
    isReady: true,
    isLoading: false,
    error: null,
  })

  const setUser = (user: FarcasterUser | null) => {
    setContext((prevContext) => ({
      ...prevContext,
      user: user,
    }))
  }

  useEffect(() => {
    // This allows the app to work without SDK errors in Base preview
    // The app works as a standalone mini app without requiring Farcaster SDK
    setUser(null)
  }, [])

  return context
}
