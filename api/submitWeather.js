import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end(); // Preflight success
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { weather } = req.body;

    if (!weather) {
      return res.status(400).json({ error: "Missing 'weather' field" });
    }

    // Replace with your actual Google Apps Script URL
    const response = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weather }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to forward to Google Script" });
    }

    const result = await response.json();
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
