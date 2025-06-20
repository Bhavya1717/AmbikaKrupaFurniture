import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { LogOut, User, Package, MessageSquare, Calendar } from "lucide-react";
import type { Inquiry, Contact } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  
  const { data: inquiries } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });

  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  const recentInquiries = inquiries?.slice(0, 5) || [];
  const recentContacts = contacts?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-antique">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-brown-primary mb-2">
                Welcome back, {user?.firstName || 'Admin'}!
              </h1>
              <p className="text-lg text-gray-600">
                Manage your CraftWood business dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {user?.profileImageUrl && (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                asChild
                className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
              >
                <a href="/api/logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brown-primary">
                {inquiries?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Custom furniture requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brown-primary">
                {contacts?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                General inquiries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brown-primary">
                {inquiries?.filter(i => i.status === 'pending').length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brown-primary">
                {inquiries?.filter(i => {
                  const inquiryDate = new Date(i.createdAt!);
                  const thisMonth = new Date();
                  return inquiryDate.getMonth() === thisMonth.getMonth() && 
                         inquiryDate.getFullYear() === thisMonth.getFullYear();
                }).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                New inquiries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-brown-primary">Recent Custom Furniture Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              {recentInquiries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No inquiries yet</p>
              ) : (
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{inquiry.name}</h4>
                          <p className="text-sm text-gray-600">{inquiry.email}</p>
                        </div>
                        <Badge 
                          variant={inquiry.status === 'pending' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {inquiry.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {inquiry.projectType} - {inquiry.budgetRange}
                      </p>
                      <p className="text-xs text-gray-500">
                        {inquiry.createdAt && new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-brown-primary">Recent Contact Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {recentContacts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No contacts yet</p>
              ) : (
                <div className="space-y-4">
                  {recentContacts.map((contact) => (
                    <div key={contact.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </h4>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                        </div>
                        <Badge 
                          variant={contact.status === 'new' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {contact.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {contact.projectType} - {contact.budgetRange}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {contact.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {contact.createdAt && new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-brown-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-6 flex flex-col items-center space-y-2"
                onClick={() => window.location.href = '/gallery'}
              >
                <Package className="h-8 w-8 text-brown-primary" />
                <span>Manage Gallery</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-6 flex flex-col items-center space-y-2"
                onClick={() => window.location.href = '/products'}
              >
                <MessageSquare className="h-8 w-8 text-brown-primary" />
                <span>View Products</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-6 flex flex-col items-center space-y-2"
                onClick={() => window.location.href = '/contact'}
              >
                <User className="h-8 w-8 text-brown-primary" />
                <span>Customer Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
