import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BenefitsBar } from "@/components/BenefitsBar";
import { ProductSlider } from "@/components/ProductSlider";
import { Regimen } from "@/components/Regimen";
import { Science } from "@/components/Science";
import { AIBanner } from "@/components/AIBanner";
import { Footer } from "@/components/Footer";
import { StevenAI, StevenAIFloatingButton } from "@/components/StevenAI";
import { PSAModal } from "@/components/PSAModal";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartSync } from "@/hooks/use-cart-sync";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr Steven Acne · Dermatologist-Developed Acne Skincare" },
      { name: "description", content: "Clear, predictable results for acne-prone skin. A dermatologist-developed four-step regimen backed by 20 years of clinical experience." },
      { property: "og:title", content: "Dr Steven Acne · Dermatologist-Developed Acne Skincare" },
      { property: "og:description", content: "Clear, predictable results for acne-prone skin. A dermatologist-developed four-step regimen." },
    ],
  }),
  component: Home,
});

function Home() {
  useCartSync();
  const [aiOpen, setAiOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const products = data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenAI={() => setAiOpen(true)} />
      <main>
        <Hero onOpenAI={() => setAiOpen(true)} />
        <BenefitsBar />
        <ProductSlider
          eyebrow="The collection"
          title="Four products. One clear-skin system."
          description="Every formula in the Dr Steven range earns its place — engineered for acne-prone skin without compromising the barrier."
          products={products}
          loading={isLoading}
        />
        <Regimen />
        <Science />
        <ProductSlider
          eyebrow="Best for"
          title="Most-loved by acne-prone skin."
          products={products}
          loading={isLoading}
        />
        <AIBanner onOpenAI={() => setAiOpen(true)} />
      </main>
      <Footer />
      <StevenAIFloatingButton onClick={() => setAiOpen(true)} open={aiOpen} />
      <StevenAI open={aiOpen} onClose={() => setAiOpen(false)} />
      <PSAModal />
    </div>
  );
}
