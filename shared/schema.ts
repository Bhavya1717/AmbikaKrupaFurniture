// Database schema definitions for CraftsmanCove
import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (used for authentication/session management)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (stores user info, including Google/Firebase users)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Product categories table
export const categories = pgTable("categories", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Products table
export const products = pgTable("products", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  categoryId: varchar("category_id", { length: 64 }),
  imageUrl: text("image_url"),
  dimensions: text("dimensions"),
  material: varchar("material", { length: 100 }),
  finish: varchar("finish", { length: 100 }),
  inStock: boolean("in_stock").default(true),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Gallery projects table
export const projects = pgTable("projects", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 100 }),
  completedAt: timestamp("completed_at"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Custom furniture inquiries table
export const inquiries = pgTable("inquiries", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("user_id", { length: 64 }),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  projectType: varchar("project_type", { length: 100 }),
  budgetRange: varchar("budget_range", { length: 50 }),
  dimensions: text("dimensions"),
  woodType: varchar("wood_type", { length: 100 }),
  finish: varchar("finish", { length: 100 }),
  specialRequirements: text("special_requirements"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact form submissions table
export const contacts = pgTable("contacts", {
  id: varchar("id", { length: 64 }).primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  projectType: varchar("project_type", { length: 100 }),
  budgetRange: varchar("budget_range", { length: 50 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// About sections table (for About page content)
export const aboutSections = pgTable("about_sections", {
  id: integer("id").primaryKey(),
  title: text("title"),
  paragraph1: text("paragraph1"),
  paragraph2: text("paragraph2"),
  paragraph3: text("paragraph3"),
  projects_completed: integer("projects_completed"),
  years_experience: integer("years_experience"),
  satisfaction_rate: integer("satisfaction_rate"),
  support: text("support"),
  image_urls: text("image_urls"), // or use array if needed
});

// Table relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  user: one(users, {
    fields: [inquiries.userId],
    references: [users.id],
  }),
}));

// Zod insert schemas for validation
export const insertCategorySchema = createInsertSchema(categories);
export const insertProductSchema = createInsertSchema(products);
export const insertProjectSchema = createInsertSchema(projects);
export const insertInquirySchema = createInsertSchema(inquiries);
export const insertContactSchema = createInsertSchema(contacts);

// TypeScript types for table rows and inserts
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
