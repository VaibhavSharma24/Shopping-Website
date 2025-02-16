"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductList } from "../components/ProductList"
import { useCartContext } from "../contexts/CartContext"
import type { Product } from "../lib/types"

// Fetch products from API
const getProducts = async (category: string | null): Promise<Product[]> => {
  const url = category && category !== "all"
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products"

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  return response.json()
}

// Fetch categories from API
const getCategories = async (): Promise<string[]> => {
  const response = await fetch("https://fakestoreapi.com/products/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  const categories = await response.json()
  return ["all", ...categories] // Include "all" for showing all products
}

export default function Home() {
  const [category, setCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"price" | "rating">("price")

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const { addToCart, removeFromCart, cart } = useCartContext()

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-500">Error fetching products</div>

  // Sort products
  const sortedProducts = products?.slice().sort((a, b) => {
    if (sortBy === "price") return a.price - b.price
    if (sortBy === "rating") return b.rating.rate - a.rating.rate
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-center gradient-text">Discover Our Products</h1>
      <p className="text-muted-foreground text-center mb-8">Find the perfect items for your lifestyle</p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-[200px] bg-secondary border-secondary">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as "price" | "rating")}>
          <SelectTrigger className="w-[200px] bg-secondary border-secondary">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ProductList
        products={sortedProducts || []}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        cart={cart}
      />
    </div>
  )
}
