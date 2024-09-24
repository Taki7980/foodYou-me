/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BarcodeProductList from "@/components/shared/BarcodeProductList";
import CategorySelect from "@/components/shared/CategorySelect";
import Hero from "@/components/shared/Hero";
import ProductList from "@/components/shared/ProductList";
import SortSelect from "@/components/shared/SortSelect";
import { Button } from "@/components/ui/button";
import { useBarCodeStore } from "@/store/BarCodeStore";
import { useProductStore } from "@/store/ProductStore";
import { useEffect, useState } from "react";

export default function Home() {
	// State from product store and barcode store
	const { products, fetchProducts, setProducts } = useProductStore();
	const { barcodeItem, fetchBarcodeItems } = useBarCodeStore();

	// UI and local state
	const [searchTerm, setSearchTerm] = useState("");
	const [barcode, setBarcode] = useState("");
	const [category, setCategory] = useState("");
	const [sortBy, setSortBy] = useState("");
	const [page, setPage] = useState(1);
	const [categories, setCategories] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch categories on mount
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(
					"https://world.openfoodfacts.org/categories.json"
				);
				const data = await response.json();
				setCategories(data.tags.map((tag: any) => tag.name));
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	// Search handler
	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await fetchProducts(searchTerm);
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Load more products (pagination)
	const loadMore = () => setPage((prevPage) => prevPage + 1);
	console.log(barcodeItem);

	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-10">
			{/* Hero section with search */}
			<Hero
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				onSearch={handleSearch}
				isLoading={isLoading}
			/>

			{/* Filters section */}
			<div className="flex  items-center justify-center mb-8 gap-10">
				<CategorySelect
					categories={categories}
					setCategory={setCategory}
				/>
				<SortSelect setSortBy={setSortBy} />
			</div>

			{/* Product listing */}
			{barcodeItem && (
				<BarcodeProductList product={barcodeItem} />
			)
			}
			{products.length > 0 && (
				<ProductList products={products} />
			)}
			{products?<ProductList products={products} />:<BarcodeProductList product={barcodeItem} />}

			{/* Load more button */}
			{products.length > 0 && (
				<div className="mt-8 text-center">
					<Button onClick={loadMore} disabled={!isLoading}>
						{isLoading ? "Loading..." : "Load More"}
					</Button>
				</div>
			)}
		</div>
	);
}
