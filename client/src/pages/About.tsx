import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Star, Award, Hammer, Heart, Lightbulb, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-antique">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-bold text-4xl text-brown-primary mb-4">Our Story</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Crafting dreams into reality with over 15 years of expertise in fine carpentry and custom furniture making
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bold text-3xl text-brown-primary mb-6">Craftsmanship Meets Innovation</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2009, CraftWood began as a small family workshop with a simple mission: to create beautiful, 
                functional furniture that stands the test of time. What started as a passion for woodworking has grown 
                into a trusted name in custom furniture design and carpentry services.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our journey has been shaped by our commitment to excellence, attention to detail, and the belief that 
                every piece of furniture should tell a story. We combine traditional techniques passed down through 
                generations with modern tools and design principles to create pieces that are both timeless and contemporary.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Today, CraftWood is proud to have completed over 500 projects, from intimate bedroom suites to complete 
                home furnishing solutions. Each project is a collaboration between our skilled craftsmen and our clients, 
                resulting in furniture that perfectly reflects personal style and functional needs.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
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
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="h-48 bg-cover bg-center rounded-xl shadow-lg"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')"
                }}
              />
              <div 
                className="h-48 bg-cover bg-center rounded-xl mt-8 shadow-lg"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')"
                }}
              />
              <div 
                className="h-48 bg-cover bg-center rounded-xl -mt-8 shadow-lg"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')"
                }}
              />
              <div 
                className="h-48 bg-cover bg-center rounded-xl shadow-lg"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl text-brown-primary mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at CraftWood
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Hammer className="h-12 w-12 text-brown-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Quality Craftsmanship</h3>
                <p className="text-gray-600">
                  We use only the finest materials and time-tested techniques to ensure every piece meets our high standards.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-brown-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Customer First</h3>
                <p className="text-gray-600">
                  Your vision is our priority. We work closely with you to bring your furniture dreams to life.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Lightbulb className="h-12 w-12 text-brown-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We blend traditional craftsmanship with modern design and technology for exceptional results.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-brown-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Reliability</h3>
                <p className="text-gray-600">
                  We deliver on our promises with transparent communication and timely project completion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl text-brown-primary mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The skilled artisans and designers who bring your furniture visions to life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center overflow-hidden">
              <div 
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')"
                }}
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl text-brown-primary mb-2">Master Craftsman</h3>
                <p className="text-gray-600 mb-3">Lead Carpenter & Founder</p>
                <p className="text-sm text-gray-500">
                  With over 15 years of experience, our master craftsman oversees every project 
                  to ensure the highest quality standards.
                </p>
                <Badge className="mt-3 bg-brown-primary">15+ Years Experience</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center overflow-hidden">
              <div 
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')"
                }}
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl text-brown-primary mb-2">Design Specialist</h3>
                <p className="text-gray-600 mb-3">Interior Design Consultant</p>
                <p className="text-sm text-gray-500">
                  Our design specialist helps clients visualize their dream furniture and ensures 
                  perfect integration with existing spaces.
                </p>
                <Badge className="mt-3 bg-brown-primary">Design Expert</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center overflow-hidden">
              <div 
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300')"
                }}
              />
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl text-brown-primary mb-2">Workshop Manager</h3>
                <p className="text-gray-600 mb-3">Production & Quality Control</p>
                <p className="text-sm text-gray-500">
                  Our workshop manager coordinates production timelines and maintains our 
                  rigorous quality control standards.
                </p>
                <Badge className="mt-3 bg-brown-primary">Quality Assurance</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl text-brown-primary mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From initial consultation to final delivery, here's how we bring your furniture dreams to life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brown-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-xl mb-3">Consultation</h3>
              <p className="text-gray-600">
                We discuss your vision, requirements, and budget to understand exactly what you need.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brown-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-xl mb-3">Design</h3>
              <p className="text-gray-600">
                Our designers create detailed plans and 3D renderings for your approval.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brown-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-xl mb-3">Crafting</h3>
              <p className="text-gray-600">
                Our skilled craftsmen bring the design to life using premium materials and techniques.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-brown-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-xl mb-3">Delivery</h3>
              <p className="text-gray-600">
                We carefully deliver and install your furniture, ensuring everything is perfect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-3xl text-brown-primary mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's work together to create beautiful, functional furniture that perfectly fits your space and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brown-primary hover:bg-brown-secondary"
              onClick={() => window.location.href = '/contact'}
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
              onClick={() => window.location.href = '/gallery'}
            >
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
