"use client"

import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/context/auth-context"

export default function MemberDashboard() {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute allowedRoles={["member"]}>
      <div>
        <h1>Member Dashboard</h1>
        <p>Welcome, {user?.name}</p>
        <button onClick={logout}>Logout</button>
        {/* Dashboard content */}
      </div>
    </ProtectedRoute>
  )
}

