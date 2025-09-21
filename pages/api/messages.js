import axios from 'axios';

const API_BASE = process.env.API_BASE;
const TOKEN = process.env.API_TOKEN;
if (!TOKEN) {
  // Note: in production you'd want to handle this more gracefully
}
export default async function handler(req, res) {
  const { order_id } = req.query;
  if (!TOKEN) return res.status(500).json({ error: 'API_TOKEN missing' });
  if (!order_id) return res.status(400).json({ error: 'order_id required' });
  try {
    const r = await axios.get(`${API_BASE}/messages`, { headers: { Authorization: `Bearer ${TOKEN}` }, params: { order_id } });
    return res.status(200).json(r.data);
  } catch (err) {
    return res.status(502).json({ error: true, message: err?.response?.data || err.message });
  }
}
