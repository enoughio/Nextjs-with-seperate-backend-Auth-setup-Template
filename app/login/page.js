"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const { login, user } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(`/${user.role}/dashboard`)
    }
  }, [user, router])

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      // Validate email and password
      if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required")
      }
    } catch (error) {
      setError(error.message)
      return
    }
    

    const result = await login(credentials)
    if (!result.success) {
      setError(result.error || "Login failed")
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

