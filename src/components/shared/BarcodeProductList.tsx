/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

// Define the Product type based on your API response
interface Product {
  id: string;
  product_name: string;
  image_url: string;
  categories: string;
  ingredients_text: string;
  nutrition_grades: string;
}

interface BarcodeProductListProps {
  product: Product | null; // Accept a single product or null
}

const BarcodeProductList: React.FC<BarcodeProductListProps> = ({ product }) => {
  const containerVariants = {
    hidden: { opacity: 0, transition: { staggerChildren: 0.2 } },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Barcode Item
      </motion.h1>

      {product ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl md:text-2xl text-gray-500">
            Search To Get Products
          </h2>
        </motion.div>
      )}
    </section>
  );
};

export default BarcodeProductList;
