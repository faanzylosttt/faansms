import Layout from '../components/Layout'
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then(r => r.json())

export default function Orders() {
  const { data, error } = useSWR('/api/history', fetcher, { refreshInterval: 5000 })
  if (error) return <Layout><div>Failed to load</div></Layout>
  const orders = data?.orders ?? []
  return (
    <Layout>
      <section className="panel">
        <h2>Your recent orders</h2>
        {orders.length === 0 && <div>No orders yet.</div>}
        {orders.map(o => (
          <div key={o.order_id || o.id} style={{marginBottom:12}} className="card">
            <div><strong>Order:</strong> {o.order_id || o.id}</div>
            <div><strong>Number:</strong> {o.number || o.phone || '-'}</div>
            <div><strong>Status:</strong> {o.status || o.state || '-'}</div>
            <div style={{marginTop:8}} className="orderBox">{JSON.stringify(o, null, 2)}</div>
          </div>
        ))}
      </section>
    </Layout>
  )
}
