import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Image } from '../utils/interfaces';

interface ImageContextProps {
    images: Image[];
    setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}

 const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const useImages = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImages must be used within a ImageProvider');
    }
    return context;
};

export const ImageProvider = ({ children }: {children: ReactNode}) => {
    const [images, setImages] = useState<Image[]>([]);
    return (
        <ImageContext.Provider value={{ images, setImages }}>
            {children}
        </ImageContext.Provider>
    )
};
