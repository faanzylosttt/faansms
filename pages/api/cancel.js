import axios from 'axios';

const API_BASE = process.env.API_BASE;
const TOKEN = process.env.API_TOKEN;
if (!TOKEN) {
  // Note: in production you'd want to handle this more gracefully
}
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!TOKEN) return res.status(500).json({ error: 'API_TOKEN missing' });

  const { order_id } = req.body;
  if (!order_id) return res.status(400).json({ error: 'order_id required' });

  try {
    const attempts = [`${API_BASE}/cancel`, `${API_BASE}/order/cancel`];
    let lastErr = null;
    for (const url of attempts) {
      try {
        const r = await axios.post(url, { order_id }, { headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' } });
        if (r && r.data) return res.status(200).json(r.data);
      } catch (e) {
        lastErr = e;
      }
    }
    return res.status(502).json({ error: true, message: 'Failed to cancel', details: lastErr?.response?.data || lastErr?.message });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
}
