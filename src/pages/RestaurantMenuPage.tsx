import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MenuItem from '@/components/MenuItem';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft } from 'lucide-react';

// Placeholder data - in a real app, this would be fetched based on restaurantId
const placeholderRestaurantDetails = {
  r1: {
    name: 'The Gourmet Place',
    logoUrl: 'https://via.placeholder.com/100/FFD700/000000?text=GP',
    rating: 4.7,
    deliveryTime: '30-40 min',
    cuisine: 'Italian, Fine Dining',
    description: 'Exquisite Italian dishes crafted with the finest ingredients. Perfect for a special occasion.',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { id: 'm1', name: 'Bruschetta Classica', description: 'Toasted bread with fresh tomatoes, garlic, basil, and olive oil.', price: 8.99, imageUrl: 'https://via.placeholder.com/150/FFC0CB/000000?text=Bruschetta' },
          { id: 'm2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, basil, and balsamic glaze.', price: 10.50, imageUrl: 'https://via.placeholder.com/150/98FB98/000000?text=Caprese' },
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { id: 'm3', name: 'Lasagna Bolognese', description: 'Classic layered pasta with meat sauce and béchamel.', price: 18.00, imageUrl: 'https://via.placeholder.com/150/ADD8E6/000000?text=Lasagna' },
          { id: 'm4', name: 'Risotto ai Funghi', description: 'Creamy risotto with porcini mushrooms.', price: 22.50, imageUrl: 'https://via.placeholder.com/150/E6E6FA/000000?text=Risotto' },
        ]
      },
      {
        category: 'Desserts',
        items: [
          { id: 'm5', name: 'Tiramisu', description: 'Ladyfingers dipped in coffee, layered with mascarpone cream.', price: 9.00, imageUrl: 'https://via.placeholder.com/150/FFFACD/000000?text=Tiramisu' },
        ]
      }
    ]
  },
  // Add more restaurants if needed for testing
};

type RestaurantData = typeof placeholderRestaurantDetails.r1;

const RestaurantMenuPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState<Array<{ id: string | number; name: string; price: number }>>([]);
  console.log(`RestaurantMenuPage loaded for restaurant ID: ${id}`);

  // Fetch restaurant data based on id, using placeholder for now
  const restaurant: RestaurantData | undefined = id ? (placeholderRestaurantDetails as any)[id] : undefined;

  const handleAddToCart = (item: { id: string | number; name: string; price: number }) => {
    setCartItems(prev => [...prev, item]);
    console.log('Added to cart:', item);
    // Here you would typically update a global cart state and show a toast
    // For now, NavigationMenu's cartItemCount will update
  };

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu cartItemCount={cartItems.length} />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Restaurant not found.</h1>
          <Button onClick={() => navigate('/')} className="mt-4">Go to Homepage</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu cartItemCount={cartItems.length} isLoggedIn={false} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Restaurants
        </Button>

        {/* Restaurant Header */}
        <section className="mb-8 p-6 bg-card border rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-primary">
              <AvatarImage src={restaurant.logoUrl} alt={restaurant.name} />
              <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-1">{restaurant.name}</h1>
              <p className="text-muted-foreground mb-2">{restaurant.cuisine}</p>
              <div className="flex items-center gap-4 text-sm mb-2">
                <Badge variant="default">{restaurant.rating} ★</Badge>
                <span className="text-muted-foreground">{restaurant.deliveryTime}</span>
              </div>
              <p className="text-sm text-muted-foreground">{restaurant.description}</p>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <ScrollArea className="h-[calc(100vh-400px)]"> {/* Adjust height based on layout */}
            <Accordion type="multiple" defaultValue={restaurant.menu.map(cat => cat.category)} className="w-full">
              {restaurant.menu.map((category, index) => (
                <AccordionItem value={category.category} key={index}>
                  <AccordionTrigger className="text-xl font-medium">{category.category}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4 pt-2">
                      {category.items.map(item => (
                        <MenuItem
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          description={item.description}
                          price={item.price}
                          imageUrl={item.imageUrl}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </section>
      </main>
       <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} FoodApp, Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default RestaurantMenuPage;