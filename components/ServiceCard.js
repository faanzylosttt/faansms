export default function ServiceCard({ svc }) {
  const id = svc.id || svc.service_id || svc.code || '';
  const price = svc.price ?? svc.cost ?? svc.amount ?? svc.price_usd ?? '—';
  return (
    <div className="card">
      <div className="card-head">
        <strong>{svc.country || svc.name || id}</strong>
        <span className="price">{price} USD</span>
      </div>
      <p className="desc">{svc.description ?? svc.operator ?? ''}</p>

      <form action="/api/buy" method="post">
        <input type="hidden" name="serviceId" value={id} />
        <input type="hidden" name="country" value={svc.country || ''} />
        <button type="submit" className="btn-buy">Beli</button>
      </form>
    </div>
  )
}
