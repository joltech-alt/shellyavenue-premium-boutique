import tops from "@/assets/cat-tops.jpg";
import vestidos from "@/assets/cat-vestidos.jpg";
import jeans from "@/assets/cat-jeans.jpg";
import jackets from "@/assets/cat-jackets.jpg";
import accesorios from "@/assets/cat-accesorios.jpg";
import sale from "@/assets/cat-sale.jpg";

/**
 * DATOS DEMO. Esta capa está aislada a propósito: para conectar un backend
 * (Lovable Cloud / Supabase) basta con reemplazar las funciones de acceso
 * (getProducts, getProductBySlug, ...) por consultas reales.
 */

export type CategorySlug =
  | "tops"
  | "vestidos"
  | "jeans"
  | "jackets"
  | "accesorios"
  | "sale";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  /** Agrupación de navegación */
  group: "ropa" | "accesorios";
  price: number;
  compareAtPrice?: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  bestSellerRank: number;
  createdAt: string;
  description: string;
  composition: string;
  care: string;
};

export const categories: {
  slug: CategorySlug;
  name: string;
  image: string;
  blurb: string;
}[] = [
  { slug: "tops", name: "Tops", image: tops, blurb: "Blusas, polos y crops" },
  { slug: "vestidos", name: "Vestidos", image: vestidos, blurb: "Casual y de fiesta" },
  { slug: "jeans", name: "Jeans / Pantalones", image: jeans, blurb: "Denim y tailoring" },
  { slug: "jackets", name: "Poleras / Jackets", image: jackets, blurb: "Abrigo con estilo" },
  {
    slug: "accesorios",
    name: "Carteras / Accesorios",
    image: accesorios,
    blurb: "El detalle final",
  },
  { slug: "sale", name: "Sale", image: sale, blurb: "Hasta 50% menos" },
];

export const brands = [
  "Calvin Klein",
  "GAP",
  "Tommy Hilfiger",
  "Levi's",
  "Michael Kors",
  "Coach",
  "Nike",
  "Guess",
];

export const allSizes = ["XS", "S", "M", "L", "XL", "26", "28", "30"];

export const colorPalette = [
  { name: "Rosa", hex: "#E8B4C0" },
  { name: "Crema", hex: "#F3EAdd" },
  { name: "Negro", hex: "#2B2B2F" },
  { name: "Denim", hex: "#4A6785" },
  { name: "Frambuesa", hex: "#C43A63" },
  { name: "Camel", hex: "#C89F7B" },
];

const img = (c: CategorySlug) => {
  const map: Record<CategorySlug, string> = {
    tops,
    vestidos,
    jeans,
    jackets,
    accesorios,
    sale,
  };
  return map[c];
};

type Seed = Omit<Product, "images" | "id" | "slug" | "group"> & {
  slug?: string;
  altImage?: CategorySlug;
};

const seeds: Seed[] = [
  {
    name: "Blusa satinada manga globo",
    brand: "Calvin Klein",
    category: "tops",
    price: 139,
    compareAtPrice: 199,
    sizes: ["XS", "S", "M", "L"],
    colors: [colorPalette[0], colorPalette[1]],
    stock: 8,
    bestSellerRank: 2,
    createdAt: "2026-08-18",
    description:
      "Blusa de caída fluida con manga globo y puño elástico. Un básico elevado que combina con jeans o pantalón sastre.",
    composition: "95% poliéster, 5% elastano",
    care: "Lavar a mano en agua fría. No usar secadora.",
  },
  {
    name: "Polo básico algodón pima",
    brand: "GAP",
    category: "tops",
    price: 69,
    compareAtPrice: 99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [colorPalette[1], colorPalette[2]],
    stock: 15,
    bestSellerRank: 1,
    createdAt: "2026-08-20",
    description: "Polo de algodón suave con cuello redondo y corte regular. Ideal para el día a día.",
    composition: "100% algodón",
    care: "Lavado a máquina en frío, ciclo suave.",
  },
  {
    name: "Crop top acanalado",
    brand: "Guess",
    category: "tops",
    price: 89,
    sizes: ["XS", "S", "M"],
    colors: [colorPalette[4], colorPalette[2]],
    stock: 5,
    bestSellerRank: 9,
    createdAt: "2026-08-21",
    description: "Crop top de tejido acanalado elástico, con escote en V y tiras ajustables.",
    composition: "70% viscosa, 30% nylon",
    care: "Lavar con colores similares.",
  },
  {
    name: "Camisa oversize a rayas",
    brand: "Tommy Hilfiger",
    category: "tops",
    price: 159,
    compareAtPrice: 229,
    sizes: ["S", "M", "L"],
    colors: [colorPalette[3], colorPalette[1]],
    stock: 4,
    bestSellerRank: 12,
    createdAt: "2026-08-10",
    description: "Camisa oversize de popelina con rayas finas. Úsala cerrada o abierta como capa ligera.",
    composition: "100% algodón",
    care: "Planchar a temperatura media.",
  },
  {
    name: "Vestido midi floral",
    brand: "GAP",
    category: "vestidos",
    price: 199,
    compareAtPrice: 289,
    sizes: ["XS", "S", "M", "L"],
    colors: [colorPalette[0], colorPalette[5]],
    stock: 6,
    bestSellerRank: 3,
    createdAt: "2026-08-19",
    description: "Vestido midi de tejido ligero con estampado floral delicado y cintura elastizada.",
    composition: "100% viscosa",
    care: "Lavado en seco recomendado.",
  },
  {
    name: "Vestido slip satinado",
    brand: "Calvin Klein",
    category: "vestidos",
    price: 229,
    sizes: ["XS", "S", "M"],
    colors: [colorPalette[0], colorPalette[2]],
    stock: 3,
    bestSellerRank: 6,
    createdAt: "2026-08-22",
    description: "Vestido tipo slip con escote en V y tirantes finos regulables. Perfecto para eventos de noche.",
    composition: "97% poliéster, 3% elastano",
    care: "Lavar a mano. No retorcer.",
  },
  {
    name: "Vestido tejido manga larga",
    brand: "Michael Kors",
    category: "vestidos",
    price: 279,
    compareAtPrice: 349,
    sizes: ["S", "M", "L"],
    colors: [colorPalette[5], colorPalette[2]],
    stock: 2,
    bestSellerRank: 15,
    createdAt: "2026-07-30",
    description: "Vestido de punto fino con manga larga y silueta ajustada. Abrigado y elegante.",
    composition: "60% viscosa, 40% poliéster",
    care: "Secar en plano a la sombra.",
  },
  {
    name: "Jean mom fit tiro alto",
    brand: "Levi's",
    category: "jeans",
    price: 189,
    compareAtPrice: 259,
    sizes: ["26", "28", "30"],
    colors: [colorPalette[3]],
    stock: 10,
    bestSellerRank: 4,
    createdAt: "2026-08-17",
    description: "Jean mom fit de tiro alto en denim rígido con lavado medio. Corte clásico americano.",
    composition: "99% algodón, 1% elastano",
    care: "Lavar del revés en frío.",
  },
  {
    name: "Jean skinny azul oscuro",
    brand: "Levi's",
    category: "jeans",
    price: 179,
    sizes: ["26", "28", "30"],
    colors: [colorPalette[3], colorPalette[2]],
    stock: 7,
    bestSellerRank: 8,
    createdAt: "2026-08-12",
    description: "Denim elástico de ajuste skinny que estiliza sin apretar. Tiro medio.",
    composition: "92% algodón, 6% poliéster, 2% elastano",
    care: "No usar blanqueador.",
  },
  {
    name: "Pantalón sastre wide leg",
    brand: "Guess",
    category: "jeans",
    price: 219,
    compareAtPrice: 279,
    sizes: ["XS", "S", "M", "L"],
    colors: [colorPalette[1], colorPalette[2]],
    stock: 5,
    bestSellerRank: 11,
    createdAt: "2026-08-08",
    description: "Pantalón de vestir de pierna ancha con pinzas y caída impecable.",
    composition: "70% poliéster, 28% viscosa, 2% elastano",
    care: "Lavado en seco.",
  },
  {
    name: "Jogger felpa premium",
    brand: "Nike",
    category: "jeans",
    price: 149,
    compareAtPrice: 189,
    sizes: ["S", "M", "L"],
    colors: [colorPalette[0], colorPalette[2]],
    stock: 12,
    bestSellerRank: 7,
    createdAt: "2026-08-15",
    description: "Jogger de felpa suave con cintura elástica y puños. Comodidad total sin perder estilo.",
    composition: "80% algodón, 20% poliéster",
    care: "Lavar a máquina en frío.",
  },
  {
    name: "Polera hoodie crema",
    brand: "GAP",
    category: "jackets",
    price: 169,
    compareAtPrice: 239,
    sizes: ["S", "M", "L", "XL"],
    colors: [colorPalette[1], colorPalette[0]],
    stock: 9,
    bestSellerRank: 5,
    createdAt: "2026-08-23",
    description: "Hoodie de interior afelpado con capucha forrada y bolsillo canguro.",
    composition: "70% algodón, 30% poliéster",
    care: "No planchar sobre estampados.",
  },
  {
    name: "Jacket denim clásica",
    brand: "Levi's",
    category: "jackets",
    price: 249,
    sizes: ["S", "M", "L"],
    colors: [colorPalette[3]],
    stock: 4,
    bestSellerRank: 10,
    createdAt: "2026-08-14",
    description: "Casaca de denim con botones metálicos y bolsillos frontales. Un clásico atemporal.",
    composition: "100% algodón",
    care: "Lavar por separado las primeras veces.",
  },
  {
    name: "Windbreaker ligera",
    brand: "Nike",
    category: "jackets",
    price: 199,
    compareAtPrice: 269,
    sizes: ["XS", "S", "M", "L"],
    colors: [colorPalette[0], colorPalette[2]],
    stock: 6,
    bestSellerRank: 14,
    createdAt: "2026-08-05",
    description: "Cortavientos liviano, resistente al agua, con capucha ajustable y cierre completo.",
    composition: "100% nylon",
    care: "Limpiar con paño húmedo.",
  },
  {
    name: "Cartera tote cuero sintético",
    brand: "Michael Kors",
    category: "accesorios",
    price: 329,
    compareAtPrice: 459,
    sizes: ["Única"],
    colors: [colorPalette[5], colorPalette[2]],
    stock: 3,
    bestSellerRank: 13,
    createdAt: "2026-08-16",
    description: "Cartera tote espaciosa con herrajes dorados, asas reforzadas y correa desmontable.",
    composition: "Cuero sintético premium, forro textil",
    care: "Guardar en su bolsa de tela.",
  },
  {
    name: "Bandolera mini con cadena",
    brand: "Coach",
    category: "accesorios",
    price: 289,
    sizes: ["Única"],
    colors: [colorPalette[0], colorPalette[2]],
    stock: 5,
    bestSellerRank: 16,
    createdAt: "2026-08-11",
    description: "Bandolera compacta con cadena dorada y cierre magnético. Cabe celular, tarjetas y labial.",
    composition: "Cuero sintético",
    care: "Evitar contacto prolongado con agua.",
  },
  {
    name: "Set de scrunchies satinados",
    brand: "GAP",
    category: "accesorios",
    price: 39,
    compareAtPrice: 59,
    sizes: ["Única"],
    colors: [colorPalette[0], colorPalette[1], colorPalette[4]],
    stock: 25,
    bestSellerRank: 18,
    createdAt: "2026-08-21",
    description: "Pack de 3 scrunchies satinados que cuidan el cabello. Colores combinables.",
    composition: "100% poliéster satinado",
    care: "Lavar a mano.",
  },
  {
    name: "Lentes de sol cat eye",
    brand: "Guess",
    category: "accesorios",
    price: 129,
    compareAtPrice: 189,
    sizes: ["Única"],
    colors: [colorPalette[2], colorPalette[5]],
    stock: 8,
    bestSellerRank: 17,
    createdAt: "2026-08-09",
    description: "Lentes cat eye con protección UV400 y estuche rígido incluido.",
    composition: "Acetato y lentes polarizadas",
    care: "Limpiar con paño de microfibra.",
  },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const products: Product[] = seeds.map((s, i) => ({
  ...s,
  id: `demo-${String(i + 1).padStart(3, "0")}`,
  slug: slugify(`${s.name}-${s.brand}`),
  group: s.category === "accesorios" ? "accesorios" : "ropa",
  images: [img(s.category), img(s.altImage ?? "sale"), img("tops")],
}));

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export function isOnSale(p: Product): boolean {
  return !!p.compareAtPrice && p.compareAtPrice > p.price;
}
