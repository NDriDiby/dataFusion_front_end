import { backEnd } from "@/features/AuthSlice";

const memjs = require("memjs");
const axios = require("axios"); // Assuming axios is used for HTTP requests

const memcachedClient = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  username: process.env.MEMCACHIER_USERNAME,
  password: process.env.MEMCACHIER_PASSWORD,
});

export default async function handler(req, res) {
  const cacheKey = "data:fullyai";

  // Try to retrieve from cache
  const cachedValue = await new Promise((resolve) => {
    memcachedClient.get(cacheKey, (err, value) => {
      if (!err && value) {
        resolve(JSON.parse(value.toString()));
      } else {
        resolve(null);
      }
    });
  });

  if (cachedValue) {
    // Send cached data as response
    return res.json(cachedValue);
  }

  // Fetch data if not in cache
  try {
    const response = await fetch("http://fullyai.localhost:8000/api/v1/sales/");
    const data = response.data;

    console.log("API DATA", data);

    // Cache the newly fetched data
    memcachedClient.set(cacheKey, JSON.stringify(data), { expires: 300 });

    // Send response
    res.json(data);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Error fetching sales data" });
  }
}
