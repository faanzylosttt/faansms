import axios from 'axios';

const API_BASE = process.env.API_BASE;
const TOKEN = process.env.API_TOKEN;
if (!TOKEN) {
  // Note: in production you'd want to handle this more gracefully
}
export default async function handler(req, res) {
  if (!TOKEN) return res.status(500).json({error:'API_TOKEN missing'});
  try {
    const r = await axios.get(`${API_BASE}/services`, { headers: { Authorization: `Bearer ${TOKEN}` } });
    return res.status(200).json(r.data);
  } catch (err) {
    return res.status(502).json({ error: true, message: err?.response?.data || err.message });
  }
}
