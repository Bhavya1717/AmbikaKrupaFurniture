import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CustomFurnitureModal from "@/components/CustomFurnitureModal";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCustomModal, setShowCustomModal] = useState(false);

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const categoryOptions = [
    { id: "all", name: "All Products", slug: "all" },
    ...(categories || [])
  ];

  const filteredProducts = products?.filter(product => 
    selectedCategory === "all" || product.categoryId?.toString() === selectedCategory
  ) || [];

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-antique">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brown-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-antique">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-bold text-4xl text-brown-primary mb-4">Online Showroom</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our collection and get instant pricing for your dream furniture. Every piece can be customized to your exact specifications.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {categoryOptions.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id?.toString() || (category.slug === "all" && selectedCategory === "all") ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id?.toString() || "all")}
                className={`${
                  selectedCategory === category.id?.toString() || (category.slug === "all" && selectedCategory === "all")
                    ? "bg-brown-primary text-white" 
                    : "border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No products found</h3>
              <p className="text-gray-500 mb-8">
                {selectedCategory === "all" 
                  ? "We're currently updating our product catalog. Please check back soon!" 
                  : "No products found in this category. Try selecting a different category or browse all products."
                }
              </p>
              <Button
                onClick={() => setShowCustomModal(true)}
                className="bg-brown-primary hover:bg-brown-secondary"
              >
                Request Custom Furniture
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onCustomize={() => setShowCustomModal(true)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Furniture CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-3xl text-brown-primary mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We specialize in custom furniture design. Tell us your vision, and we'll bring it to life with our expert craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brown-primary hover:bg-brown-secondary"
              onClick={() => setShowCustomModal(true)}
            >
              Request Custom Furniture
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <CustomFurnitureModal 
        isOpen={showCustomModal} 
        onClose={() => setShowCustomModal(false)} 
      />
      
      <Footer />
    </div>
  );
}
