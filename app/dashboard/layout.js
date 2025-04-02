import { AuthProvider } from "@/context/auth-context"

export default function DashboardLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

