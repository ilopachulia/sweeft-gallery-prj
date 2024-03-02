import { useEffect, useState } from "react";
import {fetchGallery} from "../api/fetchGallery";
import { NUMBER_OF_IMAGES_PER_PAGE } from "../utils/constants";
import { useImages } from "../context/ImageContext";


const useGallery = (pageNumber = 1) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { images, setImages } = useImages();


  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchImages = async () => {
      try {
        const fetchedImages = await fetchGallery(pageNumber, NUMBER_OF_IMAGES_PER_PAGE);
        setImages((prev) => [...prev, ...fetchedImages]);
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
