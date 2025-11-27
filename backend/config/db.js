import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Options pour une meilleure connexion
      serverSelectionTimeoutMS: 5000, // Timeout après 5s au lieu de 30s
      socketTimeoutMS: 45000, // Fermer les sockets après 45s d'inactivité
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error(`💡 Make sure MongoDB is running on ${process.env.MONGO_URI}`);
    process.exit(1);
  }
};

export default connectDB;
