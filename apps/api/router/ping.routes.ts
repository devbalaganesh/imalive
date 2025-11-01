import express from "express";
import axios from "axios";

const router = express.Router();

// POST /api/v1/ping
router.post("/", async (req, res) => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: "Invalid URL list" });
  }

  const results = await Promise.all(
    urls.map(async (url: string) => {
      const start = Date.now();
      try {
        await axios.get(url, { timeout: 5000 });
        const latency = Date.now() - start;
        return { url, latency, status: "ok" };
      } catch {
        return { url, latency: null, status: "error" };
      }
    })
  );

  res.json({ results });
});

export default router;
