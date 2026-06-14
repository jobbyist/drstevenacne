import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Loader2, ShieldCheck, Droplet, Beaker, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StevenAI, StevenAIFloatingButton } from "@/components/StevenAI";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cart";
import { useCartSync } from "@/hooks/use-cart-sync";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} · Dr Steven Acne` },
      { name: "description", content: "Dermatologist-developed acne skincare from Dr Steven." },
    ],
  }),
  component: ProductPage,
});

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-serif text-4xl text-primary">Product not found</h1>
      <p className="mt-3 text-muted-foreground">It may have moved or been discontinued.</p>
      <Link to="/" className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>
    </div>
  );
}

function ProductPage() {
  useCartSync();
  const { handle } = Route.useParams();
  const router = useRouter();
  const [aiOpen, setAiOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const { data, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return res?.data?.product;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenAI={() => setAiOpen(true)} />
      <main className="container-px mx-auto max-w-[1400px] py-10 md:py-14">
        <button onClick={() => router.history.back()} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-clinical mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {isLoading ? (
          <div className="py-32 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-clinical" /></div>
        ) : !data ? (
          <NotFound />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="bg-mist rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
              {data.images?.edges?.[0]?.node ? (
                <img src={data.images.edges[0].node.url} alt={data.title} className="w-full h-full object-contain p-10 md:p-16" />
              ) : null}
            </div>
            <div>
              <span className="eyebrow">{data.productType}</span>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-primary text-balance">{data.title}</h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg">{data.description}</p>

              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-primary">
                  {formatPrice(data.priceRange.minVariantPrice.amount, data.priceRange.minVariantPrice.currencyCode)}
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">incl. VAT</span>
              </div>

              <button
                onClick={async () => {
                  const variant = data.variants.edges[0]?.node;
                  if (!variant) return;
                  setBusy(true);
                  await addItem({
                    product: { node: data },
                    variantId: variant.id,
                    variantTitle: variant.title,
                    price: variant.price,
                    quantity: 1,
                    selectedOptions: variant.selectedOptions || [],
                  });
                  setBusy(false);
                  toast.success(`${data.title} added to bag`, { position: "top-center" });
                }}
                disabled={busy}
                className="mt-8 inline-flex items-center justify-center gap-2 h-14 px-8 py-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-ink transition disabled:opacity-60 min-w-[240px]"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4" /> Add to bag</>}
              </button>

              <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
                {[
                  { I: ShieldCheck, t: "Dermatologist developed" },
                  { I: Droplet, t: "Non-comedogenic" },
                  { I: Beaker, t: "Science-backed actives" },
                ].map(({ I, t }) => (
                  <li key={t} className="bg-background p-5 flex items-center gap-3">
                    <I className="h-5 w-5 text-clinical" strokeWidth={1.6} />
                    <span className="text-[13px] text-primary">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-border pt-6 space-y-3 text-sm text-muted-foreground">
                <p><strong className="text-primary">Free delivery</strong> on orders over R750.</p>
                <p><strong className="text-primary">60-day skin happiness</strong> guarantee.</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <StevenAIFloatingButton onClick={() => setAiOpen(true)} open={aiOpen} />
      <StevenAI open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
