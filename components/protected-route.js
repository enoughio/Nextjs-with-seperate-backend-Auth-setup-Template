"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and user is not authenticated, redirect to login
    if (!loading && !user) {
      router.push("/login")
      return
    }

    // If user is authenticated but not authorized for this route
    if (!loading && user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect to their appropriate dashboard
      router.push(`/${user.role}/dashboard`)
    }
  }, [user, loading, router, allowedRoles])

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>
  }

  // If user is authenticated and authorized, render children
  if (user && (allowedRoles.length === 0 || allowedRoles.includes(user.role))) {
    return <>{children}</>
  }

  // Return null while redirecting
  return null
}

