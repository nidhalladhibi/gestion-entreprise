import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import factureRoutes from "./routes/factureRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/factures", factureRoutes);
app.use("/api/products", productRoutes);

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(join(__dirname, 'frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'frontend/build', 'index.html'));
  });
} else {
  // Simple root for dev
  app.get("/", (req, res) => res.send("API is running"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});