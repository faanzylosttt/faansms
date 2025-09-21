import Layout from '../components/Layout'

export default function Docs() {
  return (
    <Layout>
      <section className="panel">
        <h2>API Docs (proxy)</h2>
        <p>This page proxies basic endpoints from provider for quick reference. Use the API routes in <code>/pages/api</code>.</p>
        <ul>
          <li>/api/services — list services</li>
          <li>/api/balance — account balance</li>
          <li>/api/buy — buy/order a number</li>
          <li>/api/status?order_id=... — order status</li>
          <li>/api/messages?order_id=... — fetch SMS</li>
          <li>/api/cancel — cancel an order (POST)</li>
          <li>/api/history — order history</li>
          <li>/api/webhook — example webhook receiver</li>
        </ul>
      </section>
    </Layout>
  )
}
