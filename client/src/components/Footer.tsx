import { Hammer, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brown-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Hammer className="h-6 w-6 mr-3" />
              <span className="font-bold text-xl">CraftWood</span>
            </div>
            <p className="text-gray-300 mb-4">
              Creating beautiful, functional furniture for over 15 years. Your vision, our craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Custom Furniture</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kitchen Renovation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Office Furniture</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Interior Design</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Repair Services</a></li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Beds & Mattresses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Chairs & Seating</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tables & Desks</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Storage Solutions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">TV Units</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@craftwood.com" className="text-gray-300 hover:text-white transition-colors">
                  info@craftwood.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span className="text-gray-300">123 Craftsman Lane<br />Furniture District, City 560001</span>
              </div>
              <a 
                href="https://wa.me/919876543210" 
                className="inline-block mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 CraftWood. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
