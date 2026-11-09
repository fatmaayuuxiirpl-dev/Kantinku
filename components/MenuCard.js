import Link from 'next/link';

export default function MenuCard({ item }) {
  const isHabis = item.stok === 0;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-pink-100 text-pink-600 rounded-full">
            {item.kategori}
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              isHabis
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {isHabis ? 'Habis' : `Stok: ${item.stok}`}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{item.nama}</h3>
        <p className="text-pink-600 font-semibold mb-4">
          Rp {item.harga.toLocaleString('id-ID')}
        </p>
      </div>

      <Link
        href={`/menu/${item.id}`}
        className="text-center bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 rounded-xl transition-colors block"
      >
        Lihat Detail
      </Link>
    </div>
  );
}