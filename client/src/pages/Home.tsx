import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { LogOut, User, Package, MessageSquare, Calendar } from "lucide-react";
import type { Inquiry, Contact } from "@shared/schema";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

export default function Home() {
  const { user, isLoading } = useAuth();

  const { data: inquiries } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });

  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  const recentInquiries = inquiries?.slice(0, 5) || [];
  const recentContacts = contacts?.slice(0, 5) || [];

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-antique">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 nav-space">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-brown-primary mb-2">
                Welcome back, {user?.displayName || 'Admin'}!
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Manage your CraftWood business dashboard
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center space-x-3">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">
                    {user?.displayName}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Button 
                onClick={async () => {
                  await signOut(auth);
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.href = "/";
                }}
                variant="outline" 
                className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Inquiries" count={inquiries?.length || 0} icon={<MessageSquare />} />
          <StatCard title="Contact Messages" count={contacts?.length || 0} icon={<MessageSquare />} />
          <StatCard title="Pending Quotes" count={inquiries?.filter(i => i.status === 'pending').length || 0} icon={<Calendar />} />
          <StatCard 
            title="This Month" 
            count={inquiries?.filter(i => {
              const inquiryDate = new Date(i.createdAt!);
              const thisMonth = new Date();
              return inquiryDate.getMonth() === thisMonth.getMonth() && 
                     inquiryDate.getFullYear() === thisMonth.getFullYear();
            }).length || 0} 
            icon={<Package />} 
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentItemsCard title="Recent Custom Furniture Inquiries" items={recentInquiries} type="inquiry" />
          <RecentItemsCard title="Recent Contact Messages" items={recentContacts} type="contact" />
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-brown-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickAction label="Manage Gallery" icon={<Package />} href="/gallery" />
              <QuickAction label="View Products" icon={<MessageSquare />} href="/products" />
              <QuickAction label="Customer Support" icon={<User />} href="/contact" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}

function StatCard({ title, count, icon }: { title: string; count: number; icon: JSX.Element }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-brown-primary">{count}</div>
        <p className="text-xs text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  );
}

function RecentItemsCard({ title, items, type }: { title: string; items: any[]; type: 'inquiry' | 'contact' }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-brown-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No items yet</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{type === 'inquiry' ? item.name : `${item.firstName} ${item.lastName}`}</h4>
                    <p className="text-sm text-gray-600">{item.email}</p>
                  </div>
                  <Badge 
                    variant={item.status === 'pending' || item.status === 'new' ? 'secondary' : 'default'}
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  {item.projectType} - {item.budgetRange}
                </p>
                <p className="text-xs text-gray-500">
                  {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function QuickAction({ label, icon, href }: { label: string; icon: JSX.Element; href: string }) {
  return (
    <Button 
      variant="outline" 
      className="h-auto p-6 flex flex-col items-center space-y-2"
      onClick={() => window.location.href = href}
    >
      <div className="h-8 w-8 text-brown-primary">{icon}</div>
      <span>{label}</span>
    </Button>
  );
}
