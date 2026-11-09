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

export default function KeranjangPage() {
  const [cart, setCart] = useState([]);
  const [kodePromo, setKodePromo] = useState('');
  const [diskonPersen, setDiskonPersen] = useState(0);
  const [pesanPromo, setPesanPromo] = useState('');
  const [caraAmbil, setCaraAmbil] = useState('ambil');
  const [kelas, setKelas] = useState('');
  const [namaPemesan, setNamaPemesan] = useState('');
  const [strukSelesai, setStrukSelesai] = useState(null);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('keranjang')) || [];
      setCart(data);
    } catch (e) {
      setCart([]);
    }
  }, []);

  const updateLocalStorage = (newCart) => {
    setCart(newCart);
    localStorage.setItem('keranjang', JSON.stringify(newCart));
    window.dispatchEvent(new Event('keranjang-berubah'));
  };

  const tambahQty = (id) => {
    const itemMenu = daftarMenu.find((m) => m.id === id);
    const newCart = cart.map((item) => {
      if (item.id === id && item.jumlah < itemMenu.stok) {
        return { ...item, jumlah: item.jumlah + 1 };
      }
      return item;
    });
    updateLocalStorage(newCart);
  };

  const kurangQty = (id) => {
    const newCart = cart
      .map((item) => (item.id === id ? { ...item, jumlah: item.jumlah - 1 } : item))
      .filter((item) => item.jumlah > 0);
    updateLocalStorage(newCart);
  };

  const hapusItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateLocalStorage(newCart);
  };

  const subtotal = cart.reduce((sum, item) => {
    const menu = daftarMenu.find((m) => m.id === item.id);
    return sum + (menu ? menu.harga * item.jumlah : 0);
  }, 0);

  const handlePakaiPromo = () => {
    const kode = kodePromo.trim().toUpperCase();
    if (!kode) {
      setDiskonPersen(0);
      setPesanPromo('');
      return;
    }
    if (kode !== 'HEMAT10') {
      setDiskonPersen(0);
      setPesanPromo('Kode promo tidak dikenal.');
    } else if (subtotal < 20000) {
      setDiskonPersen(0);
      setPesanPromo('Promo HEMAT10 butuh belanja minimal Rp 20.000.');
    } else {
      setDiskonPersen(10);
      setPesanPromo('Promo HEMAT10 dipakai: diskon 10%. ✨');
    }
  };

  useEffect(() => {
    if (subtotal < 20000 && diskonPersen > 0) {
      setDiskonPersen(0);
      setPesanPromo('Promo HEMAT10 butuh belanja minimal Rp 20.000.');
    }
  }, [subtotal]);

  const nilaiDiskon = diskonPersen > 0 ? Math.round((subtotal * diskonPersen) / 100) : 0;
  const ongkir = caraAmbil === 'diantar' ? 2000 : 0;
  const totalBayar = subtotal - nilaiDiskon + ongkir;

  const handlePesanSekarang = (e) => {
    e.preventDefault();
    if (namaPemesan.trim().length < 3) {
      alert('Nama pemesan minimal 3 huruf!');
      return;
    }
    if (caraAmbil === 'diantar' && kelas.trim().length < 3) {
      alert('Kolom kelas wajib diisi minimal 3 karakter jika diantar!');
      return;
    }

    const detailPesanan = cart.map((item) => {
      const menu = daftarMenu.find((m) => m.id === item.id);
      return { nama: menu.nama, jumlah: item.jumlah, subtotalBaris: menu.harga * item.jumlah };
    });

    const dataStruk = {
      idPesanan: Date.now(),
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      nama: namaPemesan.trim(),
      item: detailPesanan,
      subtotal,
      diskon: nilaiDiskon,
      ongkir,
      total: totalBayar,
      pengiriman: caraAmbil === 'diantar' ? `Diantar ke kelas ${kelas.trim()}` : 'Diambil sendiri di kantin',
    };

    try {
      const riwayatLama = JSON.parse(localStorage.getItem('riwayat')) || [];
      localStorage.setItem('riwayat', JSON.stringify([dataStruk, ...riwayatLama]));
    } catch (e) {}

    setStrukSelesai(dataStruk);
    updateLocalStorage([]);
    setKodePromo('');
    setPesanPromo('');
    setDiskonPersen(0);
    setNamaPemesan('');
    setKelas('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#db2777', marginBottom: '0.5rem' }}>
          Keranjang Belanja 🛒
        </h2>
        <p style={{ color: '#4b5563', margin: 0 }}>
          Periksa pesananmu dengan teliti sebelum melakukan pembayaran ke kantin.
        </p>
      </div>

      {strukSelesai && (
        <div className="cart-box" style={{ border: '2px solid #db2777', marginBottom: '2rem' }}>
          <h3 style={{ color: '#db2777', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Terima kasih, {strukSelesai.nama}! 🎉
          </h3>
          <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Pesananmu berhasil dicatat dan masuk ke riwayat:</p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem', color: '#374151' }}>
            {strukSelesai.item.map((it, idx) => (
              <li key={idx} style={{ padding: '0.4rem 0', borderBottom: '1px solid #fdf2f8', display: 'flex', justifyContent: 'space-between' }}>
                <span>{it.nama} (x{it.jumlah})</span>
                <span style={{ fontWeight: '600' }}>Rp {it.subtotalBaris.toLocaleString('id-ID')}</span>
              </li>
            ))}
          </ul>
          <div style={{ fontSize: '0.95rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <p><strong>Subtotal:</strong> Rp {strukSelesai.subtotal.toLocaleString('id-ID')}</p>
            {strukSelesai.diskon > 0 && <p style={{ color: '#059669' }}><strong>Diskon:</strong> -Rp {strukSelesai.diskon.toLocaleString('id-ID')}</p>}
            <p><strong>Pengiriman:</strong> {strukSelesai.pengiriman} {strukSelesai.ongkir > 0 ? `(Rp ${strukSelesai.ongkir.toLocaleString('id-ID')})` : ''}</p>
          </div>
          <hr style={{ border: '0.5px solid #fce7f3', margin: '1rem 0' }} />
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#db2777' }}>
            Total Bayar: Rp {strukSelesai.total.toLocaleString('id-ID')}
          </p>
          <button
            onClick={() => setStrukSelesai(null)}
            className="btn-card btn-card-active"
            style={{ marginTop: '1.5rem', width: 'auto', padding: '0.75rem 2rem' }}
          >
            Selesai & Belanja Lagi ✨
          </button>
        </div>
      )}

      {cart.length === 0 && !strukSelesai ? (
        <div className="cart-box" style={{ textAlign: 'center', padding: '3.5rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '1.5rem' }}>
            Keranjang masih kosong nih.
          </p>
          <a href="/menu" className="btn-card btn-card-active" style={{ display: 'inline-block', width: 'auto', padding: '0.75rem 2rem', textDecoration: 'none' }}>
            Pilih Menu Sekarang ✨
          </a>
        </div>
      ) : cart.length > 0 && !strukSelesai ? (
        <div className="cart-container">
          <div className="cart-box">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
              Daftar Pesanan
            </h3>
            <div>
              {cart.map((item) => {
                const menu = daftarMenu.find((m) => m.id === item.id);
                if (!menu) return null;
                const subtotalBaris = menu.harga * item.jumlah;

                return (
                  <div key={item.id} className="cart-item-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid #fdf2f8', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <img 
                        src={menu.gambar} 
                        alt={menu.nama} 
                        style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: '0.75rem', border: '1px solid #fce7f3' }} 
                      />
                      <div>
                        <h4 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.2rem', fontSize: '1.05rem' }}>{menu.nama}</h4>
                        <p style={{ color: '#db2777', fontSize: '0.9rem', margin: 0, fontWeight: '500' }}>Rp {menu.harga.toLocaleString('id-ID')} / porsi</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #fbcfe8', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: '#fff' }}>
                        <button onClick={() => kurangQty(item.id)} style={{ padding: '0.4rem 0.8rem', background: '#fdf2f8', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#db2777' }}>-</button>
                        <span style={{ padding: '0 0.8rem', fontWeight: '600', color: '#374151' }}>{item.jumlah}</span>
                        <button onClick={() => tambahQty(item.id)} style={{ padding: '0.4rem 0.8rem', background: '#fdf2f8', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#db2777' }}>+</button>
                      </div>
                      <span style={{ fontWeight: 'bold', minWidth: '90px', textAlign: 'right', color: '#1f2937' }}>Rp {subtotalBaris.toLocaleString('id-ID')}</span>
                      <button onClick={() => hapusItem(item.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.5rem 0.85rem', borderRadius: '0.75rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', transition: 'background 0.2s' }}>
                        Hapus
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Kode Promo */}
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fff1f2', borderRadius: '1rem', border: '1px solid #fce7f3' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Punya Kode Promo?</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Masukkan kode promo"
                  value={kodePromo}
                  onChange={(e) => setKodePromo(e.target.value)}
                  className="input-style"
                />
                <button onClick={handlePakaiPromo} className="btn-card btn-card-active" style={{ width: 'auto', padding: '0.75rem 1.75rem', whiteSpace: 'nowrap' }}>
                  Pakai
                </button>
              </div>
              {pesanPromo && (
                <p style={{ fontSize: '0.875rem', marginTop: '0.75rem', fontWeight: '500', color: diskonPersen > 0 ? '#059669' : '#dc2626' }}>
                  {pesanPromo}
                </p>
              )}
            </div>

            {/* Cara Ambil */}
            <div style={{ marginTop: '1.75rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.75rem', color: '#374151' }}>Cara Pengambilan</label>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.25rem' }}>
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#4b5563' }}>
                  <input
                    type="radio"
                    name="caraAmbil"
                    value="ambil"
                    checked={caraAmbil === 'ambil'}
                    onChange={() => setCaraAmbil('ambil')}
                    style={{ accentColor: '#db2777' }}
                  />
                  Ambil sendiri (di kantin)
                </label>
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#4b5563' }}>
                  <input
                    type="radio"
                    name="caraAmbil"
                    value="diantar"
                    checked={caraAmbil === 'diantar'}
                    onChange={() => setCaraAmbil('diantar')}
                    style={{ accentColor: '#db2777' }}
                  />
                  Diantar (+Rp 2.000)
                </label>
              </div>

              {caraAmbil === 'diantar' && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.4rem', color: '#374151' }}>Kelas Tujuan</label>
                  <input
                    type="text"
                    placeholder=""
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="input-style"
                  />
                </div>
              )}
            </div>

            {/* Rincian Harga */}
            <div style={{ marginTop: '1.75rem', padding: '1.25rem', backgroundColor: '#fafafa', border: '1px solid #f3f4f6', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#4b5563' }}>
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              {diskonPersen > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#059669' }}>
                  <span>Diskon ({diskonPersen}%)</span>
                  <span>-Rp {nilaiDiskon.toLocaleString('id-ID')}</span>
                </div>
              )}
              {caraAmbil === 'diantar' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#4b5563' }}>
                  <span>Ongkos Kirim</span>
                  <span>Rp {ongkir.toLocaleString('id-ID')}</span>
                </div>
              )}
              <hr style={{ border: '0.5px solid #e5e7eb', margin: '0.75rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', color: '#db2777' }}>
                <span>Total Pembayaran</span>
                <span>Rp {totalBayar.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Form Pesan Sekarang */}
            <form onSubmit={handlePesanSekarang} style={{ marginTop: '1.75rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.4rem', color: '#374151' }}>Nama Pemesan</label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap (minimal 3 huruf)"
                  value={namaPemesan}
                  onChange={(e) => setNamaPemesan(e.target.value)}
                  className="input-style"
                />
              </div>

              <button type="submit" className="btn-card btn-card-active" style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: 'bold', width: '100%' }}>
                Pesan Sekarang ✨
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}