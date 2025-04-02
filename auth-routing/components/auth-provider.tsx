"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"

// Define the user type
type User = {
  id: string
  name: string
  email: string
  isAdmin: boolean
} | null

// Create context
type AuthContextType = {
  user: User
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function loadUserFromAPI() {
      if (!isAuthenticated()) {
        setLoading(false)

        // Don't redirect if already on login page
        if (pathname !== "/login") {
          router.push("/login")
        }
        return
      }

      try {
        const userData = await getCurrentUser()
        setUser(userData)

        // If on login page and authenticated, redirect to appropriate dashboard
        if (pathname === "/login") {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Failed to load user:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserFromAPI()
  }, [pathname, router])

  function logout() {
    localStorage.removeItem("authToken")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>
}

