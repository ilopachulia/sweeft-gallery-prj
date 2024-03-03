import React from "react";

interface ModalProps {
  imageSrc: string;
  downloads: number;
  views: number;
  likes: number;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  imageSrc,
  downloads,
  views,
  likes,
  onClose,
}) => {
  
    const onCloseHandler = () => {
    onClose();
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 rounded shadow-lg relative w-[500px] h-96 flex justify-start">
        <img
          src={imageSrc}
          alt="Modal Image"
          className="w-1/2 h-full object-cover mr-3"
        />
        <div className="modal-info">
          <p>Downloads: {downloads}</p>
          <p>Views: {views}</p>
          <p>Likes: {likes}</p>
        </div>
        <button className="absolute top-0 right-0 m-2" onClick={onCloseHandler}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
