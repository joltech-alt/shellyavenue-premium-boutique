import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/shop/ProductCard";
import { getNewArrivals } from "@/data/products";

export const Route = createFileRoute("/nuevos-ingresos")({
  head: () => ({
    meta: [
      { title: "Nuevos ingresos | SHELLY AVENUE" },
      {
        name: "description",
        content: "Lo último que llegó de USA: piezas recién ingresadas en stock limitado.",
      },
      { property: "og:title", content: "Nuevos ingresos | SHELLY AVENUE" },
      { property: "og:description", content: "Piezas recién llegadas de USA, en stock limitado." },
      { property: "og:url", content: "/nuevos-ingresos" },
    ],
    links: [{ rel: "canonical", href: "/nuevos-ingresos" }],
  }),
  component: NuevosIngresos,
});

function NuevosIngresos() {
  const items = getNewArrivals(12);
  return (
    <div className="container-page py-10">
      <p className="eyebrow text-primary">Recién llegados</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">Nuevos ingresos</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Cada semana traemos piezas nuevas desde USA. Stock limitado por talla.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
