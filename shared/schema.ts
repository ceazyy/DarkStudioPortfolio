import { pgTable, text, serial, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  genre: text("genre").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  year: text("year").notNull(),
  coverImage: text("cover_image").notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  albumId: serial("album_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  city: text("city").notNull(),
  zipCode: text("zip_code").notNull(),
  cardNumber: text("card_number").notNull(),
  expiryDate: text("expiry_date").notNull(),
  cvv: text("cvv").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAlbumSchema = createInsertSchema(albums);
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });

export type Album = typeof albums.$inferSelect;
export type InsertAlbum = z.infer<typeof insertAlbumSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
