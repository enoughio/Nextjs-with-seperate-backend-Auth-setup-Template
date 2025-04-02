"use client"

import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/context/auth-context"

export default function AdminDashboard() {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.name}</p>
        <button onClick={logout}>Logout</button>
        {/* Dashboard content */}
      </div>
    </ProtectedRoute>
  )
}

