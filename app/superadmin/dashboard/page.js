"use client"

import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/context/auth-context"

export default function SuperAdminDashboard() {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute allowedRoles={["superadmin"]}>
      <div>
        <h1>Super Admin Dashboard</h1>
        <p>Welcome, {user?.name}</p>
        <button onClick={logout}>Logout</button>
        {/* Dashboard content */}
      </div>
    </ProtectedRoute>
  )
}

