import Modal from "../../ui/Modal";


const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  amount,
  confirmText = "Ya, lanjutkan",
  cancelText = "Batalkan",
  isLoading = false,
  logo = "/logo.png",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-4" />
        {title && <p className="text-gray-700 mb-2">{title}</p>}
        {message && <p className="text-gray-700 mb-2">{message}</p>}
        {amount && (
          <p className="text-2xl font-bold mb-6">
            Rp {amount.toLocaleString("id-ID")} ?
          </p>
        )}
        <div className="space-y-3">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? "Memproses..." : confirmText}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
