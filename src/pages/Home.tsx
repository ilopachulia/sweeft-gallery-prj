import { useEffect, useState } from "react";
import { fetchGallery } from "../api/fetchGallery";
import Card from "../components/Card";
import { Link } from "react-router-dom";

interface Image {
  id: string;
  urls: {
    full: string;
  };
  alt_description: string;
}

function Home() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await fetchGallery();
      setImages(data);
    };
    fetchImages();
  }, []);

  const onChangeHandler = async () => {
    const data = await fetchGallery();
    console.log(data);
    setImages(data);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <input
          type="search"
          onChange={onChangeHandler}
          className="w-1/4 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          placeholder="Search..."
        />
        <Link to="/history" className="hover:text-orange-200 focus:cursor-pointer">History</Link>
      </div>
      <div className="flex flex-wrap">
        {images.map(({ id, urls, alt_description }) => {
          return (
            <div key={id} className="p-4">
              <Card imageUrl={urls.full} alt={alt_description} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
