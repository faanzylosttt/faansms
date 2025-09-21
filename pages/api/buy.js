import axios from 'axios';

const API_BASE = process.env.API_BASE;
const TOKEN = process.env.API_TOKEN;
if (!TOKEN) {
  // Note: in production you'd want to handle this more gracefully
}
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!TOKEN) return res.status(500).json({ error: 'API_TOKEN missing' });

  const { serviceId, country, phone } = req.body;

  try {
    const payload = {
      service_id: serviceId,
      country: country,
      // phone: phone, // if provider supports selecting phone or custom params
    };

    // Try common endpoints — adjust to match provider docs if different
    const attempts = [`${API_BASE}/buy`, `${API_BASE}/order`, `${API_BASE}/orders`];

    let lastErr = null;
    for (const url of attempts) {
      try {
        const r = await axios.post(url, payload, { headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' } });
        if (r && r.data) {
          return res.status(200).json({ success: true, data: r.data });
        }
      } catch (e) {
        lastErr = e;
      }
    }

    return res.status(502).json({ error: true, message: 'Failed to place order', details: lastErr?.response?.data || lastErr?.message });

  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
}
