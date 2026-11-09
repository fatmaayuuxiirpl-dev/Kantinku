'use client';
import { useState, useEffect } from 'react';

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

export default function FavoritPage() {
  const [favorit, setFavorit] = useState([]);
  const [pesanNotif, setPesanNotif] = useState('');

  useEffect(() => {
    try {
      const dataFav = JSON.parse(localStorage.getItem('favorit')) || [1, 2];
      setFavorit(dataFav);
    } catch (e) {
      setFavorit([1, 2]);
    }
  }, []);

  const hapusDariFavorit = (id) => {
    const newFav = favorit.filter((favId) => favId !== id);
    setFavorit(newFav);
    localStorage.setItem('favorit', JSON.stringify(newFav));
  };

  const tambahKeKeranjang = (menu) => {
    if (menu.stok === 0) return;

    try {
      let cart = JSON.parse(localStorage.getItem('keranjang')) || [];
      const index = cart.findIndex((item) => item.id === menu.id);

      if (index !== -1) {
        if (cart[index].jumlah < menu.stok) {
          cart[index].jumlah += 1;
        } else {
          alert('Jumlah melebihi stok yang tersedia!');
          return;
        }
      } else {
        cart.push({ id: menu.id, jumlah: 1 });
      }

      localStorage.setItem('keranjang', JSON.stringify(cart));
      window.dispatchEvent(new Event('keranjang-berubah'));

      setPesanNotif(`"${menu.nama}" berhasil ditambahkan ke keranjang! ✨`);
      setTimeout(() => setPesanNotif(''), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const menuFavoritList = daftarMenu.filter((menu) => favorit.includes(menu.id));

  return (
    <div>
      {pesanNotif && (
        <div style={{
          backgroundColor: '#d1fae5',
          color: '#065f46',
          padding: '1rem',
          borderRadius: '0.75rem',
          marginBottom: '1.5rem',
          fontWeight: '500',
          border: '1px solid #a7f3d0'
        }}>
          {pesanNotif}
        </div>
      )}

      <div className="card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#db2777', marginBottom: '0.5rem' }}>
          Menu Favorit Saya ❤️
        </h2>
        <p style={{ color: '#4b5563', margin: 0 }}>
          Daftar makanan dan minuman andalan yang sudah kamu tandai kesukaannya!
        </p>
      </div>

      {menuFavoritList.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '1.5rem' }}>
            Belum ada menu favorit yang ditambahkan. Yuk tandai menu kesukaanmu!
          </p>
          <a href="/menu" className="btn-card btn-card-active" style={{ display: 'inline-block', width: 'auto', padding: '0.75rem 2rem', textDecoration: 'none' }}>
            Cari Menu Favorit ✨
          </a>
        </div>
      ) : (
        <div className="menu-grid">
          {menuFavoritList.map((item) => {
            const isHabis = item.stok === 0;
            return (
              <div key={item.id} className="menu-card" style={{ padding: '0', overflow: 'hidden' }}>
                {/* Gambar Menu & Badge Kategori & Tombol Hapus Favorit */}
                <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={item.gambar} 
                    alt={item.nama} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className="badge badge-kategori" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(4px)' }}>
                      {item.kategori}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <button
                      onClick={() => hapusDariFavorit(item.id)}
                      style={{ background: 'rgba(255, 255, 255, 0.9)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '6px 8px', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                      title="Hapus dari Favorit"
                    >
                      ❤️
                    </button>
                  </div>
                </div>

                {/* Konten Kartu */}
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

                  <button
                    onClick={() => tambahKeKeranjang(item)}
                    disabled={isHabis}
                    className={`btn-card ${isHabis ? 'btn-card-disabled' : 'btn-card-active'}`}
                  >
                    {isHabis ? 'Menu ini habis' : 'Tambah ke Keranjang 🛒'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}