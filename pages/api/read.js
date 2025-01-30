import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVERHOST}&action=${req.query.action}&id=${req.query.id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
