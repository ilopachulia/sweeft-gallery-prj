import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useImages } from "../context/ImageContext";
import { fetchGallery } from "../api/fetchGallery";
import { useQueries } from "../context/QueryContext";

const NavBar = () => {
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [query, setQuery] = useState("");
  const { setImages } = useImages();
  const { setQueries } = useQueries();

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchGallery(1, 10, query);
      setImages(images);
      setQueries((prevQueries) => [...new Set([query, ...prevQueries])]);
      localStorage.setItem(query, JSON.stringify(images));
      setQuery("");
    };

    fetchImages();
  }, [query]);

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setQuery(value);
    }, 800);
  };
  return (
    <nav>
      <div className="flex justify-between items-center">
        <input
          type="search"
          onChange={onChangeHandler}
          className="w-1/4 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          placeholder="Search..."
        />
        <div>
          <Link
            to="/"
            className="hover:text-orange-200 focus:cursor-pointer mr-4"
          >
            Gallery
          </Link>
          <Link
            to="/history"
            className="hover:text-orange-200 focus:cursor-pointer"
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
