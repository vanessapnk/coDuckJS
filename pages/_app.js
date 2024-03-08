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
  login: (user) => set((state) => ({ user: user })),
  logout: () => set({ user: {} }),
}))

export default function App({ Component, pageProps }) {
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
