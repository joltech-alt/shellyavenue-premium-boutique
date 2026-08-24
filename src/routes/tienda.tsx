import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  allSizes,
  brands,
  categories,
  colorPalette,
  getProducts,
  isOnSale,
  type Product,
} from "@/data/products";
import { discountPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type Search = {
  q?: string;
  cat?: string;
  grupo?: string;
  oferta?: string;
};

export const Route = createFileRoute("/tienda")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : undefined,
    cat: typeof search.cat === "string" ? search.cat : undefined,
    grupo: typeof search.grupo === "string" ? search.grupo : undefined,
    oferta: search.oferta === "1" ? "1" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Tienda | SHELLY AVENUE" },
      {
        name: "description",
        content:
          "Catálogo de ropa y accesorios originales de USA: tops, vestidos, jeans, casacas y carteras con envío a todo el Perú.",
      },
      { property: "og:title", content: "Tienda | SHELLY AVENUE" },
      {
        property: "og:description",
        content: "Filtra por categoría, marca, talla, color y precio. Envíos a todo el Perú.",
      },
      { property: "og:url", content: "/tienda" },
    ],
    links: [{ rel: "canonical", href: "/tienda" }],
  }),
  component: TiendaPage,
});

type Sort = "recientes" | "vendidos" | "precio-asc" | "precio-desc" | "descuento";

function TiendaPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/tienda" });
  const all = getProducts();

  const [cats, setCats] = useState<string[]>(search.cat ? [search.cat] : []);
  const [marcas, setMarcas] = useState<string[]>([]);
  const [tallas, setTallas] = useState<string[]>([]);
  const [colores, setColores] = useState<string[]>([]);
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [maxPrice, setMaxPrice] = useState(400);
  const [sort, setSort] = useState<Sort>("recientes");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    let out: Product[] = all.filter((p) => {
      if (search.grupo && p.group !== search.grupo) return false;
      if (search.oferta === "1" && !isOnSale(p)) return false;
      if (search.q) {
        const q = search.q.toLowerCase();
        if (!`${p.name} ${p.brand}`.toLowerCase().includes(q)) return false;
      }
      if (cats.length && !cats.includes(p.category)) return false;
      if (marcas.length && !marcas.includes(p.brand)) return false;
      if (tallas.length && !p.sizes.some((s) => tallas.includes(s))) return false;
      if (colores.length && !p.colors.some((c) => colores.includes(c.name))) return false;
      if (soloDisponibles && p.stock <= 0) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    out = [...out].sort((a, b) => {
      switch (sort) {
        case "vendidos":
          return a.bestSellerRank - b.bestSellerRank;
        case "precio-asc":
          return a.price - b.price;
        case "precio-desc":
          return b.price - a.price;
        case "descuento":
          return (
            discountPercent(b.price, b.compareAtPrice) - discountPercent(a.price, a.compareAtPrice)
          );
        default:
          return b.createdAt.localeCompare(a.createdAt);
      }
    });
    return out;
  }, [all, search, cats, marcas, tallas, colores, soloDisponibles, maxPrice, sort]);

  const title = search.oferta
    ? "Sale"
    : search.grupo === "accesorios"
      ? "Accesorios"
      : search.grupo === "ropa"
        ? "Ropa"
        : search.q
          ? `Resultados para “${search.q}”`
          : "Toda la tienda";

  function clearAll() {
    setCats([]);
    setMarcas([]);
    setTallas([]);
    setColores([]);
    setSoloDisponibles(false);
    setMaxPrice(400);
    navigate({ search: {} });
  }

  return (
    <div className="container-page py-10">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <p className="eyebrow text-primary">Catálogo demo</p>
          <h1 className="mt-2 truncate text-3xl sm:text-4xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{results.length} productos</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <label htmlFor="orden" className="sr-only">
            Ordenar por
          </label>
          <select
            id="orden"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="recientes">Más recientes</option>
            <option value="vendidos">Más vendidos</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="descuento">Mayor descuento</option>
          </select>
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </Button>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside
          className={cn(
            "space-y-6 rounded-lg border border-border bg-card p-5 lg:block lg:border-0 lg:bg-transparent lg:p-0",
            filtersOpen ? "block" : "hidden",
          )}
          aria-label="Filtros"
        >
          <FilterGroup title="Categoría">
            {categories
              .filter((c) => c.slug !== "sale")
              .map((c) => (
                <CheckRow
                  key={c.slug}
                  id={`cat-${c.slug}`}
                  label={c.name}
                  checked={cats.includes(c.slug)}
                  onChange={() => toggle(cats, setCats, c.slug)}
                />
              ))}
          </FilterGroup>

          <FilterGroup title="Marca">
            {brands.map((b) => (
              <CheckRow
                key={b}
                id={`marca-${b}`}
                label={b}
                checked={marcas.includes(b)}
                onChange={() => toggle(marcas, setMarcas, b)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Talla">
            <div className="flex flex-wrap gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={tallas.includes(s)}
                  onClick={() => toggle(tallas, setTallas, s)}
                  className={cn(
                    "min-w-10 rounded-md border border-border px-2.5 py-1.5 text-xs transition-colors",
                    tallas.includes(s) ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Color">
            <div className="flex flex-wrap gap-2">
              {colorPalette.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-pressed={colores.includes(c.name)}
                  aria-label={c.name}
                  onClick={() => toggle(colores, setColores, c.name)}
                  className={cn(
                    "h-7 w-7 rounded-full border-2 transition-transform",
                    colores.includes(c.name)
                      ? "border-primary scale-110"
                      : "border-border hover:scale-105",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title={`Precio hasta S/ ${maxPrice}`}>
            <Slider
              value={[maxPrice]}
              min={30}
              max={400}
              step={10}
              onValueChange={([v]) => setMaxPrice(v)}
              aria-label="Precio máximo"
            />
          </FilterGroup>

          <CheckRow
            id="disponibles"
            label="Solo disponibles"
            checked={soloDisponibles}
            onChange={() => setSoloDisponibles((v) => !v)}
          />

          <Button variant="ghost" className="w-full" onClick={clearAll}>
            Limpiar filtros
          </Button>
        </aside>

        <section>
          {results.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No encontramos productos con esos filtros.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow text-muted-foreground">{title}</h2>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
}
