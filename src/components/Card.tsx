import React from 'react';

interface CardProps {
    imageUrl: string;
    alt: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, alt }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-[300px] h-auto" src={imageUrl} alt={alt} />
        </div>
    );
};

export default Card;