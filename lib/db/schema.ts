import {
  pgTable,
  serial,
  text,
  integer,
  real,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

// Catalogue. `category` / `status` are stored as text; the allowed values
// (the Category / Status unions, CATEGORY_ORDER, STATUS_LABEL) remain the
// single source of truth in lib/data.ts.
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  no: text("no").notNull().unique(), // catalogue number, e.g. "DR-014"
  name: text("name").notNull(),
  formula: text("formula"), // short descriptor, never dosing
  category: text("category").notNull(),
  format: text("format").notNull(), // e.g. "10 mg · lyophilised"
  purity: real("purity").notNull(), // most recent assay, %
  price: integer("price").notNull(), // AUD, whole dollars
  status: text("status").notNull().default("in-stock"),
  batch: text("batch").notNull().default("—"),
  featured: boolean("featured").notNull().default(false),
  blurb: text("blurb"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Admin accounts. Stateless sessions live in a signed cookie, so there is no
// sessions table.
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ProductRow = typeof products.$inferSelect;
export type NewProductRow = typeof products.$inferInsert;
export type UserRow = typeof users.$inferSelect;
