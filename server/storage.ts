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
        coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop&crop=center"
      },
      {
        title: "CYBER NIGHTS",
        genre: "Synthwave",
        price: "19.99",
        year: "2023",
        coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop&crop=center"
      },
      {
        title: "DIGITAL VOID",
        genre: "Ambient",
        price: "22.99",
        year: "2023",
        coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center"
      },
      {
        title: "RETRO FUTURE",
        genre: "Synthpop",
        price: "26.99",
        year: "2022",
        coverImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop&crop=center"
      },
      {
        title: "ELECTRIC DREAMS",
        genre: "Electronic",
        price: "21.99",
        year: "2022",
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&crop=center"
      },
      {
        title: "MACHINE SOUL",
        genre: "Industrial",
        price: "23.99",
        year: "2021",
        coverImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=800&fit=crop&crop=center"
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
