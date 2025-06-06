import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';

const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid postal code." }),
  country: z.string().min(2, { message: "Country is required." }),
  paymentMethod: z.enum(['creditCard', 'paypal', 'cod'], { required_error: "Please select a payment method." }),
  cardNumber: z.string().optional(), // Make optional and add conditional validation if needed
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'USA',
      paymentMethod: undefined,
      agreeToTerms: false,
    },
  });

  console.log('CheckoutPage loaded');

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Checkout data submitted:', data);
    // Simulate order placement
    const orderId = `ORD-${Date.now()}`;
    // In a real app, you'd send this to a backend and then navigate
    navigate(`/order-tracking/${orderId}`);
  };

  // Example order summary data (would come from cart state)
  const orderSummary = {
    subtotal: 35.98,
    taxes: 2.88,
    deliveryFee: 5.00,
    total: 43.86,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Assuming 0 cart items after checkout or use actual cart count */}
      <NavigationMenu cartItemCount={0} isLoggedIn={true} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button variant="outline" size="sm" onClick={() => navigate('/cart')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Button>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8">
            {/* Delivery & Payment Info Section */}
            <section className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader><CardTitle>Delivery Address</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl><Input placeholder="12345" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
                <CardContent>
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="creditCard" /></FormControl>
                            <FormLabel className="font-normal">Credit Card</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="paypal" /></FormControl>
                            <FormLabel className="font-normal">PayPal</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="cod" /></FormControl>
                            <FormLabel className="font-normal">Cash on Delivery (COD)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  {form.watch('paymentMethod') === 'creditCard' && (
                    <div className="space-y-4 mt-4 pt-4 border-t">
                       <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                       <div className="grid sm:grid-cols-2 gap-4">
                         <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date (MM/YY)</FormLabel>
                            <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                         <FormField control={form.control} name="cardCvc" render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl><Input placeholder="123" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                       </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Order Summary Section */}
            <aside className="md:col-span-1">
              <Card>
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between"><span>Subtotal</span><span>${orderSummary.subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Taxes</span><span>${orderSummary.taxes.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Delivery Fee</span><span>${orderSummary.deliveryFee.toFixed(2)}</span></div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${orderSummary.total.toFixed(2)}</span></div>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Agree to terms and conditions</FormLabel>
                          <FormDescription>You agree to our Terms of Service and Privacy Policy.</FormDescription>
                           <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </CardFooter>
              </Card>
            </aside>
          </form>
        </Form>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} FoodApp, Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default CheckoutPage;