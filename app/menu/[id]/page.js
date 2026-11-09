'use client';
import { useState, use } from 'react';

const daftarMenu = [
  { 
    id: 1, 
    nama: 'Nasi Goreng Spesial', 
    kategori: 'Makanan', 
    harga: 12000, 
    stok: 5,
    gambar: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Nasi goreng lezat dengan bumbu rempah pilihan, potongan ayam gurih, telur mata sapi, dan irisan sayuran segar khas kantin.'
  },
  { 
    id: 2, 
    nama: 'Es Teh Manis', 
    kategori: 'Minuman', 
    harga: 4000, 
    stok: 10,
    gambar: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Teh melati pilihan diseduh segar dengan es batu kristal yang dingin, manisnya pas dan sangat menyegarkan.'
  },
  { 
    id: 3, 
    nama: 'Mie Ayam Bakso', 
    kategori: 'Makanan', 
    harga: 10000, 
    stok: 0,
    gambar: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Mie kenyal dengan topping ayam gurih dan bakso sapi pilihan yang mantap disantap saat jam istirahat.'
  },
  { 
    id: 4, 
    nama: 'Jus Alpukat', 
    kategori: 'Minuman', 
    harga: 8000, 
    stok: 3,
    gambar: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    deskripsi: 'Jus alpukat murni bertekstur kental dengan tambahan susu cokelat lezat yang mengenyangkan.'
  },
];

export default function DetailMenuPage({ params }) {
  const resolvedParams = use(params);
  const menuId = parseInt(resolvedParams.id);
  const menu = daftarMenu.find((m) => m.id === menuId);

  const [jumlah, setJumlah] = useState(1);
  const [pesanNotif, setPesanNotif] = useState('');

  if (!menu) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ color: '#db2777', marginBottom: '1rem' }}>Menu Tidak Ditemukan </h2>
        <a href="/menu" className="btn-card btn-card-active" style={{ display: 'inline-block', width: 'auto', padding: '0.75rem 2rem', textDecoration: 'none' }}>
          Kembali ke Menu
        </a>
      </div>
    );
  }

  const isHabis = menu.stok === 0;

  const tambahQty = () => {
    if (jumlah < menu.stok) {
      setJumlah(jumlah + 1);
    }
  };

  const kurangQty = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
    }
  };

  const tambahKeKeranjang = () => {
    if (isHabis) return;

    try {
      let cart = JSON.parse(localStorage.getItem('keranjang')) || [];
      const index = cart.findIndex((item) => item.id === menu.id);

      if (index !== -1) {
        if (cart[index].jumlah + jumlah <= menu.stok) {
          cart[index].jumlah += jumlah;
        } else {
          alert('Jumlah total di keranjang melebihi stok yang tersedia!');
          return;
        }
      } else {
        cart.push({ id: menu.id, jumlah: jumlah });
      }

      localStorage.setItem('keranjang', JSON.stringify(cart));
      window.dispatchEvent(new Event('keranjang-berubah'));

      setPesanNotif(`"${menu.nama}" (${jumlah} porsi) berhasil ditambahkan ke keranjang! ✨`);
      setTimeout(() => setPesanNotif(''), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Notifikasi Berhasil */}
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

      {/* Tombol Kembali */}
      <div style={{ marginBottom: '1.5rem' }}>
        <a href="/menu" style={{ color: '#db2777', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem' }}>
          ← Kembali ke Katalog Menu
        </a>
      </div>

      {/* Kartu Detail Produk */}
      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Gambar Besar */}
        <div style={{ width: '100%', height: '320px', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #fce7f3' }}>
          <img src={menu.gambar} alt={menu.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Informasi Produk */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '0.75rem', alignItems: 'center' }}>
              <span className="badge badge-kategori">{menu.kategori}</span>
              <span className={`badge ${isHabis ? 'badge-habis' : 'badge-stok'}`}>
                {isHabis ? 'Habis' : `Stok: ${menu.stok}`}
              </span>
            </div>

            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', lineHeight: '1.2' }}>
              {menu.nama}
            </h1>

            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#db2777', marginBottom: '1rem' }}>
              Rp {menu.harga.toLocaleString('id-ID')}
            </p>

            <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '2rem' }}>
              {menu.deskripsi}
            </p>
          </div>

          {!isHabis && (
            <div>
              {/* Pengaturan Jumlah */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>Jumlah Porsi:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #fbcfe8', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: '#fff' }}>
                  <button onClick={kurangQty} style={{ padding: '0.5rem 1rem', background: '#fdf2f8', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#db2777' }}>-</button>
                  <span style={{ padding: '0 1rem', fontWeight: '600', color: '#374151' }}>{jumlah}</span>
                  <button onClick={tambahQty} style={{ padding: '0.5rem 1rem', background: '#fdf2f8', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#db2777' }}>+</button>
                </div>
              </div>
            </div>
          )}

          {/* Tombol Tambah ke Keranjang */}
          <button
            onClick={tambahKeKeranjang}
            disabled={isHabis}
            className={`btn-card ${isHabis ? 'btn-card-disabled' : 'btn-card-active'}`}
            style={{ padding: '1rem', fontSize: '1rem', fontWeight: 'bold' }}
          >
            {isHabis ? 'Menu ini habis' : 'Tambah ke Keranjang 🛒'}
          </button>
        </div>
      </div>
    </div>
  );
}