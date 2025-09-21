export default function Layout({ children }) {
  return (
    <div className="site">
      <header className="header">
        <div>
          <h1>{process.env.NEXT_PUBLIC_SITE_NAME || 'FaanSmS'}</h1>
          <div className="tag">Virtual Numbers — beli langsung lewat web</div>
        </div>
      </header>
      <nav className="nav">
        <a href="/" className="active">Home</a>
        <a href="/orders">Orders</a>
        <a href="/docs">API Docs</a>
      </nav>
      <main className="main">{children}</main>
      <footer className="footer">© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME || 'FaanSmS'}</footer>
    </div>
  );
}
