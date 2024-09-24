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
interface BarcodeStoreState {
  bardcodeItem: Product[];
  IsLoading: boolean;
  error: string | null;
  fetchBarcodeItems: (searchTerm: string) => Promise<void>;
}

// Create Zustand store with the correct type
export const useBarCodeStore = create<BarcodeStoreState>((set) => ({
  bardcodeItem: [],
  IsLoading: false,
  error: null,
  fetchBarcodeItems: async (barcode: string) => {
    set({ IsLoading: true, error: null }); // Set loading state and reset error
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();
      set({ bardcodeItem: data.products });
    } catch (error: any) {
      set({ error: error.message }); // Set error message if there's an error
    } finally {
      set({ IsLoading: false }); // Reset loading state when finished
    }
  },
}));

