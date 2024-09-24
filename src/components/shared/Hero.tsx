"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import Image from "next/image";
import BarcodeSearch from "./BarcodeSearch";
import { useBarCodeStore } from "@/store/BarCodeStore";

interface ProductSearchProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	onSearch: (e: React.FormEvent) => void;
	isLoading: boolean;
}

export default function Hero({
	searchTerm,
	setSearchTerm,
	onSearch,
	isLoading,
}: ProductSearchProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [barcode, setBarcode] = useState("");

	const { fetchBarcodeItems } = useBarCodeStore();

	const handleBarcodeSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsFocused(true);
		try {
			await fetchBarcodeItems(barcode);
		} catch (error) {
			console.error("Error fetching barcode item:", error);
		} finally {
			setIsFocused(false);
		}
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<Image
				src="/bg.jpg"
				alt="Background"
				layout="fill"
				objectFit="cover"
				className="absolute z-0"
			/>
			<div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-pink-600/70 z-10" />
			<div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-12"
				>
					<motion.h1
						className="text-5xl sm:text-6xl font-extrabold text-white mb-4"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Discover Amazing Products
					</motion.h1>
					<motion.p
						className="text-xl text-gray-200 max-w-2xl mx-auto"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						Find the perfect items for your lifestyle with our
						advanced product search.
					</motion.p>
				</motion.div>
				<motion.form
					onSubmit={onSearch}
					className="relative"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<AnimatePresence>
						{isFocused && (
							<motion.div
								className="absolute inset-0 -m-1 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400"
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
							className="flex-grow pl-10 pr-4 py-3 rounded-lg border-2 border-transparent bg-white/90 shadow-lg focus:outline-none focus:border-transparent text-gray-800 placeholder-gray-500"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<AnimatePresence>
							{searchTerm && (
								<motion.button
									type="button"
									onClick={() => setSearchTerm("")}
									className="right-24 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-400 hover:text-gray-600"
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									transition={{ duration: 0.2 }}
								>
									<X className="h-5 w-5 font-extrabold flex self-center" />
								</motion.button>
							)}
						</AnimatePresence>
						<Button
							type="submit"
							disabled={isLoading}
							className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
						>
							{isLoading ? (
								<motion.div
									className="h-5 w-5 border-t-2 border-white rounded-full"
									animate={{ rotate: 360 }}
									transition={{
										duration: 1,
										repeat: Infinity,
										ease: "linear",
									}}
								/>
							) : (
								"Search"
							)}
						</Button>
					</div>
				</motion.form>
				<motion.div
					className="mt-12 flex justify-center space-x-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<div className="text-center">
						<div className="text-4xl font-bold text-white mb-2">
							100k+
						</div>
						<div className="text-gray-200">Products</div>
					</div>
					<div className="text-center">
						<div className="text-4xl font-bold text-white mb-2">
							50+
						</div>
						<div className="text-gray-200">Categories</div>
					</div>
					<div className="text-center">
						<div className="text-4xl font-bold text-white mb-2">
							24/7
						</div>
						<div className="text-gray-200">Support</div>
					</div>
				</motion.div>
				<motion.div
					className="mt-16 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 1 }}
				>
					
						<BarcodeSearch
							barcode={barcode}
							setBarcode={setBarcode}
							onSearch={handleBarcodeSearch}
							isLoading={isLoading}
						/>
					
				</motion.div>
			</div>
		</div>
	);
}
