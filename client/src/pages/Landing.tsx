import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Hammer,
  Phone,
  MessageCircle,
  Star,
  Users,
  Clock,
  Award,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Product, Project } from "@shared/schema";

export default function Landing() {
  const { data: featuredProducts } = useQuery<Product[]>({
    queryKey: ["/api/products?featured=true"],
  });

  const { data: featuredProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects?featured=true"],
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".fade-in-up, .fade-in-left, .fade-in-right, .scale-in",
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-antique">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-bold text-5xl md:text-7xl mb-6">
            Crafting Dreams
            <br />
            Into Reality
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Premium custom furniture and carpentry services with 15+ years of
            expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-brown-primary hover:bg-brown-secondary text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() =>
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Our Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-black hover:bg-white hover:text-black px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-bold text-4xl text-brown-primary mb-4">
              Our Signature Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From elegant beds to custom TV units, we create furniture that
              transforms your space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 scale-in">
              <div
                className="h-64 bg-cover bg-center rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')",
                }}
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl text-brown-primary mb-2 group-hover:text-brown-secondary transition-colors duration-300">
                  Custom Beds
                </h3>
                <p className="text-gray-600 mb-2 font-bold text-lg">
                  Starting from ₹25,000
                </p>
                <p className="text-sm text-gray-500">
                  King, Queen, Single sizes available
                </p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 scale-in">
              <div
                className="h-64 bg-cover bg-center rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')",
                }}
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl text-brown-primary mb-2 group-hover:text-brown-secondary transition-colors duration-300">
                  Designer Chairs
                </h3>
                <p className="text-gray-600 mb-2 font-bold text-lg">
                  Starting from ₹8,000
                </p>
                <p className="text-sm text-gray-500">
                  Dining, Office, Accent chairs
                </p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 scale-in">
              <div
                className="h-64 bg-cover bg-center rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')",
                }}
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl text-brown-primary mb-2 group-hover:text-brown-secondary transition-colors duration-300">
                  TV Units
                </h3>
                <p className="text-gray-600 mb-2 font-bold text-lg">
                  Starting from ₹15,000
                </p>
                <p className="text-sm text-gray-500">
                  Wall-mounted, Floor standing
                </p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 scale-in">
              <div
                className="h-64 bg-cover bg-center rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')",
                }}
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl text-brown-primary mb-2 group-hover:text-brown-secondary transition-colors duration-300">
                  Custom Pieces
                </h3>
                <p className="text-gray-600 mb-2 font-bold text-lg">
                  Price on request
                </p>
                <p className="text-sm text-gray-500">Tailored to your vision</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-bold text-4xl text-brown-primary mb-4">
              Our Masterpieces
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our gallery of completed projects and custom creations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects?.slice(0, 6).map((project, index) => (
              <Card
                key={project.id}
                className={`group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                  index % 3 === 0
                    ? "fade-in-left"
                    : index % 3 === 1
                      ? "fade-in-up"
                      : "fade-in-right"
                }`}
              >
                <div
                  className="h-80 bg-cover bg-center rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${project.imageUrl || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"})`,
                  }}
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-brown-primary group-hover:text-brown-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600">{project.description}</p>
                  {project.category && (
                    <Badge
                      variant="secondary"
                      className="mt-2 group-hover:bg-brown-primary group-hover:text-white transition-colors duration-300"
                    >
                      {project.category}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <h2 className="font-bold text-4xl text-brown-primary mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                With over 15 years of experience in fine carpentry and furniture
                making, CraftWood has been transforming homes across the region.
                We specialize in creating bespoke furniture pieces that combine
                traditional craftsmanship with modern design sensibilities.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our team of skilled artisans takes pride in every piece we
                create, ensuring that each item is not just functional but also
                a work of art that reflects your personal style and enhances
                your living space.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brown-primary mb-2 flex items-center justify-center">
                    <Users className="h-8 w-8 mr-2" />
                    500+
                  </div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brown-primary mb-2 flex items-center justify-center">
                    <Clock className="h-8 w-8 mr-2" />
                    15+
                  </div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brown-primary mb-2 flex items-center justify-center">
                    <Star className="h-8 w-8 mr-2" />
                    100%
                  </div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brown-primary mb-2 flex items-center justify-center">
                    <Award className="h-8 w-8 mr-2" />
                    24/7
                  </div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 fade-in-right">
              <div
                className="h-48 bg-cover bg-center rounded-xl"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')",
                }}
              />
              <div
                className="h-48 bg-cover bg-center rounded-xl mt-8"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')",
                }}
              />
              <div
                className="h-48 bg-cover bg-center rounded-xl -mt-8"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')",
                }}
              />
              <div
                className="h-48 bg-cover bg-center rounded-xl"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-bold text-4xl text-brown-primary mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to bring your furniture vision to life? Contact us today for
              a free consultation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 fade-in-left hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Phone className="h-12 w-12 text-brown-primary mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="font-semibold text-xl mb-2">Call Us</h3>
              <a
                href="tel:+919876543210"
                className="text-brown-primary hover:text-brown-secondary text-lg font-medium transition-colors duration-300"
              >
                +91 98765 43210
              </a>
            </Card>

            <Card className="text-center p-8 fade-in-up hover:shadow-xl transition-all duration-300 hover:scale-105">
              <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="font-semibold text-xl mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/919876543210?text=Hi%20CraftWood,%20I'm%20interested%20in%20your%20furniture%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 text-lg font-medium transition-colors duration-300"
              >
                Chat with us
              </a>
            </Card>

            <Card className="text-center p-8 fade-in-right hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Hammer className="h-12 w-12 text-brown-primary mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="font-semibold text-xl mb-2">Visit Showroom</h3>
              <p className="text-gray-600">123 Craftsman Lane</p>
              <p className="text-gray-600">Furniture District, City 560001</p>
            </Card>
          </div>

          <div className="mt-12 text-center space-y-4 scale-in">
            <Button
              asChild
              size="lg"
              className="bg-brown-primary hover:bg-brown-secondary transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a href="tel:+919876543210">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
            <div className="mx-4">
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
