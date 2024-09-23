import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode } from "lucide-react";

interface BarcodeSearchProps {
  barcode: string;
  setBarcode: (code: string) => void;
  onSearch: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const BarcodeSearch: React.FC<BarcodeSearchProps> = ({ barcode, setBarcode, onSearch, isLoading }) => {
  return (
    <form onSubmit={onSearch} className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter barcode..."
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <Button type="submit" disabled={isLoading}>
        <Barcode className="mr-2 h-4 w-4" /> Search by Barcode
      </Button>
    </form>
  );
};

export default BarcodeSearch;
