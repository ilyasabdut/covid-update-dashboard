export default async function handler(req, res) {
    try {
      const response = await fetch("https://dekontaminasi.com/api/id/covid19/stats");
      const data = await response.json();
  
      res.setHeader("Access-Control-Allow-Origin", "*"); // Enable CORS
      res.setHeader("Access-Control-Allow-Methods", "GET"); 
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch data", error });
    }
  }
  