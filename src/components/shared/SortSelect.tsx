"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
	setSortBy: (sortBy: string) => void;
}

export default function Component({ setSortBy }: SortSelectProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleValueChange = (value: string) => {
		setSortBy(value);
		setIsOpen(false);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="relative w-1/3 h-fit"
		>
			<Select
				onValueChange={handleValueChange}
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<SelectTrigger className="w-full h-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
					<SelectValue placeholder="Sort by" className="w-full" />
					<motion.div
						animate={{ rotate: isOpen ? 180 : 0 }}
						transition={{ duration: 0.3 }}
					>
						<ChevronDown className="h-4 w-4 opacity-50" />
					</motion.div>
				</SelectTrigger>
				<SelectContent className="bg-white rounded-lg shadow-xl border-none">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.2 }}
					>
						<SelectItem
							value="name_asc"
							className="flex items-center space-x-2"
						>
							<ArrowUpDown className="h-4 w-4" />
							<span>Name (A-Z)</span>
						</SelectItem>
						<SelectItem
							value="name_desc"
							className="flex items-center space-x-2"
						>
							<ArrowUpDown className="h-4 w-4 rotate-180" />
							<span>Name (Z-A)</span>
						</SelectItem>
						<SelectItem
							value="grade_asc"
							className="flex items-center space-x-2"
						>
							<ArrowUpDown className="h-4 w-4" />
							<span>Nutrition Grade (Ascending)</span>
						</SelectItem>
						<SelectItem
							value="grade_desc"
							className="flex items-center space-x-2"
						>
							<ArrowUpDown className="h-4 w-4 rotate-180" />
							<span>Nutrition Grade (Descending)</span>
						</SelectItem>
					</motion.div>
				</SelectContent>
			</Select>
		</motion.div>
	);
}
