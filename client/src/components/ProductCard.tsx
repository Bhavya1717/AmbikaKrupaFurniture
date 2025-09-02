import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onCustomize: () => void;
  viewMode?: "grid" | "list";
  onClick?: () => void;
}

export default function ProductCard({ product, onCustomize, viewMode = "grid", onClick }: ProductCardProps) {
  const formatPrice = (price: string) => {
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger onClick if a button was clicked
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onClick?.();
  };

  if (viewMode === "list") {
    return (
      <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden" onClick={handleCardClick}>
        <div className="flex">
          <div 
            className="w-48 h-32 bg-cover bg-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
            style={{
              backgroundImage: `url(${product.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'})`
            }}
          />
          <CardContent className="p-6 flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-xl text-brown-primary group-hover:text-brown-secondary transition-colors duration-300">{product.name}</h3>
              {product.featured && (
                <Badge className="bg-brown-primary group-hover:bg-brown-secondary transition-colors duration-300">Featured</Badge>
              )}
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-brown-primary group-hover:text-brown-secondary transition-colors duration-300">
                  {formatPrice(product.price)}
                </span>
                {product.dimensions && (
                  <span className="text-sm text-gray-500">{product.dimensions}</span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm"
                  className="bg-brown-primary text-white hover:bg-brown-secondary transition-all duration-300"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 overflow-hidden" onClick={handleCardClick}>
      <div 
        className="h-64 bg-cover bg-center group-hover:scale-110 transition-transform duration-300 relative"
        style={{
          backgroundImage: `url(${product.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'})`
        }}
      >
        {product.featured && (
          <Badge className="absolute top-4 left-4 bg-brown-primary group-hover:bg-brown-secondary transition-colors duration-300">Featured</Badge>
        )}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="icon"
            variant="secondary"
            className="bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-xl text-brown-primary group-hover:text-brown-secondary transition-colors duration-300">{product.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-brown-primary group-hover:text-brown-secondary transition-colors duration-300">
            {formatPrice(product.price)}
          </span>
          {product.dimensions && (
            <span className="text-sm text-gray-500">{product.dimensions}</span>
          )}
        </div>

        {(product.material || product.finish) && (
          <div className="mb-4 space-y-1">
            {product.material && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Material:</span> {product.material}
              </p>
            )}
            {product.finish && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Finish:</span> {product.finish}
              </p>
            )}
          </div>
        )}
        
        <div className="flex gap-2 mb-4">
          <Button 
            className="flex-1 bg-brown-primary text-white hover:bg-brown-secondary transition-all duration-300 hover:scale-105"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="border-gray-300 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full text-brown-primary border-brown-primary hover:bg-brown-primary hover:text-white transition-all duration-300 hover:scale-105"
          onClick={(e) => {
            e.stopPropagation();
            onCustomize();
          }}
        >
          Customize This Design
        </Button>
      </CardContent>
    </Card>
  );
}
