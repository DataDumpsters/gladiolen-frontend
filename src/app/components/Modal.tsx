import React from "react";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  width?: string;
}

const Modal = ({ isOpen, children, width }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className={`bg-white p-8 rounded-xl shadow-lg ${width}`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
