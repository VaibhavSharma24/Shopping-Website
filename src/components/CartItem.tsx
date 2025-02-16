import Image from "next/image"
import type { CartItem as CartItemType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <Card className="bg-card border-secondary hover:glow transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover rounded-lg" />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-card-foreground mb-1">{item.title}</h3>
            <p className="gradient-text font-bold">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(item.id, Number.parseInt(e.target.value))}
              className="w-16 bg-secondary border-secondary text-foreground"
            />
            <Button
              variant="destructive"
              onClick={() => onRemove(item.id)}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400"
            >
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

