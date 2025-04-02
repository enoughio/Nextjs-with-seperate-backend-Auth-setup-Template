"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import ProtectedRoute from "@/components/protected-route"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect based on user role once data is loaded
    if (!loading && user) {
      if (user.isAdmin) {
        router.push(`/dashboard/${user.id}/admin`)
      } else {
        router.push(`/dashboard/${user.id}/member`)
      }
    }
  }, [user, loading, router])

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3">Redirecting to your dashboard...</p>
      </div>
    </ProtectedRoute>
  )
}

