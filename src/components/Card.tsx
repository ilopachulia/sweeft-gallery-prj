import React from "react";

interface CardProps {
  imageUrl: string;
  alt: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, alt }) => {
  const cloudinaryUrl = `https://res.cloudinary.com/dlncc1m55/image/fetch/w_500,h_500,c_fill,g_auto,f_auto/${imageUrl}`;

  return (
    <div className="h-40 w-full rounded overflow-hidden shadow-lg m-4 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
      <img
        className="h-full w-full object-cover"
        src={cloudinaryUrl}
        alt={alt}
        loading="lazy"
      />
    </div>
  );
};

export default Card;
