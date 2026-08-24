import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { storeConfig } from "@/config/store";
import { getProducts, type Product } from "@/data/products";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

export type CartLine = CartItem & { product: Product; lineTotal: number };

type ShopContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  missingForFreeShipping: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWished: (productId: string) => boolean;
};

const CART_KEY = "shelly-avenue:cart:v1";
const WISH_KEY = "shelly-avenue:wishlist:v1";

const ShopContext = createContext<ShopContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStorage<CartItem[]>(CART_KEY, []));
    setWishlist(readStorage<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === item.productId && i.size === item.size && i.color === item.color,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i, idx) => (idx === index ? { ...i, quantity: Math.max(0, quantity) } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }, []);

  const value = useMemo<ShopContextValue>(() => {
    const catalog = getProducts();
    const lines: CartLine[] = items.flatMap((item) => {
      const product = catalog.find((p) => p.id === item.productId);
      if (!product) return [];
      return [{ ...item, product, lineTotal: product.price * item.quantity }];
    });
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const threshold = storeConfig.freeShippingThreshold;
    const shipping = subtotal === 0 || subtotal >= threshold ? 0 : storeConfig.shippingCost;
    return {
      items,
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingThreshold: threshold,
      missingForFreeShipping: Math.max(0, threshold - subtotal),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      cartOpen,
      setCartOpen,
      wishlist,
      toggleWishlist,
      isWished: (id: string) => wishlist.includes(id),
    };
  }, [items, cartOpen, wishlist, addItem, updateQuantity, removeItem, clearCart, toggleWishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop debe usarse dentro de ShopProvider");
  return ctx;
}
