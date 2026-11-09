'use client';

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner Estetik dengan Background Foto */}
      <div style={{
        position: 'relative',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '5rem 3rem',
        color: 'white',
        boxShadow: '0 10px 25px -5px rgba(219, 39, 119, 0.15)',
        textAlign: 'left'
      }}>
        <div style={{ maxWidth: '42rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 'extrabold', marginBottom: '1rem', lineHeight: '1.2' }}>
            Selamat Datang di KantinKu 🍜
          </h2>
          <p style={{ fontSize: '1.15rem', opacity: '0.95', lineHeight: '1.6', marginBottom: '2rem' }}>
            Lapar di jam istirahat? Pesan makanan dan minuman favoritmu langsung dari kelas tanpa perlu mengantre panjang. Cepat, mudah, dan praktis!
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/menu" className="btn-card btn-card-active" style={{ display: 'inline-block', width: 'auto', padding: '0.85rem 2.25rem', textDecoration: 'none', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1rem' }}>
              Lihat Menu & Belanja 🍱
            </a>
            <a href="/favorit" style={{ display: 'inline-block', width: 'auto', padding: '0.85rem 2rem', textDecoration: 'none', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', backdropFilter: 'blur(4px)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
              Menu Favorit ❤️
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}