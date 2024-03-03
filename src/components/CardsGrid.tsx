import { useState } from "react";
import { Image } from "../utils/interfaces";
import Card from "./Card";
import { api } from "../api/fetchPhotos";
import Modal from "./Modal";

function CardsGrid({ images }: { images: Image[] | null | undefined }) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [downloads, setDownloads] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [address, setAddress] = useState<string>("");

  const openModal = async (id: string, url: string) => {
    const image = await api.photos.getStats({ photoId: id }).then((result) => {
      return result.response;
    });
    setDownloads(image?.downloads.total as number);
    setViews(image?.views.total as number);
    setLikes(image?.likes.total as number);
    setAddress(url);
    setIsModalVisible(true);
  };

  return (
    <>
      <div
        className="flex flex-wrap justify-around"
        onClick={() => setIsModalVisible(false)}
      >
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
                  onClick={() => openModal(id, cloudinaryUrl)}
                >
                  <Card imageUrl={cloudinaryUrl} alt={alt_description} />
                </div>
              );
            }
          )}
      </div>
      {isModalVisible && (
        <Modal
          imageSrc={address}
          downloads={downloads}
          views={views}
          likes={likes}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
}

export default CardsGrid;
