import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useRef, useState, useCallback } from "react";
import useGallery from "../hooks/useGallery";

interface Image {
  id: string;
  urls: {
    full: string;
  };
  alt_description: string;
}

function Home() {
  const [page, setPage] = useState(1);
  const { isLoading, isError, images } = useGallery(page);

  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current && observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevNum) => prevNum + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching images</div>;
  }

  console.log("images", images);

  const onChangeHandler = () => {
    console.log("trulaila");
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
        <Link
          to="/history"
          className="hover:text-orange-200 focus:cursor-pointer"
        >
          History
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-around">
        {(images as Image[]).map(({ id, urls, alt_description }: Image) => {            
              return (
                <div key={id} className="p-4">
                  <Card imageUrl={urls.full} alt={alt_description} />
                </div>
              );
          })}
        </div>
        <div ref={loadMoreRef}>
          {isLoading ? "Loading more..." : null}
        </div>
      </div>
    </>
  );
}

export default Home;
