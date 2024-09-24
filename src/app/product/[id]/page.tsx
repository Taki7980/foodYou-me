'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

interface Product {
  product_name: string
  image_url: string
  ingredients_text: string
  nutriments: {
    energy_100g: number
    fat_100g: number
    carbohydrates_100g: number
    proteins_100g: number
  }
  labels: string
}

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
      const data = await response.json()
      if (data.status === 1) {
        setProduct(data.product)
      }
    }
    fetchProduct()
  }, [id])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full flex items-center justify-center"
            >
              <Image
                src={product.image_url || '/placeholder.svg'}
                alt={product.product_name}
                width={400}
                height={400}
                className="w-fit h-fit object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
              
              <h2 className="text-xl font-semibold mt-6 mb-2">Ingredients</h2>
              <p className="text-muted-foreground">{product.ingredients_text || 'Not available'}</p>
              
              <h2 className="text-xl font-semibold mt-6 mb-2">Nutritional Values (per 100g)</h2>
              <div className="grid grid-cols-2 gap-4">
                {['energy', 'fat', 'carbohydrates', 'proteins'].map((nutrient) => (
                  <motion.div
                    key={nutrient}
                    className="bg-muted p-4 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p className="text-sm font-medium">{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}</p>
                    <p className="text-2xl font-bold">
                      {product.nutriments[`${nutrient}_100g` as keyof typeof product.nutriments] || 'N/A'}
                      {nutrient === 'energy' ? ' kcal' : ' g'}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold mt-6 mb-2">Labels</h2>
              <div className="flex flex-wrap gap-2">
                {product.labels ? 
                  product.labels.split(',').map((label, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Badge variant="secondary">{label.trim()}</Badge>
                    </motion.div>
                  )) : 
                  <p className="text-muted-foreground">Not available</p>
                }
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}