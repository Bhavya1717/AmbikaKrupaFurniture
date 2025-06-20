import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X, Hammer } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => location === href;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 shadow-xl backdrop-blur-sm bg-white/95' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Hammer className="h-8 w-8 text-brown-primary mr-3 transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-bold text-xl text-brown-primary transition-colors duration-300 group-hover:text-brown-secondary">CraftWood</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-all duration-300 relative group ${
                  isActive(item.href)
                    ? "text-brown-primary font-medium"
                    : "text-gray-700 hover:text-brown-primary hover:scale-105"
                } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brown-primary after:transition-all after:duration-300 hover:after:w-full ${
                  isActive(item.href) ? "after:w-full" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Auth Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <Button 
                    asChild 
                    variant="outline"
                    className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    <a href="/api/logout">Logout</a>
                  </Button>
                ) : (
                  <Button 
                    asChild
                    className="bg-brown-primary hover:bg-brown-secondary text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <a href="/api/login">Login</a>
                  </Button>
                )}
              </>
            )}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-brown-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 transition-colors ${
                    isActive(item.href)
                      ? "text-brown-primary font-medium"
                      : "text-gray-700 hover:text-brown-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
