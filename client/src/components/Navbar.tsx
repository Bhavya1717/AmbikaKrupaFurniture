// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Hammer } from "lucide-react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "@/firebase";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsub();
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav
  className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
    isScrolled ? "py-2 shadow-xl backdrop-blur-sm bg-white/85" : "py-4"
  }`}
>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Hammer className="h-8 w-8 text-brown-primary mr-3" />
          <span className="font-bold text-xl text-brown-primary">CraftWood</span>
        </Link>

        {/* Nav Items */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-all duration-300 ${
                isActive(item.href) ? "text-brown-primary font-semibold" : "text-gray-700 hover:text-brown-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="flex items-center space-x-4">
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <Button
                  onClick={async () => {
                    await signOut(auth);
                    window.location.href = "/";
                  }}
                  variant="outline"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    await signInWithPopup(auth, provider);
                    window.location.href = "/";
                  }}
                  className="bg-brown-primary text-white"
                >
                  Login with Google
                </Button>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 ${
                    isActive(item.href)
                      ? "text-brown-primary font-semibold"
                      : "text-gray-700 hover:text-brown-primary"
                  }`}
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
