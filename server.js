const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let db;
let solarRequests;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME || "SuryaPowerSolar");
    solarRequests = db.collection("solarRequests");
    await solarRequests.createIndex({ createdAt: -1 });
    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.json({
    message: "SuryaPower Solar backend is running",
    endpoints: {
      submit: "POST /api/solar-requests",
      all: "GET /api/solar-requests"
    }
  });
});

app.post("/api/solar-requests", async (req, res) => {
  try {
    const {
      name, mobile, email, city, state, discom, bill, system,
      property, roof, date, time, address, message, consent
    } = req.body;

    if (!name || !mobile || !city || !state || !address || !consent) {
      return res.status(400).json({
        message: "Please fill all required fields and accept the contact consent."
      });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Mobile number must contain 10 digits." });
    }

    const document = {
      name,
      mobile,
      email: email || "",
      city,
      state,
      discom: discom || "",
      bill: bill ?? null,
      system: system || "Need recommendation",
      property: property || "",
      roof: roof || "",
      preferredContactDate: date || "",
      preferredContactTime: time || "",
      address,
      message: message || "",
      consent: true,
      status: "New",
      createdAt: new Date()
    };

    const result = await solarRequests.insertOne(document);

    res.status(201).json({
      message: "Solar request saved successfully",
      id: result.insertedId
    });
  } catch (error) {
    console.error("Save request error:", error);
    res.status(500).json({ message: "Server error while saving the request." });
  }
});

app.get("/api/solar-requests", async (req, res) => {
  try {
    const requests = await solarRequests.find({}).sort({ createdAt: -1 }).toArray();
    res.json(requests);
  } catch (error) {
    console.error("Fetch requests error:", error);
    res.status(500).json({ message: "Server error while fetching requests." });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
