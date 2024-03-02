import Card from "../components/Card";
import { useRef, useState, useCallback } from "react";
import useGallery from "../hooks/useGallery";
import { Image } from "../utils/interfaces";
import { useImages } from "../context/ImageContext";

function Home() {
  const [page, setPage] = useState(1);
  const { loading, error } = useGallery(page);
  const {images} = useImages();
  console.log("home images", images)

  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current && observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevNum) => prevNum + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching images</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-around">
          {(images as Image[]).map(
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
        <div ref={loadMoreRef}>{loading ? "Loading more..." : null}</div>
      </div>
    </>
  );
}

export default Home;
