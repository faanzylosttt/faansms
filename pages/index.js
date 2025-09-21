import Layout from '../components/Layout'
import ServiceCard from '../components/ServiceCard'

export default function Home({ services, balance }) {
  return (
    <Layout>
      <div className="topbar">
        <div>Saldo API: <strong>{balance ?? '—'}</strong></div>
        <div><small>API Provider: sms-virtual.net</small></div>
      </div>

      <section className="panel">
        <h2>Available services</h2>
        <div className="grid" style={{marginTop:12}}>
          {services.length ? services.map((s)=> <ServiceCard key={s.id || s.service_id || s.code || Math.random()} svc={s} />) : <div>No services loaded</div>}
        </div>
        <p style={{marginTop:12,color:'#64748b'}}>Klik "Beli" untuk langsung memesan nomor — server akan memanggil API provider menggunakan token server-side.</p>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const axios = require('axios');
  const API_BASE = process.env.API_BASE || 'https://api.sms-virtual.net/api';
  const TOKEN = process.env.API_TOKEN;

  let services = [];
  let balance = null;

  try {
    // try common endpoints
    try {
      const r = await axios.get(`${API_BASE}/services`, { headers: { Authorization: `Bearer ${TOKEN}` }, timeout: 8000 });
      services = r.data.services ?? r.data.data ?? r.data ?? [];
    } catch (e) { }

    try {
      const r2 = await axios.get(`${API_BASE}/balance`, { headers: { Authorization: `Bearer ${TOKEN}` }, timeout: 8000 });
      balance = r2.data.balance ?? r2.data ?? null;
    } catch (e) { }

    if (!services || services.length === 0) {
      services = [
        { id: 'demo_us_1', country: 'US', description: 'Demo - US virtual SMS', price: 0.5 },
        { id: 'demo_id_1', country: 'ID', description: 'Demo - Indonesia virtual', price: 2.0 }
      ];
    }

  } catch(err) {
    services = [];
  }

  return { props: { services, balance } }
}
