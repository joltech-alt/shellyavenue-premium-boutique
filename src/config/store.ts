/**
 * Configuración central de la tienda.
 * Reemplaza estos valores por los reales antes de salir a producción.
 * Ningún valor aquí es secreto: son datos públicos de contacto/tienda.
 */
export const storeConfig = {
  name: "SHELLY AVENUE",
  tagline: "Moda de USA, elegida para ti.",
  taglineEn: "Style from USA, picked for you.",
  announcement: "Ropa original traída de USA · Envíos a todo el Perú",

  /** Número de WhatsApp en formato internacional sin "+" (ej: "51999999999"). Vacío = sin configurar. */
  whatsapp: "",
  email: "hola@shellyavenue.com",
  instagram: "shellyavenue",

  /** Datos de Yape. NO son reales: configúralos antes de recibir pagos. */
  yape: {
    /** Titular de la cuenta Yape */
    holder: "PENDIENTE DE CONFIGURAR",
    /** Número Yape (9 dígitos). Vacío = se muestra aviso de pendiente. */
    number: "",
    /** Ruta o URL de la imagen del QR (ej: "/yape-qr.png"). Vacío = placeholder. */
    qrImageUrl: "",
  },

  /** Envío */
  shippingCost: 15,
  freeShippingThreshold: 199,
  shippingEtaLima: "1 a 2 días hábiles",
  shippingEtaProvincia: "3 a 5 días hábiles",

  currency: "S/",
} as const;

export type StoreConfig = typeof storeConfig;
