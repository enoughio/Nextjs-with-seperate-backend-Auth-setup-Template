"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { set } from "react-hook-form"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    checkUserAuthentication()
  }, [])

  // Function to check if user is authenticated
  const checkUserAuthentication = async () => {
    try {
      // Make API call to validate authentication using cookies
      const response = await fetch("https://your-dejago-api.com/api/auth/me", {
        credentials: "include", // Important for sending cookies
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data)
      } else {
        setUser(null)
      }

    } catch (error) {
      console.error("Authentication check failed:", error)
      setUser(null)
      
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (credentials) => {
    try {
      const response = await fetch("https://your-dejago-api.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // Important for receiving cookies
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data)

        // Redirect based on role
        if (data.role) {
          router.push(`/${data.role}/dashboard`)
        }

        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, error }
      }
    } catch (error) {
      console.error("Login failed:", error)
      return { success: false, error: "Login failed" }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await fetch("https://your-dejago-api.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }


  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkUserAuthentication }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

