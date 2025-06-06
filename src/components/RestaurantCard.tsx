import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number; // e.g., 4.5
  deliveryTimeEstimate: string; // e.g., "25-35 min"
  onClick?: (id: string | number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTimeEstimate,
  onClick,
}) => {
  console.log("Rendering RestaurantCard:", name);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
      console.log("RestaurantCard clicked:", id);
    }
  };

  return (
    <Card
      className="w-full overflow-hidden transition-all hover:shadow-md cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <CardTitle className="text-lg truncate">{name}</CardTitle>
        <p className="text-sm text-muted-foreground truncate">
          {cuisineTypes.join(', ')}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{deliveryTimeEstimate}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
export default RestaurantCard;