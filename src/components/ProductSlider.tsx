import { useRef, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Loader2, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  products: ShopifyProduct[];
  loading?: boolean;
}

export function ProductSlider({ eyebrow, title, description, products, loading }: Props) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!embla) return;
    const update = () => { setCanPrev(embla.canScrollPrev()); setCanNext(embla.canScrollNext()); };
    update();
    embla.on("select", update);
    embla.on("reInit", update);
  }, [embla]);

  return (
    <section id="shop" className="py-20 md:py-28 bg-background">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl text-primary text-balance">{title}</h2>
            {description && <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl">{description}</p>}
          </div>
          <div className="hidden md:flex gap-2 shrink-0">
            <button
              onClick={() => embla?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous"
              className="h-11 w-11 rounded-full border border-border inline-flex items-center justify-center text-primary hover:bg-mist disabled:opacity-30 transition"
            ><ArrowLeft className="h-4 w-4" /></button>
            <button
              onClick={() => embla?.scrollNext()}
              disabled={!canNext}
              aria-label="Next"
              className="h-11 w-11 rounded-full border border-border inline-flex items-center justify-center text-primary hover:bg-mist disabled:opacity-30 transition"
            ><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-clinical" /></div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground border border-dashed border-border rounded-lg">
            No products found.
          </div>
        ) : (
          <div className="overflow-hidden -mx-4" ref={emblaRef}>
            <div className="flex">
              {products.map((p) => (
                <div key={p.node.id} className="pl-4 min-w-0 basis-[78%] sm:basis-[48%] lg:basis-[32%] xl:basis-[26%]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const [busy, setBusy] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    setBusy(true);
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    setBusy(false);
    toast.success(`${product.node.title} added to bag`, { position: "top-center" });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.node.handle }}
      className="group block"
    >
      <div className="relative aspect-[4/5] bg-mist overflow-hidden rounded-md">
        {image && (
          <img
            src={image.url}
            alt={image.altText ?? product.node.title}
            className="absolute inset-0 h-full w-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <button
          onClick={handleAdd}
          disabled={busy || isLoading || !variant}
          aria-label="Add to bag"
          className="absolute bottom-4 right-4 h-11 w-11 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center shadow-soft opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>
      <div className="pt-5">
        <div className="text-[11px] uppercase tracking-[0.18em] text-clinical font-semibold">{product.node.productType}</div>
        <h3 className="mt-1.5 text-lg font-medium text-primary group-hover:text-clinical transition">{product.node.title}</h3>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-primary font-semibold">
            {variant ? formatPrice(variant.price.amount, variant.price.currencyCode) : "—"}
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">View</span>
        </div>
      </div>
    </Link>
  );
}
