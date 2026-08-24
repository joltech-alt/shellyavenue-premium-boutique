import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProducts } from "@/data/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos | SHELLY AVENUE" },
      { name: "description", content: "Las piezas que guardaste para decidir después." },
      { property: "og:title", content: "Favoritos | SHELLY AVENUE" },
      { property: "og:description", content: "Tu lista de deseos en SHELLY AVENUE." },
      { property: "og:url", content: "/favoritos" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/favoritos" }],
  }),
  component: Favoritos,
});

function Favoritos() {
  const { wishlist } = useShop();
  const items = getProducts().filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl sm:text-4xl">Tus favoritos</h1>
      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">Todavía no guardaste ninguna pieza.</p>
          <Button asChild className="mt-4">
            <Link to="/tienda">Explorar la tienda</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
