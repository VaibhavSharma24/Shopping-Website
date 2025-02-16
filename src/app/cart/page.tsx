"use client"

import Link from "next/link"
import { useCartContext } from "../../contexts/CartContext"
import { CartItem } from "../../components/CartItem"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartContext()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 gradient-text">Your Shopping Cart</h1>
      <p className="text-muted-foreground mb-8">Review and manage your items</p>

      {cart.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link href="/">
            <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/20">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-end">
            <p className="text-2xl font-bold mb-4 gradient-text">Total: ${getTotalPrice().toFixed(2)}</p>
            <div className="space-x-4">
              <Button
                onClick={clearCart}
                variant="destructive"
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400"
              >
                Clear Cart
              </Button>
              <Button className="bg-accent hover:bg-accent/90">Proceed to Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

