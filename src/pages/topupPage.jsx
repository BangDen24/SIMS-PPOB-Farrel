import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBalanceQuery } from "../store/services/balanceApi";
import { useTopUpMutation } from "../store/services/balanceApi";
import BalanceCard from "../components/features/homepage/balanceCard";
import ConfirmationModal from "../components/features/paymentpage/confirmationModal";
import ResultModal from "../components/features/paymentpage/resultModal";
import { useGetProfileQuery } from "../store/services/profileApi";
import ProfileCard from "../components/features/homepage/profileCard";

const TopupPage = () => {
  const navigate = useNavigate();
  const { data: balance, isLoading: balanceLoading } = useGetBalanceQuery();
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const [topUp, { isLoading }] = useTopUpMutation();

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [topUpResult, setTopUpResult] = useState(null);

  const amounts = [10000, 20000, 50000, 100000, 250000, 500000];
  const activeAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleTopUp = async () => {
    if (!activeAmount || activeAmount < 10000) {
      alert("Minimal top up adalah Rp 10.000");
      return;
    }

    try {
      await topUp(activeAmount).unwrap();
      setTopUpResult("success");
      setShowConfirm(false);
      setSelectedAmount(null);
      setCustomAmount("");
    } catch {
      setTopUpResult("error");
      setShowConfirm(false);
    }
  };

  const handleCloseResult = () => {
    if (topUpResult === "success") {
      navigate("/");
    } else {
      setTopUpResult(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 md:p-6 lg:p-8 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 mb-6 lg:pr-[10%]">
          {profileLoading ? (
            <div className="lg:col-span-2 bg-gray-200 rounded-lg h-32 animate-pulse" />
          ) : (
            <div className="lg:col-span-2">
              <ProfileCard profile={profile} />
            </div>
          )}

          {balanceLoading ? (
            <div className="lg:col-span-3 bg-gray-200 rounded-lg h-32 animate-pulse" />
          ) : (
            <div className="lg:col-span-3">
              <BalanceCard balance={balance} showBalance={true} />
            </div>
          )}
        </div>

        <div className="mb-6 lg:pr-[10%]">
          <h2 className="text-md">Silahkan masukkan</h2>
          <p className="text-xl font-semibold">Nominal Top Up</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start lg:pr-[10%]">
          <div className="space-y-2 md:col-span-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                Rp
              </span>
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="masukkan nominal top up"
                className="w-full border border-gray-300 rounded-md py-3 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              onClick={() => setShowConfirm(true)}
              disabled={!activeAmount || activeAmount < 10000}
              className="w-full bg-red-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Top Up
            </button>

            <p className="text-sm text-gray-500 text-center">
              Minimal top up adalah Rp 10.000
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 content-start md:col-span-2">
            {amounts.map((amount) => (
              <button 
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`py-4 px-4 border rounded-md font-semibold transition-colors ${
                  selectedAmount === amount
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                Rp {amount.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirm && !topUpResult}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleTopUp}
        message="Anda yakin untuk Top Up sebesar"
        amount={activeAmount}
        confirmText="Ya, lanjutkan Top Up"
        isLoading={isLoading}
      />

      <ResultModal
        isOpen={!!topUpResult}
        onClose={handleCloseResult}
        type={topUpResult}
        title="Top Up sebesar"
        amount={activeAmount}
        message={topUpResult === "success" ? "berhasil!" : "gagal"}
        buttonText="Kembali ke Beranda"
      />
    </div>
  );
};

export default TopupPage;