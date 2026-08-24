import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Instagram, Plane, Sparkles, Truck, MessageCircle } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { brands, categories, getNewArrivals } from "@/data/products";
import { storeConfig } from "@/config/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHELLY AVENUE | Moda de USA, elegida para ti" },
      {
        name: "description",
        content:
          "Tienda de ropa y accesorios originales traídos de USA para mujeres en Perú. Nuevos ingresos, marcas favoritas y envíos a todo el país.",
      },
      { property: "og:title", content: "SHELLY AVENUE | Moda de USA, elegida para ti" },
      {
        property: "og:description",
        content: "Ropa y accesorios originales de USA. Envíos a todo el Perú y pago con Yape.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const trust = [
  { icon: BadgeCheck, title: "100% originales", text: "Piezas verificadas una por una." },
  { icon: Plane, title: "Traído de USA", text: "Compra directa en tiendas americanas." },
  { icon: Truck, title: "Envíos a todo el Perú", text: "Lima y provincias, con seguimiento." },
  { icon: MessageCircle, title: "Atención por WhatsApp", text: "Te asesoramos con tu talla." },
];

const testimonials = [
  {
    name: "Camila R. (testimonio demo)",
    city: "Miraflores, Lima",
    text: "Pedí una blusa y llegó en dos días, tal cual la foto. La calidad se nota.",
  },
  {
    name: "Andrea M. (testimonio demo)",
    city: "Arequipa",
    text: "Me ayudaron con la talla por WhatsApp y quedó perfecta. Volveré a comprar.",
  },
  {
    name: "Lucía P. (testimonio demo)",
    city: "Trujillo",
    text: "El empaque llegó impecable y el jean es original. Recomendadísimo.",
  },
];

function Home() {
  const nuevos = getNewArrivals(8);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container-page grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
          <div className="max-w-xl">
            <p className="eyebrow text-primary">{storeConfig.taglineEn}</p>
            <h1 className="mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              Moda de USA,
              <br />
              <span className="italic text-primary">elegida para ti.</span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground">
              Ropa y accesorios originales seleccionados en tiendas americanas y traídos a Perú.
              Piezas limitadas, precios claros y envíos a todo el país.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/tienda">Comprar ahora</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/nuevos-ingresos">Ver nuevos ingresos</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
              Envío gratis desde {storeConfig.currency} {storeConfig.freeShippingThreshold}
            </p>
          </div>

          <div className="relative">
            <img
              src={hero}
              alt="Modelo con blusa rosa y pantalón crema de la selección SHELLY AVENUE"
              width={1600}
              height={1200}
              className="aspect-4/5 w-full rounded-xl object-cover shadow-soft md:aspect-3/4"
            />
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="container-page py-16" aria-labelledby="categorias">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">Explora</p>
            <h2 id="categorias" className="mt-2 text-3xl sm:text-4xl">
              Categorías
            </h2>
          </div>
          <Link to="/tienda" className="text-sm underline underline-offset-4 hover:text-primary">
            Ver todo
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/tienda"
              search={c.slug === "sale" ? { oferta: "1" } : { cat: c.slug }}
              className="group relative overflow-hidden rounded-lg hover-lift"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={900}
                height={1100}
                className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4">
                <h3 className="font-display text-xl text-background">{c.name}</h3>
                <p className="text-[0.7rem] tracking-wide text-background/80">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NUEVOS INGRESOS */}
      <section className="container-page py-8" aria-labelledby="nuevos">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">Recién llegados</p>
            <h2 id="nuevos" className="mt-2 text-3xl sm:text-4xl">
              Nuevos ingresos
            </h2>
          </div>
          <Link
            to="/nuevos-ingresos"
            className="text-sm underline underline-offset-4 hover:text-primary"
          >
            Ver todos
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {nuevos.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* MARCAS */}
      <section className="mt-16 surface-soft py-14" aria-labelledby="marcas">
        <div className="container-page text-center">
          <p className="eyebrow text-primary">Selección</p>
          <h2 id="marcas" className="mt-2 text-3xl sm:text-4xl">
            Marcas que amamos
          </h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {brands.map((b) => (
              <li key={b} className="font-display text-lg tracking-wide text-foreground/70">
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            Nombres referenciales de marcas cuyos productos importamos. No somos tienda oficial.
          </p>
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="container-page py-16" aria-label="Por qué comprar con nosotras">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="rounded-lg border border-border bg-card p-6 hover-lift">
              <t.icon className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="mt-4 text-lg">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="container-page pb-16" aria-labelledby="testimonios">
        <h2 id="testimonios" className="text-center text-3xl sm:text-4xl">
          Ellas ya compraron
        </h2>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Testimonios de ejemplo para esta versión demo.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-lg bg-cream p-6">
              <blockquote className="font-display text-lg italic">“{t.text}”</blockquote>
              <figcaption className="mt-4 text-xs text-muted-foreground">
                {t.name} · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-page pb-4" aria-labelledby="newsletter">
        <div className="grid gap-6 rounded-xl bg-ink px-6 py-12 text-background md:grid-cols-2 md:items-center md:px-12">
          <div>
            <h2 id="newsletter" className="text-3xl">
              Entérate primero
            </h2>
            <p className="mt-2 text-sm text-background/75">
              Nuevos ingresos, restocks y ofertas antes que nadie.
            </p>
          </div>
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Suscripción al newsletter"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="tu@correo.com"
              className="h-11 flex-1 rounded-md border border-background/25 bg-transparent px-4 text-sm text-background placeholder:text-background/50"
            />
            <Button type="submit" size="lg">
              Suscribirme
            </Button>
          </form>
          <a
            href={`https://instagram.com/${storeConfig.instagram}`}
            className="inline-flex items-center gap-2 text-sm text-background/80 underline-offset-4 hover:underline md:col-span-2"
          >
            <Instagram className="h-4 w-4" aria-hidden /> Síguenos en @{storeConfig.instagram}
          </a>
        </div>
      </section>
    </div>
  );
}
