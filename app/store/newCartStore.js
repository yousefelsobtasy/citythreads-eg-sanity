// store/cartStore.js
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useNewCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      cartCount: 0,
      isCartOpen: false,

      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      // Initialize cart items from local storage
      initializeCart: () => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        set({ cartItems: storedCartItems, cartCount: storedCartItems.length });
      },

      // Add item to cart
      addToCart: (newItem) => {
        const existingItem = get().cartItems.find((item) => item.id === newItem.id);

        let updatedCartItems;

        if (existingItem) {
          updatedCartItems = get().cartItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          updatedCartItems = [...get().cartItems, newItem];
        }

        set({ cartItems: updatedCartItems, cartCount: updatedCartItems.length });
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      },

      // Remove item from cart
      removeFromCart: (item) => {
        const updatedCartItems = get().cartItems.filter(e => e.id !== item.id);
        set({ cartItems: updatedCartItems, cartCount: updatedCartItems.length });
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      },

      // Clear cart
      clearCart: () => {
        set({ cartItems: [], cartCount: 0 });
        localStorage.removeItem('cartItems');
      },
    }),
    {
      name: 'cart-storage', // unique name for the storage
      getStorage: () => localStorage, // specify localStorage as the storage
    }
  )
);

export default useNewCartStore;