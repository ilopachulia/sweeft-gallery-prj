import { fetchGallery } from "../api/fetchGallery";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect, RefObject } from "react";

interface Image {
  id: string;
  urls: {
    full: string;
  };
  alt_description: string;
}

function Home() {
  const {
    data: images,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["gallery"],
    queryFn: async ({ pageParam = 1 }) => await fetchGallery(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    initialPageParam: 1,
  });

  const loadMoreRef = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef && loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [fetchNextPage]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching images</div>;
  }

  console.log("images", images.pages);

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
          {images.pages.map((page: Image[], pageIndex: number) =>
            page.map(({ id, urls, alt_description }: Image) => (
              <div key={`${id}-${pageIndex}`} className="p-4">
                <Card imageUrl={urls.full} alt={alt_description} />
              </div>
            ))
          )}
        </div>
        <div ref={loadMoreRef}>
          {isFetchingNextPage ? "Loading more..." : null}
        </div>
      </div>
    </>
  );
}

export default Home;
