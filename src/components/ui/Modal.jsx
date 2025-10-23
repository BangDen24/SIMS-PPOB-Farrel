import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, showCloseButton = false } ) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-blur flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;