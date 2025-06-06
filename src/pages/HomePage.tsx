import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Input } from '@/components/ui/input';
import Carousel, { CarouselSlide } from '@/components/Carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import RestaurantCard from '@/components/RestaurantCard';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge'; // Badge is used within RestaurantCard

const placeholderSlides: CarouselSlide[] = [
  { id: 1, imageUrl: 'https://via.placeholder.com/1200x400/FFA07A/FFFFFF?text=Special+Offer+1', title: 'Burger Bonanza', description: 'Get 50% off on all beef burgers!', link: '/offers/burger-bonanza' },
  { id: 2, imageUrl: 'https://via.placeholder.com/1200x400/98FB98/000000?text=Pizza+Fiesta', title: 'Pizza Fiesta', description: 'Buy one get one free on large pizzas.', link: '/offers/pizza-fiesta' },
  { id: 3, imageUrl: 'https://via.placeholder.com/1200x400/ADD8E6/FFFFFF?text=Healthy+Bowls', title: 'Healthy Bowls', description: 'Fresh salad bowls starting at $7.99.', link: '/restaurants?category=healthy' },
];

const placeholderRestaurants = [
  { id: 'r1', name: 'The Gourmet Place', imageUrl: 'https://via.placeholder.com/300x200/FFD700/000000?text=Gourmet+Dining', cuisineTypes: ['Italian', 'Fine Dining'], rating: 4.7, deliveryTimeEstimate: '30-40 min' },
  { id: 'r2', name: 'Quick Bites Central', imageUrl: 'https://via.placeholder.com/300x200/87CEEB/FFFFFF?text=Fast+Food', cuisineTypes: ['Burgers', 'Fries', 'Fast Food'], rating: 4.2, deliveryTimeEstimate: '15-25 min' },
  { id: 'r3', name: 'Vegan Delights', imageUrl: 'https://via.placeholder.com/300x200/90EE90/000000?text=Vegan+Food', cuisineTypes: ['Vegan', 'Healthy', 'Salads'], rating: 4.9, deliveryTimeEstimate: '25-35 min' },
  { id: 'r4', name: 'Sushi Heaven', imageUrl: 'https://via.placeholder.com/300x200/FA8072/FFFFFF?text=Sushi+Place', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.5, deliveryTimeEstimate: '35-45 min' },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  console.log('HomePage loaded');

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Navigate to a search results page or filter current view
    // For now, just log
  };

  const handleRestaurantClick = (id: string | number) => {
    console.log('Restaurant clicked:', id);
    navigate(`/restaurant-menu/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu cartItemCount={0} isLoggedIn={false} onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Search Bar Section - though NavigationMenu has one, could be a larger one here */}
        <section className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Next Meal</h1>
          <Input
            type="search"
            placeholder="Search for restaurants, cuisines, or dishes..."
            className="max-w-xl mx-auto text-base p-4 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
          />
        </section>

        {/* Carousel for Promotions */}
        <section className="mb-12">
          <Carousel slides={placeholderSlides} autoplayDelay={5000} />
        </section>

        {/* Restaurant Listings */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Popular Restaurants</h2>
          <ScrollArea className="h-[600px] md:h-auto"> {/* Adjust height as needed or remove for natural flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {placeholderRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  imageUrl={restaurant.imageUrl}
                  cuisineTypes={restaurant.cuisineTypes}
                  rating={restaurant.rating}
                  deliveryTimeEstimate={restaurant.deliveryTimeEstimate}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          </ScrollArea>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">View All Restaurants</Button>
          </div>
        </section>
      </main>
      {/* Footer could be added here if it's a separate component */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} FoodApp, Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;