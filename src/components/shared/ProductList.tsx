/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

interface ProductListProps {
  products: any[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, transition: { staggerChildren: 0.1 } },
        visible: { opacity: 1 }
      }}
    >
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </motion.div>
  );
};

export default ProductList;
