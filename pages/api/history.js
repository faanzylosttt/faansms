import axios from 'axios';

const API_BASE = process.env.API_BASE;
const TOKEN = process.env.API_TOKEN;
if (!TOKEN) {
  // Note: in production you'd want to handle this more gracefully
}
export default async function handler(req, res) {
  if (!TOKEN) return res.status(500).json({ error: 'API_TOKEN missing' });
  try {
    const attempts = [`${API_BASE}/history`, `${API_BASE}/orders`, `${API_BASE}/orders/list`];
    for (const url of attempts) {
      try {
        const r = await axios.get(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
        if (r && r.data) return res.status(200).json({ orders: r.data.orders ?? r.data.data ?? r.data });
      } catch (e) {}
    }
    return res.status(200).json({ orders: [] });
  } catch (err) {
    return res.status(502).json({ error: true, message: err?.response?.data || err.message });
  }
}
