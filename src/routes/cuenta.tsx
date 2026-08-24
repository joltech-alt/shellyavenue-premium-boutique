import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { storeConfig } from "@/config/store";

export const Route = createFileRoute("/cuenta")({
  head: () => ({
    meta: [
      { title: "Mi cuenta | SHELLY AVENUE" },
      {
        name: "description",
        content: "Consulta el estado de tu pedido SHELLY AVENUE o escríbenos por WhatsApp.",
      },
      { property: "og:title", content: "Mi cuenta | SHELLY AVENUE" },
      { property: "og:description", content: "Seguimiento de pedidos y atención personalizada." },
      { property: "og:url", content: "/cuenta" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cuenta" }],
  }),
  component: Cuenta,
});

function Cuenta() {
  return (
    <div className="container-page max-w-xl py-16">
      <h1 className="text-3xl sm:text-4xl">Mi cuenta</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        En esta versión demo no hay cuentas de usuario todavía. Cuando conectemos el backend podrás
        registrarte, ver tu historial de pedidos y guardar direcciones.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        Mientras tanto, para consultar tu pedido escríbenos con tu código SA-XXXXXX a{" "}
        {storeConfig.email}.
      </p>
      <Button asChild className="mt-6">
        <Link to="/tienda">Seguir comprando</Link>
      </Button>
    </div>
  );
}
