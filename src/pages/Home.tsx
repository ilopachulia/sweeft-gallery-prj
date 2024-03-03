import { useRef, useState, useCallback } from "react";
import useGallery from "../hooks/useGallery";
import { useImages } from "../context/ImageContext";
import CardsGrid from "../components/CardsGrid";

function Home() {
  const [page, setPage] = useState(1);
  const { loading, error } = useGallery(page);
  const {images} = useImages();

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
          <CardsGrid images={images} />
        <div ref={loadMoreRef}>{loading ? "Loading more..." : null}</div>
      </div>
    </>
  );
}

export default Home;
