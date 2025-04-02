// Helper functions for authentication

// Check if user is authenticated
export function isAuthenticated() {
  if (typeof window === "undefined") return false

  const token = localStorage.getItem("authToken")
  return !!token
}

// Get the current user data
export async function getCurrentUser() {
  if (typeof window === "undefined") return null

  const token = localStorage.getItem("authToken")
  if (!token) return null

  try {
    // Replace with your actual API endpoint
    const response = await fetch("https://your-backend-api.com/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching user data:", error)
    return null
  }
}

// Logout function
export function logout() {
  if (typeof window === "undefined") return

  localStorage.removeItem("authToken")
  // Optionally call your backend logout endpoint if needed
  window.location.href = "/login"
}

