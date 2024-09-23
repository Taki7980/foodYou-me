/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback } from 'react';
import ProductSearch from '@/components/shared/ProductSearch';
import BarcodeSearch from '@/components/shared/BarcodeSearch';
import CategorySelect from '@/components/shared/CategorySelect';
import SortSelect from '@/components/shared/SortSelect';
import ProductList from '@/components/shared/ProductList';
import { Button } from "@/components/ui/button";
interface Product {
  id: string;
  product_name: string;
  brands: string;
  image_url: string;
  code: string;
  categories: string[];
  packaging: string[];
  ingredients_text: string;
  nutriscore_grade: string;
  countries_tags: string[];
  stores_tags: string[];
  quantity: string;
  nutrition_facts: {
    energy: string;
    fat: string;
    carbohydrates: string;
    sugars: string;
    proteins: string;
    salt: string;
  };
}


export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchCategories = async () => {
      
      try {
        const response = await fetch('https://world.openfoodfacts.org/categories.json');
        const data = await response.json();
        setCategories(data.tags.map((tag: any) => tag.name));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchTerm)}&json=true`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBarcodeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      if (data.status === 1) {
        setProducts([data.product]);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error searching by barcode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Food Facts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <ProductSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onSearch={handleSearch} 
          isLoading={isLoading} 
        />
        <BarcodeSearch 
          barcode={barcode} 
          setBarcode={setBarcode} 
          onSearch={handleBarcodeSearch} 
          isLoading={isLoading} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <CategorySelect categories={categories} setCategory={setCategory} />
        <SortSelect setSortBy={setSortBy} />
      </div>
      
      <ProductList products={products} />
      
      {products.length > 0 && (
        <div className="mt-8 text-center">
          <Button onClick={loadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}
