
import { CheckCircle2, XCircle } from "lucide-react";
import Modal from "../../ui/Modal";

const ResultModal = ({
  isOpen,
  onClose,
  type = "success", 
  title,
  message,
  amount,
  buttonText = "Kembali ke Beranda",
}) => {
  const isSuccess = type === "success";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {isSuccess ? (
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        ) : (
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        )}

        {title && <p className="text-gray-700 mb-2">{title}</p>}

        {amount && (
          <p className="text-2xl font-bold mb-2">
            Rp {amount.toLocaleString("id-ID")}
          </p>
        )}

        {message && (
          <p
            className={`font-semibold mb-6 ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full text-red-500 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};

export default ResultModal;
