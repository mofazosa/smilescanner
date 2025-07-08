import { users, uploads, tips, type User, type InsertUser, type Upload, type InsertUpload, type Tip, type InsertTip } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createUpload(upload: InsertUpload): Promise<Upload>;
  getUpload(id: number): Promise<Upload | undefined>;
  
  getAllTips(): Promise<Tip[]>;
  getTipsByCategory(category: string): Promise<Tip[]>;
  searchTips(query: string): Promise<Tip[]>;
  createTip(tip: InsertTip): Promise<Tip>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private uploads: Map<number, Upload>;
  private tips: Map<number, Tip>;
  private currentUserId: number;
  private currentUploadId: number;
  private currentTipId: number;

  constructor() {
    this.users = new Map();
    this.uploads = new Map();
    this.tips = new Map();
    this.currentUserId = 1;
    this.currentUploadId = 1;
    this.currentTipId = 1;
    
    // Initialize with sample tips data
    this.initializeTips();
  }

  private initializeTips() {
    const sampleTips: Omit<Tip, 'id'>[] = [
      {
        title: "Brushing Technique",
        category: "brushing",
        description: "Learn proper brushing methods and timing",
        content: [
          "Brush for 2 minutes, twice daily",
          "Use gentle circular motions",
          "Don't forget your tongue",
          "Replace toothbrush every 3 months"
        ],
        color: "dental-blue"
      },
      {
        title: "Flossing Fundamentals",
        category: "flossing",
        description: "Essential flossing techniques for healthy gums",
        content: [
          "Floss at least once daily",
          "Use 18 inches of floss",
          "Gentle back-and-forth motion",
          "Clean between all teeth"
        ],
        color: "health-green"
      },
      {
        title: "Dental Diet",
        category: "diet",
        description: "Foods that promote healthy teeth and gums",
        content: [
          "Limit sugary and acidic foods",
          "Eat calcium-rich foods",
          "Drink plenty of water",
          "Chew sugar-free gum"
        ],
        color: "warm-amber"
      },
      {
        title: "Prevention First",
        category: "prevention",
        description: "Proactive steps for long-term oral health",
        content: [
          "Regular dental check-ups",
          "Use fluoride toothpaste",
          "Avoid tobacco products",
          "Protect teeth during sports"
        ],
        color: "purple"
      },
      {
        title: "Gum Care",
        category: "gums",
        description: "Keep your gums healthy and strong",
        content: [
          "Watch for bleeding gums",
          "Massage gums gently",
          "Use antimicrobial mouthwash",
          "Don't ignore persistent issues"
        ],
        color: "pink"
      },
      {
        title: "Kids' Dental Care",
        category: "kids",
        description: "Building healthy habits early",
        content: [
          "Start brushing early",
          "Make it fun and routine",
          "Supervise until age 8",
          "First dental visit by age 1"
        ],
        color: "teal"
      }
    ];

    sampleTips.forEach(tip => {
      const tipWithId = { ...tip, id: this.currentTipId++ };
      this.tips.set(tipWithId.id, tipWithId);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createUpload(insertUpload: InsertUpload): Promise<Upload> {
    const id = this.currentUploadId++;
    const upload: Upload = { ...insertUpload, id, uploadedAt: new Date() };
    this.uploads.set(id, upload);
    return upload;
  }

  async getUpload(id: number): Promise<Upload | undefined> {
    return this.uploads.get(id);
  }

  async getAllTips(): Promise<Tip[]> {
    return Array.from(this.tips.values());
  }

  async getTipsByCategory(category: string): Promise<Tip[]> {
    return Array.from(this.tips.values()).filter(tip => tip.category === category);
  }

  async searchTips(query: string): Promise<Tip[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.tips.values()).filter(tip =>
      tip.title.toLowerCase().includes(lowercaseQuery) ||
      tip.description.toLowerCase().includes(lowercaseQuery) ||
      tip.category.toLowerCase().includes(lowercaseQuery) ||
      tip.content.some(item => item.toLowerCase().includes(lowercaseQuery))
    );
  }

  async createTip(insertTip: InsertTip): Promise<Tip> {
    const id = this.currentTipId++;
    const tip: Tip = { ...insertTip, id };
    this.tips.set(id, tip);
    return tip;
  }
}

export const storage = new MemStorage();
