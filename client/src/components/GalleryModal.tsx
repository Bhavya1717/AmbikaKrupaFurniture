import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import type { Project } from "@shared/schema";

interface GalleryModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function GalleryModal({ project, onClose }: GalleryModalProps) {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-brown-primary text-2xl">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div 
            className="w-full h-96 bg-cover bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${project.imageUrl || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'})`
            }}
          />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {project.category && (
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-brown-primary" />
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                )}
                {project.featured && (
                  <Badge className="bg-brown-primary">Featured Project</Badge>
                )}
              </div>
              
              {project.completedAt && (
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    Completed: {new Date(project.completedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
            
            {project.description && (
              <div>
                <h3 className="font-semibold text-lg text-brown-primary mb-2">Project Details</h3>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>
            )}
            
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-semibold text-lg text-brown-primary mb-3">Interested in a Similar Project?</h3>
              <p className="text-gray-600 mb-4">
                We can create a custom version of this design tailored to your specific needs, space, and style preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-brown-primary text-white rounded-lg hover:bg-brown-secondary transition-colors font-medium"
                >
                  Get a Quote
                </a>
                <a 
                  href={`https://wa.me/919876543210?text=Hi%20CraftWood,%20I'm%20interested%20in%20a%20project%20similar%20to%20your%20work%20on%20'${encodeURIComponent(project.title)}'`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
