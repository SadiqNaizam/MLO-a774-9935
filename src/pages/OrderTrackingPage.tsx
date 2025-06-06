import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OrderStatusStepper from '@/components/OrderStatusStepper';
import MapPlaceholder from '@/components/MapPlaceholder';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, Truck, ShoppingBag, ListOrdered } from 'lucide-react'; // More icons

const orderSteps = [
  { id: 'confirmed', name: 'Order Confirmed', icon: ListOrdered },
  { id: 'preparing', name: 'Preparing Food', icon: Loader2 },
  { id: 'pickup', name: 'Ready for Pickup', icon: ShoppingBag }, // For restaurants with pickup
  { id: 'delivery', name: 'Out for Delivery', icon: Truck },
  { id: 'delivered', name: 'Delivered', icon: CheckCircle },
];

const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  // Simulate current step changing over time
  const [currentStepId, setCurrentStepId] = useState(orderSteps[0].id);

  console.log(`OrderTrackingPage loaded for order ID: ${orderId}`);

  useEffect(() => {
    // Simulate order progress
    const timeouts: NodeJS.Timeout[] = [];
    if (currentStepId === orderSteps[0].id) { // Confirmed
      timeouts.push(setTimeout(() => setCurrentStepId(orderSteps[1].id), 3000)); // -> Preparing
    }
    if (currentStepId === orderSteps[1].id) { // Preparing
      timeouts.push(setTimeout(() => setCurrentStepId(orderSteps[3].id), 5000)); // -> Out for Delivery (skipping pickup for this example)
    }
     if (currentStepId === orderSteps[3].id) { // Out for Delivery
      timeouts.push(setTimeout(() => setCurrentStepId(orderSteps[4].id), 7000)); // -> Delivered
    }
    return () => timeouts.forEach(clearTimeout);
  }, [currentStepId]);
  
  // Placeholder order details - in a real app, fetch based on orderId
  const orderDetails = {
    id: orderId,
    restaurantName: "The Gourmet Place",
    estimatedDelivery: "4:30 PM - 4:45 PM",
    deliveryAddress: "123 Main St, Anytown, 12345",
    items: [
      { name: "Lasagna Bolognese", quantity: 1 },
      { name: "Tiramisu", quantity: 1 },
    ],
    total: 43.86,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu cartItemCount={0} isLoggedIn={true} /> {/* Cart is likely empty or irrelevant here */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-muted-foreground mb-8">Order ID: {orderDetails.id}</p>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status and Details */}
          <section className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <CardDescription>Estimated Delivery: {orderDetails.estimatedDelivery}</CardDescription>
              </CardHeader>
              <CardContent>
                <OrderStatusStepper steps={orderSteps} currentStepId={currentStepId} />
                 <div className="mt-6 text-center">
                  {currentStepId === 'delivered' && <p className="text-green-600 font-semibold text-lg">Your order has been delivered. Enjoy your meal!</p>}
                  {currentStepId === 'confirmed' && <p className="text-blue-600 font-semibold">Your order is confirmed and the restaurant is preparing it.</p>}
                  {currentStepId === 'preparing' && <p className="text-blue-600 font-semibold">The chef is working their magic on your order!</p>}
                  {currentStepId === 'delivery' && <p className="text-blue-600 font-semibold">Your order is out for delivery. Track its progress below.</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>From: {orderDetails.restaurantName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-1">Delivering to:</p>
                <p className="text-muted-foreground mb-4">{orderDetails.deliveryAddress}</p>
                <p className="font-semibold mb-1">Items:</p>
                <ul className="list-disc list-inside text-muted-foreground mb-4">
                  {orderDetails.items.map(item => (
                    <li key={item.name}>{item.quantity}x {item.name}</li>
                  ))}
                </ul>
                <p className="font-semibold text-lg">Total: ${orderDetails.total.toFixed(2)}</p>
              </CardContent>
            </Card>
          </section>

          {/* Map and Actions */}
          <aside className="lg:col-span-1 space-y-6">
            <MapPlaceholder height="h-80" message="Live delivery tracking will appear here."/>
            <Card>
                <CardHeader><CardTitle>Need Help?</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full">Contact Restaurant</Button>
                    <Button variant="outline" className="w-full">Support Chat</Button>
                    <Button variant="default" className="w-full" onClick={() => navigate('/')}>Back to Homepage</Button>
                </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} FoodApp, Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default OrderTrackingPage;