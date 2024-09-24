import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
	categories: string[];
	setCategory: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
	categories,
	setCategory,
}) => {
	return (
		<div className="w-1/3 h-full">
			<Select onValueChange={(value) => setCategory(value)}>
				<SelectTrigger>
					<SelectValue placeholder="Select a category" />
				</SelectTrigger>
				<SelectContent>
					{categories.map((cat, index) => (
						<SelectItem key={index} value={cat}>
							{cat}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default CategorySelect;
