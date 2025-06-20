import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryModal from "@/components/GalleryModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

export default function Gallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const categories = ["all", "bedroom", "kitchen", "living room", "office", "dining", "custom"];

  const filteredProjects = projects?.filter(project => 
    filter === "all" || project.category?.toLowerCase() === filter
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-antique">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brown-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-antique">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-bold text-4xl text-brown-primary mb-4">Our Masterpieces</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our gallery of completed projects and custom creations that showcase our craftsmanship and attention to detail
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={`${
                  filter === category 
                    ? "bg-brown-primary text-white" 
                    : "border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No projects found</h3>
              <p className="text-gray-500">
                {filter === "all" 
                  ? "We haven't added any projects to our gallery yet." 
                  : `No projects found in the "${filter}" category.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="group cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  <div 
                    className="h-80 bg-cover bg-center rounded-t-lg"
                    style={{
                      backgroundImage: `url(${project.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'})`
                    }}
                  />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-brown-primary">{project.title}</h3>
                      {project.featured && (
                        <Badge className="bg-brown-primary">Featured</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex justify-between items-center">
                      {project.category && (
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      )}
                      {project.completedAt && (
                        <span className="text-xs text-gray-500">
                          {new Date(project.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-3xl text-brown-primary mb-4">
            Ready to Create Your Masterpiece?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's bring your vision to life with our expert craftsmanship and attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brown-primary hover:bg-brown-secondary"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
              onClick={() => window.location.href = '/products'}
            >
              Browse Products
            </Button>
          </div>
        </div>
      </section>

      <GalleryModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
      
      <Footer />
    </div>
  );
}
