import { useEffect, useState } from "react";
import { fetchGallery } from "../api/fetchGallery";

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await fetchGallery();
      setImages(data);
    };
    fetchImages();
  }, [])

  const onChangeHandler = async () => {
    const data = await fetchGallery();
    console.log(data);
    setImages(data);
  };

  return (
    <>
      <input type="search" onChange={onChangeHandler} />
      {images.map((image) => {
        return (
          <div
            key={image.id}
            style={{
              width: "50px",
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img src={image.urls.regular} alt={image.alt_description} />
          </div>
        );
      })}
    </>
  );
}

export default Home;
