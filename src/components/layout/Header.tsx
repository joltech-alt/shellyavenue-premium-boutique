import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storeConfig } from "@/config/store";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: string; search?: Record<string, string> };

const navItems: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Nuevos Ingresos", to: "/nuevos-ingresos" },
  { label: "Ropa", to: "/tienda", search: { grupo: "ropa" } },
  { label: "Accesorios", to: "/tienda", search: { grupo: "accesorios" } },
  { label: "Marcas", to: "/marcas" },
  { label: "Sale", to: "/tienda", search: { oferta: "1" } },
];

export function Header() {
  const { count, setCartOpen, wishlist } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/tienda", search: { q: query || undefined } });
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-ink text-background">
        <p className="container-page py-2 text-center text-[0.7rem] tracking-[0.14em] uppercase">
          {storeConfig.announcement}
        </p>
      </div>

      <div className="border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container-page grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-md p-2 text-foreground transition-colors hover:bg-accent lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/" aria-label="SHELLY AVENUE — inicio" className="shrink-0">
              <Logo />
            </Link>
          </div>

          <nav aria-label="Principal" className="hidden justify-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search as never}
                activeOptions={{ exact: item.to === "/" }}
                className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-primary [&.active]:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-0.5">
            <button
              type="button"
              aria-label="Buscar productos"
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded-md p-2 transition-colors hover:bg-accent"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/favoritos"
              aria-label={`Favoritos (${wishlist.length})`}
              className="relative rounded-md p-2 transition-colors hover:bg-accent"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.6rem] text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cuenta"
              aria-label="Mi cuenta"
              className="hidden rounded-md p-2 transition-colors hover:bg-accent sm:block"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir carrito (${count} productos)`}
              className="relative rounded-md p-2 transition-colors hover:bg-accent"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.6rem] text-primary-foreground">
                {count}
              </span>
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background">
            <form onSubmit={submitSearch} className="container-page flex gap-2 py-3">
              <label htmlFor="site-search" className="sr-only">
                Buscar productos
              </label>
              <Input
                id="site-search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre o marca…"
              />
              <Button type="submit">Buscar</Button>
            </form>
          </div>
        )}

        <div
          className={cn(
            "overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 lg:hidden",
            menuOpen ? "max-h-96" : "max-h-0 border-t-0",
          )}
        >
          <nav aria-label="Menú móvil" className="container-page flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search as never}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/60 py-3 text-sm tracking-wide last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
