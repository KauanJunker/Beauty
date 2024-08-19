import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixCliente } from "@/context/wixContext";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  subtotal: number;
  getCart: (wixClient: WixCliente) => void;
  addItem: (
    wixClient: WixCliente,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixCliente, itemId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  subtotal: 0,
  getCart: async (wixClient) => {
    const cart = await wixClient.currentCart.getCurrentCart();
    // const subtotal = calculateSubtotal(cart);

    set({
      cart: cart || [],
      isLoading: false,
      counter: cart?.lineItems.length || 0,
    });
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
      subtotal: Number(response.cart?.subtotal?.amount),
    });
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
      subtotal: Number(response.cart?.subtotal?.amount),
    });
  },
}));
