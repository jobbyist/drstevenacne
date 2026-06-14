import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/shopify";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "ZAR";

  useEffect(() => { if (open) syncCart(); }, [open, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) { window.open(url, "_blank"); setOpen(false); }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open cart"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-mist transition"
        >
          <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full p-0 px-1 flex items-center justify-center text-[10px] bg-clinical text-clinical-foreground border-0">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-6">
        <SheetHeader className="p-0 text-left">
          <SheetTitle className="font-serif text-3xl text-primary">Your bag</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your bag is empty." : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground mb-3" strokeWidth={1.4} />
              <p className="text-sm text-muted-foreground">Add a product to start your regimen.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto -mx-2 px-2 min-h-0">
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={item.variantId} className="flex gap-4 py-5">
                      <div className="w-20 h-20 bg-mist rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-contain p-1"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-primary truncate">{item.product.node.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.product.node.productType}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="h-7 w-7 inline-flex items-center justify-center border border-border rounded-sm hover:bg-mist"
                          ><Minus className="h-3 w-3" /></button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="h-7 w-7 inline-flex items-center justify-center border border-border rounded-sm hover:bg-mist"
                          ><Plus className="h-3 w-3" /></button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.variantId)}
                          aria-label="Remove"
                          className="text-muted-foreground hover:text-destructive"
                        ><Trash2 className="h-4 w-4" /></button>
                        <p className="text-sm font-semibold text-primary">
                          {formatPrice(parseFloat(item.price.amount) * item.quantity, item.price.currencyCode)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-5 border-t border-border space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-semibold text-primary">{formatPrice(totalPrice, currency)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping & taxes calculated at checkout.</p>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:bg-ink transition disabled:opacity-60"
                >
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Checkout securely <ExternalLink className="w-4 h-4" /></>}
                </button>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="block text-center text-xs uppercase tracking-[0.2em] text-clinical hover:underline"
                >Continue shopping</Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
