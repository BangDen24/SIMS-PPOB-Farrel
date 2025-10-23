import { EyeIcon } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";

const BalanceCard = ({ balance, showBalance }) => {

  const [isShowBalance, setShowBalance] = useState(showBalance ?? false);

  const toggleShowBalance = () => setShowBalance((prev) => !prev);

  return (
    <div className="bg-red-500 rounded-lg shadow-md p-6 mb-6 text-white flex flex-col gap-2 justify-center">
      <h2 className="text-md text-green">Saldo anda</h2>
      <p className="text-2xl font-semibold">
        Rp{" "}
        {isShowBalance
          ? typeof balance?.data?.balance === "number"
            ? balance.data.balance.toLocaleString("id-ID")
            : balance?.data?.balance ?? "-"
          : Array.from({ length: 8 }).fill("•").join("")}
      </p>
      <button
        type="button"
        onClick={toggleShowBalance}
        aria-pressed={isShowBalance}
        aria-label={isShowBalance ? "Tutup saldo" : "Lihat saldo"}
        className="text-sm mt-2 hover:font-semibold flex gap-2 items-center focus:outline-none"
      >
        {isShowBalance ? "Tutup saldo" : "Lihat Saldo"}
        {isShowBalance ? <EyeOff size={14} /> : <EyeIcon size={14} />}
      </button>
    </div>
  );
};

export default BalanceCard;