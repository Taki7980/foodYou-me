/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

interface ProductListProps {
  products: any[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
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
        Explore Our Products
      </motion.h1>

      {products.length === 0 ? (
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
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        
          
        >
          {products.map((product, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default ProductList;
