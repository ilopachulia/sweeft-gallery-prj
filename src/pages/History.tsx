import { useEffect, useState } from "react";
import { useQueries } from "../context/QueryContext";
import { Image } from "../utils/interfaces";
import CardsGrid from "../components/CardsGrid";

function History() {
  const { queries } = useQueries();
  const [images, setImages] = useState<Image[] | null>();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const getStoredImages = (query: string) => {
    const storedImages = localStorage.getItem(query);
    setImages(JSON.parse(storedImages as string));
  };

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
      <CardsGrid images={images} />
    </div>
  );
}

export default History;
