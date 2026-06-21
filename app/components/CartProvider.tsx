"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { menuItems, type MenuItem } from "@/lib/data";

type CartItem = {
  id: number;
  quantity: number;
};
// ეს ფაილი განსაზღვრავს CartProvider კომპონენტს, რომელიც მართავს სავაჭრო კალათის მდგომარეობას და აწვდის მას აპლიკაციის დანარჩენ ნაწილს React Context-ის საშუალებით. ის ასევე მოიცავს მორგებულ კაკალს, useCart-ს, კალათის მდგომარეობასა და მოქმედებებზე მარტივი წვდომისთვის. კალათა შენახულია localStorage-ში, ამიტომ ის ხელუხლებელი რჩება გვერდის გადატვირთვის შემდეგ.
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
// CartContextValue ტიპი განსაზღვრავს კალათის კონტექსტის სტრუქტურას, რომელიც მოიცავს კალათის ნივთების მასივს, ფუნქციებს ნივთების დამატებისა და მართვისთვის, ასევე კალათაში არსებული ნივთების რაოდენობას, საერთო ფასს და დეტალებით გაჯერებულ ნივთების მასივს.
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
// useEffect-ის ჰუკი გამოიყენება კალათის მდგომარეობის localStorage-ში შენახვისთვის. როდესაც კალათა იცვლება, ახალი მდგომარეობა ინახება localStorage-ში "savana-cart" ქვეშ, რაც უზრუნველყოფს კალათის შენახვას გვერდის გადატვირთვის შემდეგაც. ასევე, კომპონენტის მ mount-ისას, ის ცდილობს localStorage-დან კალათის მონაცემების აღებას და მათი მდგომარეობაში დაყენებას, თუ ისინი არსებობს და სწორად ფორმატირებულია.
  useEffect(() => {
    window.localStorage.setItem("savana-cart", JSON.stringify(cart));
  }, [cart]);
// itemsWithDetails არის კალათის ნივთების მასივი, რომელიც გაჯერებულია დამატებითი დეტალებით, როგორიცაა სახელი, აღწერა, ფასი და სურათის URL. ეს დეტალები მიღებულია menuItems-დან, სადაც თითოეული კალათის ნივთის ID ემთხვევა menuItems-ში არსებულ პროდუქტს. ეს საშუალებას აძლევს აპლიკაციას მარტივად აჩვენოს კალათაში არსებული ნივთების დეტალები მომხმარებლისთვის.
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
// 
  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
// total არის კალათის საერთო ფასი, რომელიც გამოითვლება ყველა ნივთის ფასისა და რაოდენობის ნამრავლის ჯამით. ეს მნიშვნელობა განახლდება ყოველ ჯერზე, როდესაც კალათის ნივთები შეიცვლება, რაც უზრუნველყოფს ზუსტ და რეალურ დროში განახლებულ ინფორმაციას კალათის საერთო ღირებულების შესახებ.
  const total = useMemo(
    () => itemsWithDetails.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [itemsWithDetails]
  );
// addItem ფუნქცია გამოიყენება კალათაში ახალი ნივთის დამატებისთვის ან არსებული ნივთის რაოდენობის გაზრდისთვის. თუ კალათაში უკვე არსებობს ნივთი მოცემული ID-ით, მისი რაოდენობა გაიზრდება მითითებული რაოდენობით (ან 1-ით, თუ რაოდენობა არ არის მითითებული). თუ ნივთი არ არსებობს კალათაში, ის დაემატება ახალ ჩანაწერად. ეს ფუნქცია უზრუნველყოფს მარტივ და ეფექტურ გზას კალათის განახლებისთვის მომხმარებლის ინტერაქციების საფუძველზე.
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
// removeItem ფუნქცია გამოიყენება კალათიდან ნივთის წასაშლელად. ის იღებს ნივთის ID-ს და ფილტრავს კალათის მასივს, ამოღებს ყველა ნივთს, რომლის ID ემთხვევა მოცემულ ID-ს. ეს ფუნქცია უზრუნველყოფს მარტივ გზას მომხმარებლისთვის, რომ წაშალოს არასაჭირო ან შეცდომით დამატებული ნივთები კალათიდან.
  const removeItem = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };
// updateItem ფუნქცია გამოიყენება კალათის ნივთის რაოდენობის განახლებისთვის. ის იღებს ნივთის ID-ს და ახალ რაოდენობას, შემდეგ კი განაახლებს კალათის მასივს ისე, რომ მოცემული ID-ით ნივთი მიიღებს ახალ რაოდენობას. თუ ახალი რაოდენობა 0 ან ნაკლებია, ის ავტომატურად წაიშლება კალათიდან. ეს ფუნქცია უზრუნველყოფს მოქნილობას კალათის მართვისთვის, რაც საშუალებას აძლევს მომხმარებლებს ადვილად შეცვალონ ნივთების რაოდენობა ან წაშალონ ისინი საჭიროების შემთხვევაში.
  const updateItem = (id: number, quantity: number) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };
// clearCart ფუნქცია გამოიყენება კალათის მთლიანად გასუფთავებისთვის. ის უბრალოდ ცვლის კალათის მდგომარეობას ცარიელ მასივზე, რაც ნიშნავს, რომ ყველა ნივთი წაიშლება კალათიდან. ეს ფუნქცია არის მარტივი და ეფექტური გზა მომხმარებლებისთვის, რომ სწრაფად და მარტივად დაალაგონ თავიანთი კალათა და დაიწყონ თავიდან ახალი შეკვეთის შედგენა.
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
// CartProvider კომპონენტი არის React Context Provider, რომელიც უზრუნველყოფს კალათის მართვის ფუნქციონალობას და მონაცემებს მის შვილობილი კომპონენტებისთვის. ის ინახავს კალათის მდგომარეობას, უზრუნველყოფს ფუნქციებს ნივთების დამატებისა, წაშლისა და განახლებისთვის, ასევე გამოთვლის კალათის საერთო რაოდენობას და ფასს. ეს კომპონენტი არის ცენტრალური ადგილი, სადაც კალათის ლოგიკა და მონაცემები მართება ხდება, რაც საშუალებას აძლევს აპლიკაციის დანარჩენ ნაწილს მარტივად გამოიყენოს კალათის ფუნქციონალობა.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
