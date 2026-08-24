import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { storeConfig } from "@/config/store";

const help = [
  { label: "Envíos", to: "/envios" },
  { label: "Cambios y devoluciones", to: "/cambios-y-devoluciones" },
  { label: "Preguntas frecuentes", to: "/preguntas-frecuentes" },
  { label: "Términos y condiciones", to: "/terminos" },
  { label: "Contacto", to: "/contacto" },
];

const shop = [
  { label: "Nuevos ingresos", to: "/nuevos-ingresos" },
  { label: "Tienda", to: "/tienda" },
  { label: "Marcas", to: "/marcas" },
  { label: "Favoritos", to: "/favoritos" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {storeConfig.tagline} Selección curada de ropa y accesorios originales traídos de USA
            para mujeres en Perú.
          </p>
        </div>

        <nav aria-label="Tienda">
          <h3 className="eyebrow text-muted-foreground">Tienda</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {shop.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Ayuda">
          <h3 className="eyebrow text-muted-foreground">Ayuda</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {help.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow text-muted-foreground">Escríbenos</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" aria-hidden />
              {storeConfig.whatsapp ? (
                <a
                  href={`https://wa.me/${storeConfig.whatsapp}`}
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp
                </a>
              ) : (
                <span className="text-muted-foreground">WhatsApp por configurar</span>
              )}
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-primary" aria-hidden />
              <a
                href={`https://instagram.com/${storeConfig.instagram}`}
                className="transition-colors hover:text-primary"
              >
                @{storeConfig.instagram}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" aria-hidden />
              <a href={`mailto:${storeConfig.email}`} className="transition-colors hover:text-primary">
                {storeConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SHELLY AVENUE. Todos los derechos reservados.</p>
          <p>Tienda demo · productos, precios y testimonios de ejemplo.</p>
        </div>
      </div>
    </footer>
  );
}
