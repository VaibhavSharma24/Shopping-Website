import type { Product, CartItem } from "@/lib/types"
import { ProductCard } from "./ProductCard"

interface ProductListProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onRemoveFromCart: (productId: number) => void
  cart: CartItem[]
}

export function ProductList({ products, onAddToCart, onRemoveFromCart, cart }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          cartQuantity={cart.find((item) => item.id === product.id)?.quantity || 0}
        />
      ))}
    </div>
  )
}

