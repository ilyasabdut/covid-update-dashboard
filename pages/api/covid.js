export default async function handler(req, res) {
    try {
      const response = await fetch("https://dekontaminasi.com/api/id/covid19/stats");
  
      if (!response.ok) {
        return res.status(response.status).json({ message: "Failed to fetch data" });
      }
  
      const data = await response.json();
  
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate"); // Optional caching
      res.status(200).json(data);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
  