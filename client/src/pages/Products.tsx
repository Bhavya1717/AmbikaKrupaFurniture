import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CustomFurnitureModal from "@/components/CustomFurnitureModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Grid, List, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

export default function Products() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  useEffect(() => {
    // Small delay to ensure DOM is ready after products load
    const timeoutId = setTimeout(() => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
              entry.target.classList.add('animate');
              // Once animated, no need to observe anymore
              observer.unobserve(entry.target);
            });
          }
        });
      }, observerOptions);

      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
      animatedElements.forEach((el) => {
        // Check if element is already in viewport
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
          // Use requestAnimationFrame for immediate but smooth animation
          requestAnimationFrame(() => {
            el.classList.add('animate');
          });
        } else {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [products]);

  // Filter and sort products
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
    const matchesPrice = parseFloat(product.price) >= priceRange[0] && parseFloat(product.price) <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Pagination
  const totalProducts = filteredProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, endIndex);

  const formatPrice = (price: string) => {
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  const loadMoreProducts = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-brown-light to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brown-primary mb-4 fade-in-up">Our Products</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto fade-in-up delay-200">
            Discover our complete collection of handcrafted furniture pieces, each one meticulously crafted with premium materials
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between fade-in-up">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-brown-primary/20 focus:border-brown-primary"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-brown-primary/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="featured">Featured First</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-brown-primary/20 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-r-none ${viewMode === "grid" ? "bg-brown-primary hover:bg-brown-secondary" : "hover:bg-brown-primary/10"}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-l-none ${viewMode === "list" ? "bg-brown-primary hover:bg-brown-secondary" : "hover:bg-brown-primary/10"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'} fade-in-left`}>
              <Card className="sticky top-24 shadow-lg border-brown-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-brown-primary">Filters</h3>
                    <SlidersHorizontal className="h-5 w-5 text-brown-primary" />
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3 text-brown-primary">Category</h4>
                    <div className="space-y-2">
                      <label className="flex items-center cursor-pointer hover:bg-brown-light/30 p-2 rounded">
                        <input
                          type="radio"
                          name="category"
                          value="all"
                          checked={selectedCategory === "all"}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-3 text-brown-primary focus:ring-brown-primary"
                        />
                        <span className="text-gray-700">All Categories</span>
                      </label>
                      {categories?.map(category => (
                        <label key={category.id} className="flex items-center cursor-pointer hover:bg-brown-light/30 p-2 rounded">
                          <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="mr-3 text-brown-primary focus:ring-brown-primary"
                          />
                          <span className="text-gray-700">{category.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3 text-brown-primary">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100000}
                        min={0}
                        step={1000}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{formatPrice(priceRange[0].toString())}</span>
                        <span>{formatPrice(priceRange[1].toString())}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3 text-brown-primary">Quick Filters</h4>
                    <div className="space-y-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-brown-primary hover:text-white border-brown-primary text-brown-primary transition-colors duration-300">
                        Featured
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-brown-primary hover:text-white border-brown-primary text-brown-primary transition-colors duration-300">
                        In Stock
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-brown-primary hover:text-white border-brown-primary text-brown-primary transition-colors duration-300">
                        New Arrivals
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white transition-colors duration-300"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setPriceRange([0, 100000]);
                      setSortBy("name");
                      setCurrentPage(1);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid/List */}
            <div className="flex-1 fade-in-right">
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Showing {Math.min(endIndex, totalProducts)} of {totalProducts} products
                    {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
                  </p>
                  {totalProducts > productsPerPage && (
                    <p className="text-sm text-brown-primary">
                      {currentPage < totalPages ? `${totalPages - currentPage} more pages available` : "All products loaded"}
                    </p>
                  )}
                </div>

                {currentProducts && currentProducts.length > 0 ? (
                  <>
                    <div className={viewMode === "grid" 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                      : "space-y-6"
                    }>
                      {currentProducts.map((product, index) => (
                        <div key={product.id} className={index % 3 === 0 ? 'scale-in' : index % 3 === 1 ? 'fade-in-up' : 'fade-in-right'}>
                          <ProductCard 
                            product={product} 
                            onCustomize={() => setShowCustomModal(true)}
                            viewMode={viewMode}
                            onClick={() => handleProductClick(product.id)}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Load More / Pagination */}
                    {currentPage < totalPages && (
                      <div className="text-center mt-12">
                        <Button 
                          onClick={loadMoreProducts}
                          className="bg-brown-primary hover:bg-brown-secondary text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          Load More Products
                          <ChevronDown className="ml-2 h-5 w-5" />
                        </Button>
                        <p className="text-sm text-gray-600 mt-3">
                          {totalProducts - endIndex} more products available
                        </p>
                      </div>
                    )}

                    {/* Pagination Info */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-4 mt-8 pt-8 border-t border-gray-200">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white disabled:opacity-50"
                        >
                          Previous
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = Math.max(1, Math.min(totalPages - 4, Math.max(1, currentPage - 2))) + i;
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className={currentPage === pageNum 
                                  ? "bg-brown-primary hover:bg-brown-secondary" 
                                  : "border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
                                }
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white disabled:opacity-50"
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-600 mb-6">
                        We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
                      </p>
                      <Button 
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                          setPriceRange([0, 100000]);
                          setCurrentPage(1);
                        }}
                        className="bg-brown-primary hover:bg-brown-secondary mr-4"
                      >
                        Clear All Filters
                      </Button>
                      <Button 
                        onClick={() => setShowCustomModal(true)}
                        variant="outline"
                        className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
                      >
                        Request Custom Furniture
                      </Button>
                    </div>
                  </div>
                )}
              </>
            </div>
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
