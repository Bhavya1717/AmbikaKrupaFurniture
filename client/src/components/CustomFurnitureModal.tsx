import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Send } from "lucide-react";
import type { InsertInquiry } from "@shared/schema";

interface CustomFurnitureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomFurnitureModal({ isOpen, onClose }: CustomFurnitureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budgetRange: "",
    dimensions: "",
    woodType: "",
    finish: "",
    specialRequirements: ""
  });

  const { toast } = useToast();

  const inquiryMutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      await apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Custom furniture request submitted!",
        description: "We'll contact you within 24 hours with a personalized quote.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budgetRange: "",
        dimensions: "",
        woodType: "",
        finish: "",
        specialRequirements: ""
      });
      onClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error submitting request",
        description: "Please try again or contact us directly by phone.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inquiryMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budgetRange: "",
      dimensions: "",
      woodType: "",
      finish: "",
      specialRequirements: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-brown-primary text-2xl">Customize Your Furniture</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required 
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required 
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Project Type</Label>
              <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bed">Custom Bed</SelectItem>
                  <SelectItem value="chair">Chair/Seating</SelectItem>
                  <SelectItem value="tv-unit">TV Unit</SelectItem>
                  <SelectItem value="wardrobe">Wardrobe/Storage</SelectItem>
                  <SelectItem value="dining-set">Dining Set</SelectItem>
                  <SelectItem value="office-furniture">Office Furniture</SelectItem>
                  <SelectItem value="kitchen-cabinets">Kitchen Cabinets</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Budget Range</Label>
              <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange("budgetRange", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-25k">Under ₹25,000</SelectItem>
                  <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="100k-200k">₹1,00,000 - ₹2,00,000</SelectItem>
                  <SelectItem value="above-200k">Above ₹2,00,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
            <Input 
              id="dimensions"
              value={formData.dimensions}
              onChange={(e) => handleInputChange("dimensions", e.target.value)}
              placeholder="e.g., 6ft x 4ft x 3ft"
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Wood Type</Label>
              <Select value={formData.woodType} onValueChange={(value) => handleInputChange("woodType", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select wood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teak">Teak Wood</SelectItem>
                  <SelectItem value="oak">Oak Wood</SelectItem>
                  <SelectItem value="pine">Pine Wood</SelectItem>
                  <SelectItem value="mahogany">Mahogany</SelectItem>
                  <SelectItem value="sheesham">Sheesham</SelectItem>
                  <SelectItem value="mango">Mango Wood</SelectItem>
                  <SelectItem value="other">Other/Specify in details</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Finish Type</Label>
              <Select value={formData.finish} onValueChange={(value) => handleInputChange("finish", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select finish type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural Finish</SelectItem>
                  <SelectItem value="matte">Matte Finish</SelectItem>
                  <SelectItem value="glossy">Glossy Finish</SelectItem>
                  <SelectItem value="antique">Antique Finish</SelectItem>
                  <SelectItem value="painted">Painted Finish</SelectItem>
                  <SelectItem value="stained">Stained Finish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="specialRequirements">Special Requirements & Design Details</Label>
            <Textarea 
              id="specialRequirements"
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
              rows={4}
              className="mt-1"
              placeholder="Please describe your vision, style preferences, special features, color requirements, storage needs, or any other specific details..."
            />
          </div>
          
          <div className="bg-cream p-4 rounded-lg">
            <h4 className="font-semibold text-brown-primary mb-2">What happens next?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• We'll review your requirements within 24 hours</li>
              <li>• Our design team will create initial sketches</li>
              <li>• We'll contact you to discuss details and provide a quote</li>
              <li>• Once approved, we'll begin crafting your custom piece</li>
            </ul>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-brown-primary hover:bg-brown-secondary"
              disabled={inquiryMutation.isPending}
            >
              {inquiryMutation.isPending ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Get Custom Quote
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleClose}
              className="px-6 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
