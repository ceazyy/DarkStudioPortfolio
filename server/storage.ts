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
        coverImage: "https://via.placeholder.com/800x800/333333/ffffff?text=NEON+DREAMS"
      },
      {
        title: "CYBER NIGHTS",
        genre: "Synthwave",
        price: "19.99",
        year: "2023",
        coverImage: "https://via.placeholder.com/800x800/444444/ffffff?text=CYBER+NIGHTS"
      },
      {
        title: "DIGITAL VOID",
        genre: "Ambient",
        price: "22.99",
        year: "2023",
        coverImage: "https://via.placeholder.com/800x800/555555/ffffff?text=DIGITAL+VOID"
      },
      {
        title: "RETRO FUTURE",
        genre: "Synthpop",
        price: "26.99",
        year: "2022",
        coverImage: "https://via.placeholder.com/800x800/666666/ffffff?text=RETRO+FUTURE"
      },
      {
        title: "ELECTRIC DREAMS",
        genre: "Electronic",
        price: "21.99",
        year: "2022",
        coverImage: "https://via.placeholder.com/800x800/777777/ffffff?text=ELECTRIC+DREAMS"
      },
      {
        title: "MACHINE SOUL",
        genre: "Industrial",
        price: "23.99",
        year: "2021",
        coverImage: "https://via.placeholder.com/800x800/888888/ffffff?text=MACHINE+SOUL"
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
