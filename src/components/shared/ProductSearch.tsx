"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'

interface ProductSearchProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSearch: (e: React.FormEvent) => void
  isLoading: boolean
}

export default function Component({ searchTerm, setSearchTerm, onSearch, isLoading }: ProductSearchProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Product Search
      </motion.h1>
      <motion.form
        onSubmit={onSearch}
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 -m-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
        <div className="relative flex gap-2">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-grow pl-10 pr-4 py-2 rounded-lg border-2 border-transparent bg-white shadow-lg focus:outline-none focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <motion.div
                className="h-5 w-5 border-t-2 border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </motion.form>
    </div>
  )
}