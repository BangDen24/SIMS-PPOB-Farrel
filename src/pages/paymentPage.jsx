import { useParams, useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "../store/services/serviceApi";
import { useGetBalanceQuery } from "../store/services/balanceApi";
import { useGetProfileQuery } from "../store/services/profileApi";
import { useCreateTransactionMutation } from "../store/services/transactionApi";
import { useState } from "react";
import ProfileCard from "../components/features/homepage/profileCard";
import BalanceCard from "../components/features/homepage/balanceCard";
import ConfirmationModal from "../components/features/paymentpage/confirmationModal";
import ResultModal from "../components/features/paymentpage/resultModal";
const PaymentPage = () => {
  const { serviceCode } = useParams();
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const { data: balance, isLoading: balanceLoading } = useGetBalanceQuery();
  const { data: services, isLoading: loadingServices } = useGetServicesQuery();
  const [createTransaction, { isLoading: loadingPayment }] =
    useCreateTransactionMutation();

  const [showConfirm, setShowConfirm] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const service = services?.data?.find((s) => s.service_code === serviceCode);

  if (profileLoading || balanceLoading || loadingServices) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-semibold">Service tidak ditemukan</p>
          <button
            onClick={() => navigate("/")}
            className="text-sm underline mt-2 hover:text-red-800"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  const currentBalance = balance?.data?.balance || 0;
  const serviceTariff = service.service_tariff;
  const isBalanceSufficient = currentBalance >= serviceTariff;

  const handlePayment = async () => {
    try {
      await createTransaction(serviceCode).unwrap();
      setPaymentResult("success");
    } finally {
      setShowConfirm(false);
    }
  };

  const handleCloseResult = () => {
    if (paymentResult === "success") {
      navigate("/");
    } else {
      setPaymentResult(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 md:p-6 lg:p-8 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 mb-6 lg:pr-[10%]">
          <div className="lg:col-span-2">
            <ProfileCard profile={profile} />
          </div>
          <div className="lg:col-span-3">
            <BalanceCard balance={balance} showBalance={true} />
          </div>
        </div>

        <div className="max-w-2xl mx-auto lg:pr-[10%]">
          <p className="text-sm text-gray-600 mb-2">Pembayaran</p>
          <div className="flex items-center gap-3 mb-6">
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="w-8 h-8"
            />
            <h2 className="text-xl font-bold">{service.service_name}</h2>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={`Rp ${serviceTariff.toLocaleString("id-ID")}`}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-semibold text-lg cursor-not-allowed"
            />
          </div>

          {!isBalanceSufficient && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
              <p className="text-sm font-medium mb-2">
                Saldo tidak cukup untuk pembayaran ini
              </p>
              <button
                onClick={() => navigate("/topup")}
                className="text-sm underline font-semibold hover:text-yellow-900"
              >
                Top Up Sekarang →
              </button>
            </div>
          )}

          <button
            onClick={() => setShowConfirm(true)}
            disabled={!isBalanceSufficient}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Bayar
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirm && !paymentResult}
        onClose={() => setShowConfirm(false)}
        onConfirm={handlePayment}
        message={`Beli ${service.service_name} senilai`}
        amount={serviceTariff}
        confirmText="Ya, lanjutkan Bayar"
        isLoading={loadingPayment}
      />

      <ResultModal
        isOpen={!!paymentResult}
        onClose={handleCloseResult}
        type={paymentResult}
        title={`Pembayaran ${service.service_name} sebesar`}
        amount={serviceTariff}
        message={paymentResult === "success" ? "berhasil!" : "gagal"}
        buttonText="Kembali ke Beranda"
      />
    </div>
  );
};

export default PaymentPage;
