'use client';
import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [jumlahKeranjang, setJumlahKeranjang] = useState(0);

  useEffect(() => {
    // Fungsi untuk menghitung total item di keranjang dari localStorage
    const hitungJumlah = () => {
      try {
        const cartData = JSON.parse(localStorage.getItem('keranjang')) || [];
        const total = cartData.reduce((sum, item) => sum + item.jumlah, 0);
        setJumlahKeranjang(total);
      } catch (e) {
        setJumlahKeranjang(0);
      }
    };

    hitungJumlah();

    // Mendengarkan event kustom saat keranjang berubah
    window.addEventListener('keranjang-berubah', hitungJumlah);
    return () => {
      window.removeEventListener('keranjang-berubah', hitungJumlah);
    };
  }, []);

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Favorit', path: '/favorit' },
    { name: 'Keranjang', path: '/keranjang', badge: jumlahKeranjang },
    { name: 'Riwayat', path: '/riwayat' },
  ];

  return (
    <html lang="id">
      <body>
        <header>
          <div className="nav-container">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#db2777', margin: 0 }}>
              KantinKu 🍱
            </h1>
            <nav className="nav-links">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} style={{ position: 'relative' }}>
                  {item.name}
                  {item.badge > 0 && (
                    <span style={{
                      backgroundColor: '#db2777',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '9999px',
                      marginLeft: '4px',
                      verticalAlign: 'top'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}