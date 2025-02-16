import Image from "next/image"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Star, StarHalf, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onRemoveFromCart: (productId: number) => void
  cartQuantity: number
}

export function ProductCard({ product, onAddToCart, onRemoveFromCart, cartQuantity }: ProductCardProps) {
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-3 h-3 fill-purple-400 text-purple-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-3 h-3 fill-purple-400 text-purple-400" />)
    }

    while (stars.length < 5) {
      stars.push(<Star key={`empty-${stars.length}`} className="w-3 h-3 text-gray-600" />)
    }

    return stars
  }

  return (
    <Card className="flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] animate-in bg-card border-secondary hover:glow">
      <CardHeader className="p-3">
        <CardTitle className="line-clamp-1 text-base font-medium">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="aspect-square relative mb-2 overflow-hidden rounded-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <p className="text-lg font-bold mb-2 gradient-text">${product.price.toFixed(2)}</p>
        <div className="flex items-center mb-2">
          <div className="flex mr-2">{renderStars(product.rating.rate)}</div>
          <span className="text-xs text-muted-foreground">({product.rating.count})</span>
        </div>
        {cartQuantity > 0 && <div className="mt-1 text-xs text-purple-400 font-medium">{cartQuantity} in cart</div>}
      </CardContent>
      <CardFooter className="p-3">
        <div className="flex w-full gap-2">
          {cartQuantity > 0 && (
            <Button
              onClick={() => onRemoveFromCart(product.id)}
              className="flex-1 bg-secondary hover:bg-red-500/20 hover:text-red-400 transition-colors duration-300"
              variant="secondary"
              size="sm"
            >
              <span className="text-base font-bold">−</span>
            </Button>
          )}
          <Button
            onClick={() => onAddToCart(product)}
            className={`${cartQuantity > 0 ? "flex-1" : "w-full"} transition-colors duration-300 bg-accent hover:bg-purple-500/80`}
            variant={cartQuantity > 0 ? "secondary" : "default"}
            size="sm"
          >
            {cartQuantity === 0 ? (
              <>
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add to Cart
              </>
            ) : (
              <span className="text-base font-bold">+</span>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

