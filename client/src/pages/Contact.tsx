import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react";
import type { InsertContact } from "@shared/schema";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    budgetRange: "",
    message: ""
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      await apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "",
        budgetRange: "",
        message: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly by phone.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-antique">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-bold text-4xl text-brown-primary mb-4">Get In Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to bring your furniture vision to life? Contact us today for a free consultation and personalized quote.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div>
              <h2 className="font-bold text-2xl text-brown-primary mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="bg-brown-primary text-white p-3 rounded-lg mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <a 
                      href="tel:+919876543210" 
                      className="text-brown-primary hover:text-brown-secondary transition-colors text-lg"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <a 
                      href="https://wa.me/919876543210?text=Hi%20CraftWood,%20I'm%20interested%20in%20your%20furniture%20services" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-600 transition-colors"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-brown-primary text-white p-3 rounded-lg mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a 
                      href="mailto:info@craftwood.com" 
                      className="text-brown-primary hover:text-brown-secondary transition-colors"
                    >
                      info@craftwood.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-brown-primary text-white p-3 rounded-lg mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">123 Craftsman Lane<br />Furniture District, City 560001</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-brown-primary text-white p-3 rounded-lg mr-4">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Working Hours</h3>
                    <p className="text-gray-600">
                      Mon - Sat: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="space-y-4">
                <Button asChild className="w-full bg-brown-primary hover:bg-brown-secondary">
                  <a href="tel:+919876543210">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                </Button>
                <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                  <a 
                    href="https://wa.me/919876543210?text=Hi%20CraftWood,%20I'd%20like%20to%20discuss%20a%20custom%20furniture%20project" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-brown-primary">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required 
                        className="mt-1"
                      />
                    </div>
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
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Project Type</Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom-furniture">Custom Furniture</SelectItem>
                        <SelectItem value="kitchen-renovation">Kitchen Renovation</SelectItem>
                        <SelectItem value="bedroom-suite">Bedroom Suite</SelectItem>
                        <SelectItem value="office-furniture">Office Furniture</SelectItem>
                        <SelectItem value="complete-home">Complete Home Furnishing</SelectItem>
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
                        <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                        <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="100k-200k">₹1,00,000 - ₹2,00,000</SelectItem>
                        <SelectItem value="200k-500k">₹2,00,000 - ₹5,00,000</SelectItem>
                        <SelectItem value="above-500k">Above ₹5,00,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Project Details *</Label>
                    <Textarea 
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={4}
                      required 
                      className="mt-1"
                      placeholder="Tell us about your furniture requirements, style preferences, dimensions, and any specific features you'd like..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brown-primary hover:bg-brown-secondary"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map/Location Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl text-brown-primary mb-4">Visit Our Showroom</h2>
            <p className="text-lg text-gray-600">
              Come see our craftsmanship up close and discuss your project in person
            </p>
          </div>
          
          <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-brown-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-brown-primary mb-2">CraftWood Showroom</h3>
              <p className="text-gray-600 mb-2">123 Craftsman Lane</p>
              <p className="text-gray-600 mb-4">Furniture District, City 560001</p>
              <Button className="bg-brown-primary hover:bg-brown-secondary">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
