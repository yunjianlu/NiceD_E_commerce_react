// // Simple Express backend for login authentication with MongoDB
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const dbName = process.env.DB_NAME;
const userCollection = process.env.USER_COLLECTION;

// Login endpoint using native MongoDB driver
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await client.connect();
    const db = client.db(dbName); // Use env DB name
    const user = await db.collection(userCollection).findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Login successful", email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    await client.close();
  }
});

// Serve static files from the dist directory
import path from "path";
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// Route to serve index.html for all non-API routes (for SPA)
app.get(/^\/((?!api).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
