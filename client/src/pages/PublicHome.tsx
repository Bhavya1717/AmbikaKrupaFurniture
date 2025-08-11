import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchPageContent } from "@/lib/firebaseDb";

interface Section {
  title: string;
  content: string;
  image?: string;
}

interface HomeContent {
  heroTitle: string;
  heroParagraph: string;
  heroImage: string;
  sections: Section[];
}

export default function PublicHome() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageContent("home").then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!content) return <div className="text-center py-12">No content found.</div>;

  return (
    <div className="min-h-screen bg-antique">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12 nav-space">
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8">
          <img src={content.heroImage} alt="Hero" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div>
            <h1 className="text-4xl font-bold text-brown-primary mb-4">{content.heroTitle}</h1>
            <p className="text-lg text-gray-700">{content.heroParagraph}</p>
          </div>
        </div>
        {content.sections && content.sections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.sections.map((section, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                {section.image && <img src={section.image} alt={section.title} className="w-full h-48 object-cover rounded mb-4" />}
                <h2 className="text-2xl font-semibold text-brown-primary mb-2">{section.title}</h2>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
