import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <h2 className="modalTitle">Kullanıcıyı silmek istediğinize emin misiniz?</h2>
        <button className="confirmButton" onClick={onConfirm}>Sil</button>
        <button className="cancelButton" onClick={onClose}>İptal</button>
      </div> 
    </div>
  )
}
