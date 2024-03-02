import { useState } from "react";
import { useQueries } from "../context/QueryContext";
import { Image } from "../utils/interfaces";
import Card from "../components/Card";

function History() {
const { queries } = useQueries();
const [images, setImages] = useState<Image[] | null>();
if (queries.length === 0) return null;

const getStoredImages = (query: string) => {
    const storedImages = localStorage.getItem(query);
    setImages(JSON.parse(storedImages as string));
};

console.log('navbar', images)
  return (
    <div className="flex flex-col items-center">
     <div className="flex flex-row flex-wrap">
        {queries.map(
          (query: string) =>
            query.trim() !== "" && (
              <div
                key={query}
                className="bg-gray-200 p-2 m-2 rounded-md w-30 text-center"
                onClick={() => getStoredImages(query)}
              >
                {query}
              </div>
            )
        )}
      </div>
      <div className="flex flex-wrap justify-around">
        {images && (images as Image[]).map(
          ({ id, urls, alt_description }: Image, index: number) => {
            // using index as a key is not good practice due to performance issues
            // but id and images are not unique so we can't use them as a key
            const cloudinaryUrl = `https://res.cloudinary.com/dlncc1m55/image/fetch/w_500,h_500,c_fill,g_auto,f_auto/${urls.full}`;
            return (
              <div key={id + index} className="p-4">
                <Card imageUrl={cloudinaryUrl} alt={alt_description} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default History;
