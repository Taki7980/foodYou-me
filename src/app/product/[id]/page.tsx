'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{product.product_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className='h-full w-full flex items-center justify-center'>
              <Image
                src={product.image_url || '/placeholder.svg'}
                alt={product.product_name}
                width={400}
                height={400}
                className="w-fit h-fit object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <p>{product.ingredients_text || 'Not available'}</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Nutritional Values (per 100g)</h2>
              <ul>
                <li>Energy: {product.nutriments.energy_100g || 'N/A'} kcal</li>
                <li>Fat: {product.nutriments.fat_100g || 'N/A'} g</li>
                <li>Carbohydrates: {product.nutriments.carbohydrates_100g || 'N/A'} g</li>
                <li>Proteins: {product.nutriments.proteins_100g || 'N/A'} g</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Labels</h2>
              <p>{product.labels || 'Not available'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}