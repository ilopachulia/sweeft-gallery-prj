import React from "react";

interface CardProps {
  imageUrl: string;
  alt: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, alt }) => {
  return (
    <div className="h-60 w-full rounded overflow-hidden shadow-lg m-4 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
      <img
        className="h-full w-full object-cover"
        src={imageUrl}
        alt={alt}
        loading="lazy"
      />
    </div>
  );
};

export default Card;
