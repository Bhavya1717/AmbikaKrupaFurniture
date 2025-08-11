import { useState, useEffect } from "react";
import { fetchPageContent, updatePageContent } from "@/lib/firebaseDb";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function AdminHomeEditor() {
  const { user, isLoading } = useAuth();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPageContent("home").then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setContent({ ...content, [field]: e.target.value });
  };

  const handleSectionChange = (idx: number, field: string, value: string) => {
    const updatedSections = [...(content.sections || [])];
    updatedSections[idx][field] = value;
    setContent({ ...content, sections: updatedSections });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await updatePageContent("home", content);
    } catch (err) {
      setError("Failed to save. Try again.");
    }
    setSaving(false);
  };

  if (isLoading || loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in as admin.</div>;
  if (!content) return <div className="text-center py-12">No content found.</div>;

  return (
    <div className="min-h-screen bg-antique">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12 nav-space">
        <h1 className="text-3xl font-bold mb-6 text-brown-primary">Edit Home Page Content</h1>
        <label className="block mb-2 font-semibold">Hero Title</label>
        <input className="w-full mb-4 p-2 border rounded" value={content.heroTitle || ""} onChange={e => handleChange(e, "heroTitle")}/>
        <label className="block mb-2 font-semibold">Hero Paragraph</label>
        <textarea className="w-full mb-4 p-2 border rounded" value={content.heroParagraph || ""} onChange={e => handleChange(e, "heroParagraph")}/>
        <label className="block mb-2 font-semibold">Hero Image URL</label>
        <input className="w-full mb-4 p-2 border rounded" value={content.heroImage || ""} onChange={e => handleChange(e, "heroImage")}/>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-brown-primary">Sections</h2>
        {(content.sections || []).map((section: any, idx: number) => (
          <div key={idx} className="mb-6 p-4 border rounded bg-white">
            <label className="block mb-1 font-semibold">Section Title</label>
            <input className="w-full mb-2 p-2 border rounded" value={section.title || ""} onChange={e => handleSectionChange(idx, "title", e.target.value)}/>
            <label className="block mb-1 font-semibold">Section Content</label>
            <textarea className="w-full mb-2 p-2 border rounded" value={section.content || ""} onChange={e => handleSectionChange(idx, "content", e.target.value)}/>
            <label className="block mb-1 font-semibold">Section Image URL</label>
            <input className="w-full mb-2 p-2 border rounded" value={section.image || ""} onChange={e => handleSectionChange(idx, "image", e.target.value)}/>
          </div>
        ))}
        <Button onClick={handleSave} disabled={saving} className="mt-4 bg-brown-primary text-white">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      <Footer />
    </div>
  );
}
