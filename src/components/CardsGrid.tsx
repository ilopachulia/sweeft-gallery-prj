import { useState } from "react";
import { Image } from "../utils/interfaces";
import Card from "./Card";
import { api } from "../api/fetchPhotos";

function CardsGrid({ images }: { images: Image[] | null | undefined }) {
  const [imageModal, setImageModal] = useState<Image | null>(null);

  const openModal = async(id: string) => {
    const image = await api.photos.getStats({ photoId: id }).then((res) => {
      console.log("stats", res);
    });
    console.log("image?", image);
  };

  return (
    <div className="flex flex-wrap justify-around">
      {images &&
        (images as Image[]).map(
          ({ id, urls, alt_description }: Image, index: number) => {
            // using index as a key is not good practice due to performance issues
            // but id and images are not unique so we can't use them as a key
            const cloudinaryUrl = `https://res.cloudinary.com/dlncc1m55/image/fetch/w_500,h_500,c_fill,g_auto,f_auto/${urls.full}`;
            return (
              <div
                key={id + index}
                className="p-4"
                onClick={() => openModal(id)}
              >
                <Card imageUrl={cloudinaryUrl} alt={alt_description} />
              </div>
            );
          }
        )}
    </div>
  );
}

export default CardsGrid;
