import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/format";
import { useShop } from "@/lib/shop-store";

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    lines,
    subtotal,
    shipping,
    total,
    missingForFreeShipping,
    freeShippingThreshold,
    updateQuantity,
    removeItem,
  } = useShop();

  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="font-display text-xl">Tu carrito</SheetTitle>
          <SheetDescription className="text-xs">
            {missingForFreeShipping > 0
              ? `Te faltan ${formatPrice(missingForFreeShipping)} para envío gratis`
              : "¡Tienes envío gratis!"}
          </SheetDescription>
          <Progress value={progress} className="mt-2 h-1.5" />
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" aria-hidden />
            <p className="text-sm text-muted-foreground">Tu carrito está vacío.</p>
            <Button asChild onClick={() => setCartOpen(false)}>
              <Link to="/tienda">Ver productos</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {lines.map((line, index) => (
                <li key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-3 py-4">
                  <img
                    src={line.product.images[0]}
                    alt={line.product.name}
                    loading="lazy"
                    width={90}
                    height={110}
                    className="h-24 w-20 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow text-muted-foreground">{line.product.brand}</p>
                    <p className="truncate text-sm font-medium">{line.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Talla {line.size} · {line.color}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          type="button"
                          aria-label="Disminuir cantidad"
                          onClick={() => updateQuantity(index, line.quantity - 1)}
                          className="p-1.5 transition-colors hover:bg-accent"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          aria-label="Aumentar cantidad"
                          onClick={() => updateQuantity(index, line.quantity + 1)}
                          className="p-1.5 transition-colors hover:bg-accent"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {formatPrice(line.lineTotal)}
                      </span>
                      <button
                        type="button"
                        aria-label={`Eliminar ${line.product.name}`}
                        onClick={() => removeItem(index)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border bg-cream px-5 py-4">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Envío estimado</dt>
                  <dd>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between pt-1 text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="text-primary">{formatPrice(total)}</dd>
                </div>
              </dl>
              <div className="mt-4 grid gap-2">
                <Button asChild size="lg" onClick={() => setCartOpen(false)}>
                  <Link to="/checkout">Ir a pagar</Link>
                </Button>
                <Button asChild variant="outline" onClick={() => setCartOpen(false)}>
                  <Link to="/carrito">Ver carrito completo</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
