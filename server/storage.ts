import { albums, orders, type Album, type InsertAlbum, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  // Albums
  getAllAlbums(): Promise<Album[]>;
  getAlbum(id: number): Promise<Album | undefined>;
  createAlbum(album: InsertAlbum): Promise<Album>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private albums: Map<number, Album>;
  private orders: Map<number, Order>;
  private currentAlbumId: number;
  private currentOrderId: number;

  constructor() {
    this.albums = new Map();
    this.orders = new Map();
    this.currentAlbumId = 1;
    this.currentOrderId = 1;
    this.initializeAlbums();
  }

  private initializeAlbums() {
    const defaultAlbums: InsertAlbum[] = [
      {
        title: "NEON DREAMS",
        genre: "Electronic",
        price: "24.99",
        year: "2024",
        coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      },
      {
        title: "CYBER NIGHTS",
        genre: "Synthwave",
        price: "19.99",
        year: "2023",
        coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      },
      {
        title: "DIGITAL VOID",
        genre: "Ambient",
        price: "22.99",
        year: "2023",
        coverImage: "https://pixabay.com/get/ge6ae40bcdc1304c1b6564df8263c6ea3458fd3683011da18a6d3c0a4ddb51163a9ae7e08217d6a6f630900e58f2f5c248ca66676053af0c4114f504d0a3515f6_1280.jpg"
      },
      {
        title: "RETRO FUTURE",
        genre: "Synthpop",
        price: "26.99",
        year: "2022",
        coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      },
      {
        title: "ELECTRIC DREAMS",
        genre: "Electronic",
        price: "21.99",
        year: "2022",
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      },
      {
        title: "MACHINE SOUL",
        genre: "Industrial",
        price: "23.99",
        year: "2021",
        coverImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      }
    ];

    defaultAlbums.forEach(album => {
      this.createAlbum(album);
    });
  }

  async getAllAlbums(): Promise<Album[]> {
    return Array.from(this.albums.values());
  }

  async getAlbum(id: number): Promise<Album | undefined> {
    return this.albums.get(id);
  }

  async createAlbum(insertAlbum: InsertAlbum): Promise<Album> {
    const id = this.currentAlbumId++;
    const album: Album = { ...insertAlbum, id };
    this.albums.set(id, album);
    return album;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
