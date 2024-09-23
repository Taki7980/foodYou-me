import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: {
    id: string;
    product_name: string;
    image_url: string;
    categories: string;
    ingredients_text: string;
    nutrition_grades: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{product.product_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={product.image_url || '/placeholder.svg'}
            alt={product.product_name}
            width={200}
            height={200}
            className="w-full h-48 object-cover mb-4"
          />
          <p><strong>Category:</strong> {product.categories}</p>
          <p><strong>Ingredients:</strong> {product.ingredients_text || 'Not available'}</p>
          <p><strong>Nutrition Grade:</strong> {product.nutrition_grades?.toUpperCase() || 'Not available'}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/product/${product.id}`}>
            <Button>View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
