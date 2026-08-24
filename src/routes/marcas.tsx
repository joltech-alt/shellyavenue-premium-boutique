import { createFileRoute, Link } from "@tanstack/react-router";
import { brands, getProducts } from "@/data/products";

export const Route = createFileRoute("/marcas")({
  head: () => ({
    meta: [
      { title: "Marcas que amamos | SHELLY AVENUE" },
      {
        name: "description",
        content:
          "Traemos piezas originales de marcas americanas favoritas. Conoce las etiquetas que más nos piden.",
      },
      { property: "og:title", content: "Marcas que amamos | SHELLY AVENUE" },
      { property: "og:description", content: "Etiquetas americanas originales traídas a Perú." },
      { property: "og:url", content: "/marcas" },
    ],
    links: [{ rel: "canonical", href: "/marcas" }],
  }),
  component: Marcas,
});

function Marcas() {
  const products = getProducts();
  return (
    <div className="container-page py-10">
      <p className="eyebrow text-primary">Selección</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">Marcas que amamos</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Nombres referenciales de las marcas cuyos productos importamos. No somos tienda oficial ni
        representante de ninguna de ellas.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((b) => {
          const count = products.filter((p) => p.brand === b).length;
          return (
            <Link
              key={b}
              to="/tienda"
              search={{ q: b }}
              className="rounded-lg border border-border bg-card p-8 text-center hover-lift"
            >
              <span className="font-display text-2xl">{b}</span>
              <span className="mt-2 block text-xs text-muted-foreground">
                {count} producto{count === 1 ? "" : "s"} demo
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
