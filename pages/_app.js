import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "./context/authContext";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { create } from "zustand";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const useUserAuth = create((set) => ({
  user: {},
  login: (user) => {
    console.log("LOGGIN IN USER", user)
    localStorage.setItem("token", user.userData._id)
    set((state) => ({ user: user }))
  },
  logout: () => {
    console.log("LOGGIN IN USER", user)
    localStorage.removeItem("token")
    set({ user: {} })
  },
}))

export default function App({ Component, pageProps }) {
  const { user, login } = useUserAuth((state) => state);

  useEffect(() => {
    if (!user.userData) {
      console.log("Page opened, reading user from localstorage")
      const token = localStorage.getItem("token")
      if (token) {
        fetch(`/api/users/${token}`)
          .then((res) => res.json())
          .then((user) => {
            login({ userdId: user._id, userData: user })
          })
      }
    }
  }, [])

  return (
    <AuthProvider>
      <main className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </AuthProvider >

  )
}
