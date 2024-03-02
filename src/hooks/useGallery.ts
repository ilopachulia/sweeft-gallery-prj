import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {fetchGallery} from "../api/fetchGallery";
import { NUMBER_OF_IMAGES_PER_PAGE } from "../utils/constants";


const useGallery = (pageNumber = 1) => {
  const { data: images, refetch, isLoading, isError } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => await fetchGallery(pageNumber, NUMBER_OF_IMAGES_PER_PAGE),
  });


  useEffect(() => {
    refetch();
  }, [pageNumber]);

  return { isLoading, isError, images };
};

export default useGallery;
