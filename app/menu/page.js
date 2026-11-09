'use client';

export default function MenuPage() {
  const daftarMenu = [
    { 
      id: 1, 
      nama: 'Nasi Goreng Spesial', 
      kategori: 'Makanan', 
      harga: 12000, 
      stok: 5,
      gambar: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 2, 
      nama: 'Es Teh Manis', 
      kategori: 'Minuman', 
      harga: 4000, 
      stok: 10,
      gambar: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 3, 
      nama: 'Mie Ayam Bakso', 
      kategori: 'Makanan', 
      harga: 10000, 
      stok: 0,
      gambar: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 4, 
      nama: 'Jus Alpukat', 
      kategori: 'Minuman', 
      harga: 8000, 
      stok: 3,
      gambar: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&q=80'
    },
  ];

  return (
    <div>
      <div className="card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#db2777', marginBottom: '0.5rem' }}>
          Katalog Menu Kantin 🍱
        </h2>
        <p style={{ color: '#4b5563', margin: 0 }}>
          Pilih makanan atau minuman favoritmu di sini!
        </p>
      </div>

      <div className="menu-grid">
        {daftarMenu.map((item) => {
          const isHabis = item.stok === 0;
          return (
            <div 
              key={item.id} 
              className="menu-card" 
              style={{ 
                padding: '0', 
                overflow: 'hidden',
                opacity: isHabis ? 0.6 : 1,
                filter: isHabis ? 'grayscale(40%)' : 'none'
              }}
            >
              <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={item.gambar} 
                  alt={item.nama} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span className="badge badge-kategori" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    {item.kategori}
                  </span>
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0, lineHeight: '1.3' }}>
                      {item.nama}
                    </h3>
                    <span className={`badge ${isHabis ? 'badge-habis' : 'badge-stok'}`} style={{ whiteSpace: 'nowrap' }}>
                      {isHabis ? 'Habis' : `Stok: ${item.stok}`}
                    </span>
                  </div>

                  <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#db2777', marginBottom: '1.5rem', marginTop: 0 }}>
                    Rp {item.harga.toLocaleString('id-ID')}
                  </p>
                </div>

                {isHabis ? (
                  <button
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      backgroundColor: '#e5e7eb',
                      color: '#9ca3af',
                      fontWeight: 'bold',
                      cursor: 'not-allowed'
                    }}
                  >
                    Menu Ini Habis
                  </button>
                ) : (
                  <a
                    href={`/menu/${item.id}`}
                    className="btn-card btn-card-active"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'block', padding: '0.75rem' }}
                  >
                    Lihat Detail ✨
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}