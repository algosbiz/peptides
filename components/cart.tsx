"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/components/ui";
import { VialMockup } from "@/components/vial-mockup";

type CartProduct = Pick<
  Product,
  "no" | "name" | "format" | "purity" | "price" | "category"
>;

type CartItem = {
  product: CartProduct;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  addItem: (product: Product) => void;
  openCart: () => void;
  closeCart: () => void;
  setQuantity: (productNo: string, quantity: number) => void;
  removeItem: (productNo: string) => void;
};

const STORAGE_KEY = "elite-biotech-cart-v1";
const FREE_SHIPPING_THRESHOLD = 200;

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((product: Product) => {
    const cartProduct: CartProduct = {
      no: product.no,
      name: product.name,
      format: product.format,
      purity: product.purity,
      price: product.price,
      category: product.category,
    };

    setItems((current) => {
      const existing = current.find((item) => item.product.no === product.no);
      if (existing) {
        return current.map((item) =>
          item.product.no === product.no
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { product: cartProduct, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((productNo: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) =>
        current.filter((item) => item.product.no !== productNo),
      );
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.product.no === productNo ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const removeItem = useCallback((productNo: string) => {
    setItems((current) =>
      current.filter((item) => item.product.no !== productNo),
    );
  }, []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      isOpen,
      addItem,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setQuantity,
      removeItem,
    }),
    [addItem, isOpen, itemCount, items, removeItem, setQuantity],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const {
    items,
    itemCount,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
  } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const shippingRemaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const shippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [closeCart, isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-[visibility] ${
        isOpen ? "visible" : "invisible delay-300"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 cursor-default bg-paper/80 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!isOpen}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[480px] flex-col border-l border-line bg-paper shadow-[-24px_0_70px_-30px_oklch(0.05_0.02_255_/_0.9)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-5 sm:px-7">
          <div>
            <p className="datum text-xs font-semibold uppercase tracking-wider text-lime">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
            <h2
              id="cart-title"
              className="mt-1 font-display text-2xl uppercase text-ink"
            >
              Your cart
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-line text-2xl leading-none text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
            aria-label="Close cart"
          >
            <span aria-hidden>×</span>
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="border-b border-line px-5 py-5 sm:px-7">
              <div className="flex items-center justify-between gap-4">
                <p className="datum text-xs font-semibold uppercase tracking-wide text-ink-2">
                  Free express shipping
                </p>
                <p className="datum text-xs font-semibold uppercase text-lime">
                  {shippingRemaining > 0
                    ? `${formatPrice(shippingRemaining)} to go`
                    : "Unlocked"}
                </p>
              </div>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-paper-3"
                role="progressbar"
                aria-label="Progress toward free express shipping"
                aria-valuemin={0}
                aria-valuemax={FREE_SHIPPING_THRESHOLD}
                aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
              >
                <div
                  className="h-full rounded-full bg-lime transition-[width] duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.product.no}
                    className="ruled flex gap-4 rounded-xl bg-paper-2 p-3"
                  >
                    <div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-paper-3">
                      <VialMockup
                        name={item.product.name}
                        format={item.product.format}
                        purity={item.product.purity}
                        category={item.product.category}
                        className="h-24 w-auto"
                      />
                    </div>
                    <div className="min-w-0 flex-1 py-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-sm uppercase leading-snug text-ink">
                            {item.product.name}
                          </h3>
                          <p className="datum mt-1 text-[0.65rem] text-lime">
                            COA verified
                          </p>
                        </div>
                        <p className="datum shrink-0 text-sm font-semibold text-ink">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="flex h-9 items-center rounded-md border border-line bg-paper">
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(
                                item.product.no,
                                item.quantity - 1,
                              )
                            }
                            className="h-full w-9 text-lg text-ink-2 transition-colors hover:text-ink"
                            aria-label={`Decrease ${item.product.name} quantity`}
                          >
                            −
                          </button>
                          <span
                            className="datum flex h-full min-w-9 items-center justify-center border-x border-line text-xs font-semibold text-ink"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(
                                item.product.no,
                                item.quantity + 1,
                              )
                            }
                            className="h-full w-9 text-lg text-ink-2 transition-colors hover:text-ink"
                            aria-label={`Increase ${item.product.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.no)}
                          className="datum text-[0.65rem] font-semibold uppercase tracking-wide text-ink-3 transition-colors hover:text-ink"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line bg-paper-2/70 px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink-2">Subtotal</span>
                <span className="datum text-xl font-semibold text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-3">
                Shipping and GST calculated at checkout.
              </p>
              <Link
                href="/account"
                onClick={closeCart}
                className="datum mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-lime px-5 py-3 text-sm font-semibold uppercase tracking-wider text-onlime transition-opacity hover:opacity-90"
              >
                Secure checkout <span aria-hidden>→</span>
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="datum mx-auto mt-4 block text-xs font-semibold uppercase tracking-wider text-ink-2 underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink"
              >
                Continue shopping
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-paper-2 text-2xl text-lime"
              aria-hidden
            >
              +
            </div>
            <h3 className="mt-5 font-display text-xl uppercase text-ink">
              Your cart is empty
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-2">
              Add a research reagent and it will appear here.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="datum mt-6 rounded-md bg-lime px-5 py-3 text-xs font-semibold uppercase tracking-wider text-onlime transition-opacity hover:opacity-90"
            >
              Browse catalogue
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
