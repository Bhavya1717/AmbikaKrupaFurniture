import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onCustomize: () => void;
}

export default function ProductCard({ product, onCustomize }: ProductCardProps) {
  const formatPrice = (price: string) => {
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  return (
    <Card className="group cursor-pointer hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div 
        className="h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${product.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'})`
        }}
      />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-xl text-brown-primary">{product.name}</h3>
          {product.featured && (
            <Badge className="bg-brown-primary">Featured</Badge>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-brown-primary">
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
            className="flex-1 bg-brown-primary text-white hover:bg-brown-secondary"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="border-gray-300 hover:bg-gray-100"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full text-brown-primary border-brown-primary hover:bg-brown-primary hover:text-white"
          onClick={onCustomize}
        >
          Customize This Design
        </Button>
      </CardContent>
    </Card>
  );
}
