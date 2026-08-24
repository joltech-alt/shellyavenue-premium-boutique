import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import { discountPercent, formatPrice } from "@/lib/format";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, setCartOpen, toggleWishlist, isWished } = useShop();
  const off = discountPercent(product.price, product.compareAtPrice);
  const wished = isWished(product.id);
  const soldOut = product.stock <= 0;

  function quickAdd() {
    addItem({
      productId: product.id,
      size: product.sizes[0],
      color: product.colors[0].name,
      quantity: 1,
    });
    setCartOpen(true);
    toast.success("Agregado al carrito", { description: product.name });
  }

  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-lg bg-cream">
        <Link
          to="/producto/$slug"
          params={{ slug: product.slug }}
          aria-label={`Ver ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={`${product.name} — ${product.brand}`}
            loading="lazy"
            width={900}
            height={1100}
            className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1">
          {off > 0 && (
            <span className="rounded-full bg-primary px-2 py-1 text-[0.65rem] font-medium text-primary-foreground">
              -{off}%
            </span>
          )}
          {product.stock > 0 && product.stock <= 3 && (
            <span className="rounded-full bg-background/90 px-2 py-1 text-[0.65rem] text-foreground">
              Últimas {product.stock}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`}
          aria-pressed={wished}
          className="absolute top-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-background"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-primary text-primary")} />
        </button>

        <button
          type="button"
          onClick={quickAdd}
          disabled={soldOut}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-md bg-foreground/95 py-2.5 text-xs tracking-wide text-background opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 disabled:cursor-not-allowed disabled:opacity-60 max-md:translate-y-0 max-md:opacity-100"
        >
          <Plus className="h-3.5 w-3.5" />
          {soldOut ? "Agotado" : "Agregar rápido"}
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="eyebrow text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1 text-sm font-medium">
          <Link to="/producto/$slug" params={{ slug: product.slug }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-primary">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[0.7rem] tracking-wide text-muted-foreground">
          Tallas: {product.sizes.join(" · ")}
        </p>
      </div>
    </article>
  );
}
