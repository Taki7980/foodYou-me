/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Define the Product type
type Product = {
  product_name: string;
  code: string;
  generic_name?: string;
  brands?: string;
  countries_tags?: string[];
  ingredients_text?: string;
  nutriments: {
    energy: number;
    sugars: number;
    fat: number;
    salt: number;
    [key: string]: number | undefined;
  };
  allergens_tags?: string[];
  labels_tags?: string[];
  packaging?: string;
  image_url?: string;
  quantity?: string;
};

// Define the state and actions for the store
interface ProductStoreState {
  products: Product[];
  IsLoadingProduct: boolean;
  error: string | null;
  fetchProducts: (searchTerm: string) => Promise<void>;
  setProducts: (products: Product[]) => void;
}

// Create Zustand store with the correct type
export const useProductStore = create<ProductStoreState>((set) => ({
  products: [],
  IsLoadingProduct: false,
  error: null,
  fetchProducts: async (searchTerm: string) => {
    set({ IsLoadingProduct: true, error: null });
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          searchTerm
        )}&json=true`
      );
      const data = await response.json();
      set({ products: data.products });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ IsLoadingProduct: false });
    }
  },
  setProducts: (products: Product[]) => set({ products }),
}));