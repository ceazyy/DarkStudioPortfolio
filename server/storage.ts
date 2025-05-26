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
        coverImage: "https://picsum.photos/800/800?random=1"
      },
      {
        title: "CYBER NIGHTS",
        genre: "Synthwave",
        price: "19.99",
        year: "2023",
        coverImage: "https://picsum.photos/800/800?random=2"
      },
      {
        title: "DIGITAL VOID",
        genre: "Ambient",
        price: "22.99",
        year: "2023",
        coverImage: "https://picsum.photos/800/800?random=3"
      },
      {
        title: "RETRO FUTURE",
        genre: "Synthpop",
        price: "26.99",
        year: "2022",
        coverImage: "https://picsum.photos/800/800?random=4"
      },
      {
        title: "ELECTRIC DREAMS",
        genre: "Electronic",
        price: "21.99",
        year: "2022",
        coverImage: "https://picsum.photos/800/800?random=5"
      },
      {
        title: "MACHINE SOUL",
        genre: "Industrial",
        price: "23.99",
        year: "2021",
        coverImage: "https://picsum.photos/800/800?random=6"
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
