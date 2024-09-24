'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Leaf } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    product_name: string
    image_url: string
    categories: string
    ingredients_text: string
    nutrition_grades: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const nutritionGradeColor = {
    a: 'bg-green-500',
    b: 'bg-lime-500',
    c: 'bg-yellow-500',
    d: 'bg-orange-500',
    e: 'bg-red-500',
  }[product.nutrition_grades?.toLowerCase()] || 'bg-gray-500'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative">
          <Image
            src={product.image_url || '/placeholder.svg'}
            alt={product.product_name}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-2 left-2"
          >
            <Badge variant="secondary" className="text-xs font-semibold">
              {product.categories.split(',')[0]}
            </Badge>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`absolute bottom-2 right-2 w-10 h-10 rounded-full ${nutritionGradeColor} flex items-center justify-center`}
          >
            <span className="text-white font-bold">
              {product.nutrition_grades?.toUpperCase() || 'N/A'}
            </span>
          </motion.div>
        </div>
        <CardContent className="flex-grow">
          <h3 className="font-semibold text-lg mt-2 mb-2">{product.product_name}</h3>
          <div className="flex items-start space-x-2 text-sm text-muted-foreground mb-2">
            <Leaf className="w-4 h-4 mt-1 flex-shrink-0" />
            <p className="line-clamp-2">{product.ingredients_text || 'Ingredients not available'}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/product/${product.id}`} className="w-full">
            <Button className="w-full group">
              View Details
              <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}