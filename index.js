// backend/server.js
const express = require("express");
// const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

// Allow all origins explicitly
app.use(cors({
  origin: "*",          // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


const PORT = 5000;

app.get("/api/google-reviews", async (req, res) => {
  const placeId = "ChIJMx4uw4HXCDkRinON_66BRcQ"; // <-- place id
  const apiKey = "AIzaSyCm67_p5zkcByJn3Zddxt1IQilGZo5pPxE"; // <-- api key
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Google Reviews Data:", data);
    
    res.json({ reviews: data.result.reviews || [] });
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    res.status(500).json({ reviews: [], error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});