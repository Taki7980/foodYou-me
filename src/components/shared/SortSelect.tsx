import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortSelectProps {
  setSortBy: (sortBy: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ setSortBy }) => {
  return (
    <Select onValueChange={(value) => setSortBy(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name_asc">Name (A-Z)</SelectItem>
        <SelectItem value="name_desc">Name (Z-A)</SelectItem>
        <SelectItem value="grade_asc">Nutrition Grade (Ascending)</SelectItem>
        <SelectItem value="grade_desc">Nutrition Grade (Descending)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
