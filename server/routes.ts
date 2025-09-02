import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// import { setupAuth, allowAll } from "./replitAuth";
import { insertProductSchema, insertProjectSchema, insertInquirySchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { getAboutSection } from "./aboutService"; // <-- Added import

const allowAll = (_req: any, _res: any, next: any) => next();

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  // await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', allowAll, async (req: any, res) => {
    try {
      // You don't have Replit's `req.user` anymore, so just return dummy for now
      res.json({ message: "No auth. Firebase auth will be added soon." });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // ✅ About section route
  app.get("/api/about", async (req, res) => {
    console.log("📥 GET /api/about called"); // Debug
    try {
      const about = await getAboutSection();
      // console.log("DB result:", about); // Debug

      if (!about) {
        return res.status(404).json({ message: "About section not found" });
      }

      res.json(about);
    } catch (error) {
      console.error("Error fetching about section:", error);
      res.status(500).json({ message: "Failed to fetch about section" });
    }
  });

  // Category routes
  app.get("/api/user/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Product routes
  app.get("/api/user/products", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? String(req.query.categoryId) : null;
      const featured = req.query.featured === 'true';

      let products;
      if (featured) {
        products = await storage.getFeaturedProducts();
      } else if (categoryId) {
        products = await storage.getProductsByCategory(categoryId);
      } else {
        products = await storage.getProducts();
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/user/products/:id", async (req, res) => {
    try {
      const id = String(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });


  // Project/Gallery routes
  app.get("/api/user/projects", async (req, res) => {
    try {
      const featured = req.query.featured === 'true';
      const projects = featured ? await storage.getFeaturedProjects() : await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Inquiry routes
  app.post("/api/user/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  app.get("/api/user/inquiries", allowAll, async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // Contact routes
  app.post("/api/user/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "Failed to create contact" });
    }
  });

  app.get("/api/user/contacts", allowAll, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
