"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

type ProtectedRouteProps = {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated, redirect to login
        router.push("/login")
      } else if (requireAdmin && !user.isAdmin) {
        // Not an admin, redirect to member dashboard
        router.push(`/dashboard/${user.id}/member`)
      }
    }
  }, [user, loading, requireAdmin, router])

  // Show loading state or nothing while checking auth
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If requireAdmin is true and user is not admin, don't render children
  if (requireAdmin && !user.isAdmin) {
    return null
  }

  // User is authenticated and meets role requirements
  return <>{children}</>
}

