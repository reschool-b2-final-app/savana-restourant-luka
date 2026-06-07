"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { menuItems, type MenuItem } from "@/lib/data";

type CartItem = {
  id: number;
  quantity: number;
};

type CartContextValue = {
  cart: CartItem[];
  addItem: (id: number, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, quantity: number) => void;
  clearCart: () => void;
  count: number;
  total: number;
  itemsWithDetails: Array<CartItem & Pick<MenuItem, "name" | "price" | "imageUrl" | "description">>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("savana-cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("savana-cart", JSON.stringify(cart));
  }, [cart]);

  const itemsWithDetails = useMemo(
    () =>
      cart
        .map((item) => {
          const product = menuItems.find((menuItem) => menuItem.id === item.id);
          if (!product) return null;
          return {
            ...item,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
          };
        })
        .filter((item): item is CartItem & Pick<MenuItem, "name" | "price" | "imageUrl" | "description"> => Boolean(item)),
    [cart]
  );

  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const total = useMemo(
    () => itemsWithDetails.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [itemsWithDetails]
  );

  const addItem = (id: number, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...current, { id, quantity }];
    });
  };

  const removeItem = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, quantity: number) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateItem, clearCart, count, total, itemsWithDetails }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
