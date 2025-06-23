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
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 shadow-sm ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 my-6 sm:px-6 flex justify-between items-center transition-all duration-300 nav-menu">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Hammer className="h-8 w-8 text-brown-primary mr-3" />
          <span className="font-bold text-xl text-brown-primary">
            CraftWood
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-brown-primary font-semibold active"
                  : "text-gray-700 hover:text-brown-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth & Menu Icon */}
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
                  Login
                </Button>
              )}
            </>
          )}

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden focus:outline-none pr-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-lg border-t transition-all duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? "opacity-100 max-h-[300px]" : "opacity-0 max-h-0 overflow-hidden"}`}
      >
        <div className="flex flex-col px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-brown-primary font-semibold active"
                  : "text-gray-700 hover:text-brown-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
