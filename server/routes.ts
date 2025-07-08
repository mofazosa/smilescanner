import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { insertUploadSchema } from "@shared/schema";

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed') as any, false);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Tips endpoints
  app.get("/api/tips", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let tips;
      if (search) {
        tips = await storage.searchTips(search as string);
      } else if (category) {
        tips = await storage.getTipsByCategory(category as string);
      } else {
        tips = await storage.getAllTips();
      }
      
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tips" });
    }
  });

  // File upload endpoint
  app.post("/api/upload", upload.single('photo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const uploadData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      };

      const result = insertUploadSchema.safeParse(uploadData);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid file data" });
      }

      const upload = await storage.createUpload(result.data);
      
      // Return mock analysis results for educational purposes
      const mockAnalysis = {
        uploadId: upload.id,
        results: [
          {
            id: 1,
            title: "Overall Health",
            description: "Based on general dental health indicators",
            status: "good",
            message: "Good foundation for oral health",
            color: "health-green"
          },
          {
            id: 2,
            title: "Hygiene Tips",
            description: "General recommendations for improvement",
            status: "attention",
            message: "Focus on regular brushing routine",
            color: "warm-amber"
          },
          {
            id: 3,
            title: "Education",
            description: "Learn more about dental care",
            status: "info",
            message: "Explore our tips section",
            color: "dental-blue"
          }
        ]
      };

      res.json({ upload, analysis: mockAnalysis });
    } catch (error) {
      res.status(500).json({ message: "Upload failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
