'use client';
import { useState, useEffect } from 'react';

export default function RiwayatPage() {
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('riwayat')) || [];
      setRiwayat(data);
    } catch (e) {
      setRiwayat([]);
    }
  }, []);

  const totalSemuaBelanja = riwayat.reduce((sum, item) => sum + item.total, 0);

  const handleHapusRiwayat = () => {
    if (confirm('Apakah kamu yakin ingin menghapus seluruh riwayat pesanan?')) {
      localStorage.removeItem('riwayat');
      setRiwayat([]);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#db2777', marginBottom: '0.5rem' }}>
          Riwayat Pesanan 📜
        </h2>
        <p style={{ color: '#4b5563', margin: 0 }}>
          Daftar pesanan yang pernah kamu buat di KantinKu.
        </p>
      </div>

      {riwayat.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', margin: 0 }}>
            Belum ada pesanan.
          </p>
        </div>
      ) : (
        <div>
          <div style={{ 
            backgroundColor: '#fff1f2', 
            border: '1px solid #fce7f3', 
            borderRadius: '1rem', 
            padding: '1.25rem 1.5rem', 
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            color: '#374151',
            fontWeight: '600'
          }}>
            <div>
              <span>Total Pesanan: {riwayat.length} pesanan</span>
              <span style={{ margin: '0 0.5rem' }}>•</span>
              <span style={{ color: '#db2777' }}>Total Belanja: Rp {totalSemuaBelanja.toLocaleString('id-ID')}</span>
            </div>
            <button 
              onClick={handleHapusRiwayat}
              style={{
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Hapus Riwayat 🗑️
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {riwayat.map((pesanan) => (
              <div key={pesanan.idPesanan} className="card" style={{ textAlign: 'left', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid #fdf2f8', paddingBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                      Pemesan: {pesanan.nama}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                      {pesanan.tanggal} • {pesanan.pengiriman}
                    </p>
                  </div>
                  <span className="badge" style={{ backgroundColor: '#d1fae5', color: '#065f46' }}>
                    Selesai ✨
                  </span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0', color: '#4b5563' }}>
                  {pesanan.item.map((it, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', fontSize: '0.95rem' }}>
                      <span>{it.nama} (x{it.jumlah})</span>
                      <span style={{ fontWeight: '500' }}>Rp {it.subtotalBaris.toLocaleString('id-ID')}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ fontSize: '0.9rem', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '0.2rem', borderTop: '1px dashed #f3f4f6', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal:</span>
                    <span>Rp {pesanan.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  {pesanan.diskon > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                      <span>Diskon:</span>
                      <span>-Rp {pesanan.diskon.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  {pesanan.ongkir > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Ongkir:</span>
                      <span>Rp {pesanan.ongkir.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.05rem', color: '#db2777', marginTop: '0.4rem' }}>
                    <span>Total Pembayaran:</span>
                    <span>Rp {pesanan.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}