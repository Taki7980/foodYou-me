import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from 'framer-motion';

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ searchTerm, setSearchTerm, onSearch, isLoading }) => {
  return (
    <motion.form
      onSubmit={onSearch}
      className="flex gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e: { target: { value: string; }; }) => setSearchTerm(e.target.value)}
      />
      <Button type="submit" disabled={isLoading}>
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </motion.form>
  );
};

export default ProductSearch;
