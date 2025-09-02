import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Plus, Minus, ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState("Natural");
  const [selectedSize, setSelectedSize] = useState("Standard");

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ["/api/products?category=" + product?.categoryId],
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add small delay to allow fade-in transition for dynamic content
          setTimeout(() => {
            entry.target.classList.add('animate');
            // Once animated, no need to observe anymore
            observer.unobserve(entry.target);
          }, 100);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach((el) => {
      // Check if element is already in viewport
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        // Add small delay to allow fade-in transition for dynamic content
        setTimeout(() => {
          el.classList.add('animate');
        }, 100);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => setLocation("/products")} className="bg-brown-primary hover:bg-brown-secondary">
              Browse All Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const productImages = [
    product.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
  ];

  const formatPrice = (price: string) => {
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  const reviews = [
    { id: 1, name: "Rajesh Kumar", rating: 5, comment: "Excellent quality furniture. Very satisfied with the craftsmanship.", date: "2024-01-15" },
    { id: 2, name: "Priya Sharma", rating: 4, comment: "Beautiful design and good quality. Delivery was on time.", date: "2024-01-10" },
    { id: 3, name: "Amit Patel", rating: 5, comment: "Outstanding work! The attention to detail is remarkable.", date: "2024-01-05" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <button onClick={() => setLocation("/")} className="text-gray-500 hover:text-brown-primary">Home</button>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="flex items-center">
                <button onClick={() => setLocation("/products")} className="text-gray-500 hover:text-brown-primary">Products</button>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="text-brown-primary font-medium">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Product Images */}
            <div className="fade-in-left-immediate">
              <div className="relative">
                <div 
                  className={`relative overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in transition-transform duration-300 hover:shadow-xl ${isZoomed ? 'scale-150' : 'scale-100'}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                    <ZoomIn className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative overflow-hidden rounded-lg bg-gray-100 aspect-square border-2 transition-colors ${
                        selectedImage === index ? 'border-brown-primary' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="fade-in-right-immediate" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-brown-primary text-white">
                  {product.featured ? "Featured Product" : "Premium Quality"}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-brown-primary mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-gray-600">(24 reviews)</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline space-x-4">
                  <span className="text-3xl font-bold text-brown-primary">{formatPrice(product.price)}</span>
                  <span className="text-lg text-gray-500 line-through">₹{(parseFloat(product.price) * 1.2).toLocaleString('en-IN')}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">20% OFF</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes. Free delivery available.</p>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Product Options */}
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Finish Options</h3>
                  <div className="flex space-x-3">
                    {["Natural", "Dark Walnut", "White", "Honey"].map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          selectedFinish === finish
                            ? 'border-brown-primary bg-brown-primary text-white'
                            : 'border-gray-300 hover:border-brown-primary'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Size Options</h3>
                  <div className="flex space-x-3">
                    {["Standard", "Large", "Custom"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          selectedSize === size
                            ? 'border-brown-primary bg-brown-primary text-white'
                            : 'border-gray-300 hover:border-brown-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <div className="flex space-x-4">
                  <Button className="flex-1 btn-primary py-3 hover-lift">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1 border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white py-3 transition-all duration-300 hover:scale-105">
                    Buy Now
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  Request Custom Quote
                </Button>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="h-8 w-8 text-brown-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-gray-600">Within city limits</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-brown-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">5 Year Warranty</p>
                  <p className="text-xs text-gray-600">Manufacturing defects</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-8 w-8 text-brown-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">7 Day Return</p>
                  <p className="text-xs text-gray-600">No questions asked</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16 fade-in-up">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
                <TabsTrigger value="care">Care Instructions</TabsTrigger>
                <TabsTrigger value="delivery">Delivery Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Product Details</h4>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Material:</dt>
                            <dd className="font-medium">{product.material || "Solid Oak Wood"}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Finish:</dt>
                            <dd className="font-medium">{product.finish || "Natural Stain"}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Dimensions:</dt>
                            <dd className="font-medium">{product.dimensions || "72\" x 84\" x 36\""}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Weight:</dt>
                            <dd className="font-medium">45 kg</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Assembly:</dt>
                            <dd className="font-medium">Professional Installation</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Features</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Premium quality solid wood construction</li>
                          <li>• Handcrafted by skilled artisans</li>
                          <li>• Eco-friendly, non-toxic finishes</li>
                          <li>• Anti-termite and anti-fungal treatment</li>
                          <li>• Customizable size and finish options</li>
                          <li>• Easy maintenance and cleaning</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Customer Reviews</h3>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl font-bold text-brown-primary mb-2">4.2</div>
                          <div className="flex justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-gray-600">Based on 24 reviews</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="md:col-span-2 space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="font-semibold">{review.name}</h4>
                                <div className="flex items-center mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="care" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <h4 className="text-lg font-semibold mb-4">Care & Maintenance Instructions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Daily Care</h5>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Dust regularly with a soft, dry cloth</li>
                            <li>• Avoid direct sunlight and heat sources</li>
                            <li>• Use coasters for beverages</li>
                            <li>• Clean spills immediately</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Deep Cleaning</h5>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Use mild soap solution for cleaning</li>
                            <li>• Apply wood polish every 6 months</li>
                            <li>• Avoid harsh chemicals and abrasives</li>
                            <li>• Professional maintenance recommended annually</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="delivery" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Delivery Information</h4>
                        <dl className="space-y-3">
                          <div>
                            <dt className="font-medium text-gray-900">Delivery Time:</dt>
                            <dd className="text-gray-700">2-3 weeks from order confirmation</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">Delivery Charges:</dt>
                            <dd className="text-gray-700">Free within city limits, ₹500 for outskirts</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">Installation:</dt>
                            <dd className="text-gray-700">Professional installation included</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">Assembly Time:</dt>
                            <dd className="text-gray-700">2-3 hours depending on product</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-4">What to Expect</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• SMS/Call confirmation before delivery</li>
                          <li>• 2-hour delivery window</li>
                          <li>• Quality check at delivery</li>
                          <li>• Installation by certified technicians</li>
                          <li>• Care instructions provided</li>
                          <li>• Packaging material removal</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-16 fade-in-up">
              <h2 className="text-2xl font-bold text-brown-primary mb-8">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                    <div 
                      className="h-48 bg-cover bg-center rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${relatedProduct.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'})`
                      }}
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-brown-primary group-hover:text-brown-secondary transition-colors duration-300 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-brown-primary font-bold text-lg">{formatPrice(relatedProduct.price)}</p>
                      <Button 
                        className="w-full mt-3 bg-brown-primary hover:bg-brown-secondary"
                        onClick={() => setLocation(`/product/${relatedProduct.id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}