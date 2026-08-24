# Shelly Avenue Boutique

Crea una tienda ecommerce responsive premium para una marca femenina llamada SHELLY AVENUE, inspirada en la estructura de una tienda de ropa americana como descosale.com pero SIN copiar su identidad visual, textos ni assets. La tienda venderá ropa y accesorios originales traídos de USA principalmente para mujeres en Perú.

BRANDING:
- Nombre: SHELLY AVENUE
- Tagline principal: “Moda de USA, elegida para ti.”
- Tagline secundario opcional en inglés: “Style from USA, picked for you.”
- Estética: femenina, elegante, fresca, aspiracional, moderna. NO infantil ni saturada.
- Paleta: rosa empolvado/blush como base, rosa frambuesa para CTA, blanco/crema para fondos, negro suave/gris carbón para texto.
- Crea un logotipo wordmark original “SHELLY AVENUE” y un isotipo SVG simple con una S elegante integrada sutilmente con una bolsa de compras o monograma; debe verse bien en header, favicon y redes.
- Tipografía: mezcla de serif editorial elegante para títulos + sans moderna y limpia para interfaz.

ARQUITECTURA Y UX:
1. Header sticky desktop/mobile con logo, Inicio, Nuevos Ingresos, Ropa, Accesorios, Marcas, Sale, búsqueda, favoritos, cuenta y carrito con contador.
2. Barra superior: “Ropa original traída de USA · Envíos a todo el Perú”.
3. Home con hero editorial grande, CTA “Comprar ahora”, “Ver nuevos ingresos”. Evita imágenes con copyright de marcas específicas; usa placeholders/gradientes elegantes o imágenes libres provistas por el entorno si están disponibles.
4. Sección categorías con cards: Tops, Vestidos, Jeans/Pantalones, Poleras/Jackets, Carteras/Accesorios, Sale.
5. Sección Nuevos Ingresos con 8 productos demo.
6. Sección “Marcas que amamos” con nombres demo tipo Calvin Klein, GAP, Tommy Hilfiger, Levi’s, Michael Kors, Coach, Nike, Guess, sin usar logos registrados como assets.
7. Sección de confianza: “100% originales”, “Traído de USA”, “Envíos a todo el Perú”, “Atención por WhatsApp”.
8. Testimonials demo claramente de ejemplo.
9. Newsletter/Instagram CTA y footer con términos, cambios y devoluciones, envíos, preguntas frecuentes y contacto.

CATÁLOGO:
- Grid responsive de productos.
- Filtros por categoría, marca, talla, precio, color y disponibilidad.
- Ordenar: más recientes, más vendidos, precio menor/mayor, mayor descuento.
- Cada card: imagen, marca, nombre, precio actual, precio anterior tachado, % descuento, tallas disponibles, corazón wishlist y botón de agregar rápido.
- Incluye al menos 16 productos DEMO claramente identificables como datos de ejemplo con moneda S/.

FICHA DE PRODUCTO:
- Galería, zoom/lightbox, marca, nombre, precio, descuento, selector talla/color, guía de tallas, stock, selector cantidad, agregar al carrito, favoritos, descripción, composición/cuidado, “producto original traído de USA”, estimación de envío y productos relacionados.

CARRITO:
- Drawer lateral y página completa.
- Editar cantidad, eliminar, subtotal, costo de envío estimado, barra de envío gratis opcional/configurable.
- Guardar carrito en localStorage para que persista.

CHECKOUT:
- Formulario nombre, DNI opcional, teléfono, email, departamento/provincia/distrito, dirección, referencia, método de entrega y notas.
- Método de pago principal: YAPE.
- Diseña flujo de Yape manual listo para producción: mostrar un bloque para QR (placeholder administrable), nombre del receptor y número Yape configurables; pedir “Número de operación Yape” y permitir adjuntar comprobante/captura. Mostrar instrucciones claras. NO inventar un número Yape real.
- Botón final “Confirmar pedido”. Al confirmar, genera código de pedido SA-XXXXXX, resumen del pedido y pantalla de éxito.
- Incluye botón “Enviar pedido por WhatsApp” que arma un mensaje con código, items, total y datos esenciales; deja el número de WhatsApp como variable/configuración, no inventes uno.
- Añade opción visual secundaria “Tarjeta / transferencia — próximamente”, sin simular un pago real.

BACKEND / DATOS:
- Para esta primera versión, que todo funcione en demo con datos locales, carrito y checkout funcionales sin pagos reales.
- Estructura el código de manera fácil de conectar después a Supabase o backend para productos, pedidos, inventario y clientes.
- Añade un pequeño archivo/config central para: WhatsApp, número Yape, titular Yape, QR Yape, costo envío, umbral envío gratis, Instagram y correo.
- No expongas secretos.

DISEÑO:
- Mobile-first, especialmente iPhone.
- Animaciones sutiles, hover premium, buen espaciado.
- Accesibilidad: contraste, labels, teclado y estados focus.
- SEO básico: title, description, Open Graph, schema Product básico para demos.
- Español como idioma principal.

Crea el proyecto completo y navegable, con contenido de muestra elegante y coherente. La meta es que al abrir el preview parezca una tienda real lista para que después reemplacemos productos, fotos, QR Yape y datos de contacto.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://shellyavenue-premium-boutique.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/db96ec43-f058-4f65-afd0-3cd5a9111b67).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
