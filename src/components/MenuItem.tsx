import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card'; // Using Card for structure

interface MenuItemProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string; // Optional image
  onAddToCart: (item: { id: string | number; name: string; price: number }) => void;
  // For cart variant, additional props like quantity, onQuantityChange could be added
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  console.log("Rendering MenuItem:", name);

  const handleAddToCartClick = () => {
    onAddToCart({ id, name, price });
    console.log("Added to cart:", name);
    // Consider using toast notification here
  };

  return (
    <Card className="w-full flex flex-col sm:flex-row items-start sm:items-center p-3 gap-3 transition-shadow hover:shadow-sm">
      {imageUrl && (
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={name}
          className="w-full sm:w-20 h-20 object-cover rounded-md flex-shrink-0"
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
        />
      )}
      <div className="flex-grow space-y-1">
        <h3 className="font-semibold text-base">{name}</h3>
        {description && <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>}
        <p className="text-sm font-medium">${price.toFixed(2)}</p>
      </div>
      <Button variant="outline" size="sm" onClick={handleAddToCartClick} className="mt-2 sm:mt-0 sm:ml-auto flex-shrink-0">
        <PlusCircle className="mr-1.5 h-4 w-4" /> Add
      </Button>
    </Card>
  );
};
export default MenuItem;