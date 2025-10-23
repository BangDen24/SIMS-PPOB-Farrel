import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="/logo.png" alt="SIMS PPOB" className="w-12 h-12" />
          <h2 className="text-2xl font-bold">SIMS PPOB</h2>
        </div>

        <h1 className="text-8xl md:text-9xl font-bold text-red-500 mb-4">
          404
        </h1>

        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Halaman Tidak Ditemukan
        </h3>
        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-md"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
