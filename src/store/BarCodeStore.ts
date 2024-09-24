/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Define the Product interface based on the API response
interface Product {
  id: string;
  product_name: string;
  image_url: string;
  categories: string;
  ingredients_text: string;
  nutrition_grades: string;
}

// Define the state and actions for the store
interface BarcodeStoreState {
  barcodeItem: Product | null; // Change from array to Product object or null
  isLoading: boolean;
  error: string | null;
  fetchBarcodeItems: (barcode: string) => Promise<void>;
}

// Create Zustand store with the correct type
export const useBarCodeStore = create<BarcodeStoreState>((set) => ({
  barcodeItem: null, // Initialize to null
  isLoading: false,
  error: null,
  fetchBarcodeItems: async (barcode: string) => {
    set({ isLoading: true, error: null }); // Set loading state and reset error
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();

      // Check if product data is available
      if (data.product) {
        const product: Product = {
          id: barcode, // Use barcode as ID or extract from data
          product_name: data.product.product_name || "Unknown Product",
          image_url: data.product.image_url || '',
          categories: data.product.categories || "Uncategorized",
          ingredients_text: data.product.ingredients_text || 'Ingredients not available',
          nutrition_grades: data.product.nutrition_grades || 'N/A',
        };
        set({ barcodeItem: product }); // Set the barcode item to the fetched product
      } else {
        set({ barcodeItem: null }); // Reset if no product found
      }
    } catch (error: any) {
      set({ error: error.message }); // Set error message if there's an error
    } finally {
      set({ isLoading: false }); // Reset loading state when finished
    }
  },
}));
