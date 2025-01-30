import axios from 'axios';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVERHOST}&action=rememberuser`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}