import { useEffect, useState } from "react";
import { NUMBER_OF_IMAGES_PER_PAGE } from "../utils/constants";
import { useImages } from "../context/ImageContext";
import { api } from "../api/fetchPhotos";
import { Image } from "../utils/interfaces";


const useGallery = (pageNumber = 1) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { images, setImages } = useImages();


  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchImages = async () => {
      try {
        const fetchedImages = await api.photos.list({ page: pageNumber, perPage: NUMBER_OF_IMAGES_PER_PAGE})
        setImages((prev: Image[] | undefined) => [...(prev as Image[]), ...(fetchedImages.response?.results as Image[])]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

  }, [pageNumber]);

  return { loading, error, images,  };
};

export default useGallery;
