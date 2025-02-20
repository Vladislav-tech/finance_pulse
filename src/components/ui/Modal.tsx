import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-md p-6 rounded-2xl 
        bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-xl
        border border-purple-500/30 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            title="Закрыть"
            className="p-1 rounded-lg hover:bg-purple-500/20 transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
        <div className="text-purple-100">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
