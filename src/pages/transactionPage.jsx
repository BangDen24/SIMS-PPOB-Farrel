import { useState } from "react";
import moment from "moment";
import BalanceCard from "../components/features/homepage/balanceCard";
import ProfileCard from "../components/features/homepage/profileCard";
import { useGetBalanceQuery } from "../store/services/balanceApi";
import { useGetProfileQuery } from "../store/services/profileApi";
import { useGetTransactionHistoryQuery } from "../store/services/transactionApi";

const TransactionPage = () => {
  const [limit, setLimit] = useState(5);
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const { data: balance, isLoading: balanceLoading } = useGetBalanceQuery();
  const { data: transactionHistory, isLoading: transactionHistoryLoading } =
    useGetTransactionHistoryQuery({ limit });

  const records = transactionHistory?.data?.records || [];

  const handleShowMore = () => {
    setLimit((prev) => prev + 5);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-8 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6 pr-[10%] items-center">
          {profileLoading ? (
            <div className="md:col-span-2 bg-gray-200 rounded-lg h-32 animate-pulse" />
          ) : (
            <div className="md:col-span-2">
              <ProfileCard profile={profile} />
            </div>
          )}

          {balanceLoading ? (
            <div className="md:col-span-3 bg-gray-200 rounded-lg h-32 animate-pulse" />
          ) : (
            <div className="md:col-span-3">
              <BalanceCard balance={balance} showBalance={true} />
            </div>
          )}
        </div>

        <p className="font-semibold mb-4">Semua Transaksi</p>
        <div className="pr-[10%]">
          {transactionHistoryLoading ? (
            <div className="mt-4 space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg h-12 animate-pulse"
                />
              ))}
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Maaf tidak ada histori transaksi saat ini</p>
            </div>
          ) : (
            <>
              <div className="mt-4 space-y-4">
                {records.map((transaction) => (
                  <div
                    key={transaction.invoice_number}
                    className="border border-gray-200 shadow-sm rounded-lg px-4 py-2"
                  >
                    <div className="flex justify-between">
                      {transaction.transaction_type === "TOPUP" ? (
                        <p className="text-green-500 font-semibold">
                          + Rp{" "}
                          {transaction.total_amount.toLocaleString("id-ID")}
                        </p>
                      ) : (
                        <p className="text-red-500 font-semibold">
                          - Rp{" "}
                          {transaction.total_amount.toLocaleString("id-ID")}
                        </p>
                      )}
                      <p className="text-sm">{transaction.description}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {moment(transaction.created_on).format(
                        "DD MMMM YYYY HH:mm"
                      )}{" "}
                      WIB
                    </p>
                  </div>
                ))}
              </div>

              {records.length === limit && (
                <button
                  onClick={handleShowMore}
                  className="mt-4 w-full py-2 text-red-500 font-semibold hover:underline"
                >
                  Show more
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
