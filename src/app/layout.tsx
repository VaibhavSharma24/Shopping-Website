"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCartContext } from "../contexts/CartContext"
import { ThemeProvider } from "next-themes"
import { CartProvider } from "../contexts/CartContext"
import "./globals.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


const inter = Inter({ subsets: ["latin"] })

// Create a client
const queryClient = new QueryClient()


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <QueryClientProvider client={queryClient}>
  <ReactQueryDevtools initialIsOpen={false} /> {/* Moved here */}
  <CartProvider>
    <Header />
    <main className="flex-grow">{children}</main>
    <footer className="bg-secondary text-secondary-foreground py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        © 2025 ShopSmart By Vaibhav Sharma ❤️. All rights reserved.
      </div>
    </footer>
  </CartProvider>
</QueryClientProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}

function Header() {
  const { cart, getTotalItems } = useCartContext()
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    setTotalItems(getTotalItems())
  }, [getTotalItems])
  

  return (
    <header className="border-b border-secondary py-4 backdrop-blur-xl bg-background/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text">
          ShopSmart
        </Link>
        <Link
          href="/cart"
          className="flex items-center bg-secondary px-4 py-2 rounded-full hover:bg-secondary/80 transition-colors"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          <span>Cart ({totalItems})</span>
        </Link>
      </div>
    </header>
  )
}

