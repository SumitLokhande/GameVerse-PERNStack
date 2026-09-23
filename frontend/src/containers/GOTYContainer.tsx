import { useEffect, useState } from "react";
import type { GOTYGameDetail } from "../types/authTypes";
import { Button } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart } from "../redux/Slices/cartSlice";
import { getGOTYGamesList } from "../redux/Slices/gamesSlice";

function GOTYContainer() {
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [activeImage, setActiveImage] = useState<string>();
  const [openSpecification, setOpenSpecification] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const GOTYList = useAppSelector((state) => state.games.allGOTYList);
  useEffect(() => {
    dispatch(getGOTYGamesList());
  }, [dispatch]);

  const years = Array.from(new Set(GOTYList.map((game) => game.year))).sort(
    (a, b) => b - a,
  );

  const filteredGames = GOTYList.filter((game) => game.year === selectedYear);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${i <= rating ? "text-yellow-400" : "text-gray-400"} fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }
    return stars;
  };

  useEffect(() => {
    const currentGame = GOTYList.find((game) => game.year === selectedYear);
    setActiveImage(currentGame?.images[0]);
  }, [selectedYear]);

  const showSpecification = () => {
    setOpenSpecification((prev) => !prev);
  };

  const addGameToCart = (game: GOTYGameDetail) => {
    const payload = {
      id: game.id,
      title: game.title,
      text: "game.text",
      image: game.images[0],
      images: game.images,
      platforms: game.platforms,
      rating: game.rating,
      price: game.price,
      discount: game.discount,
      description: game.description,
      genre: game.genre,
      quantity: 1,
    };
    dispatch(addToCart(payload));
  };

  return (
    <div className="bg-gray-900 p-4 text-white sm:p-6">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-yellow-400 sm:text-3xl">
          Game of the Year
        </h2>
        <p className="text-gray-300">
          Celebrating the best games that defined gaming excellence
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-6 sm:py-3 ${
                selectedYear === year
                  ? "bg-yellow-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {filteredGames.map((game) => (
          <div key={game.id} className="rounded-xl p-3 shadow-2xl sm:p-4">
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center">
              <div className="w-full text-center lg:w-2/3 lg:text-left">
                <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <svg
                    className="mr-0 h-10 w-10 text-yellow-300 sm:mr-3 sm:h-12 sm:w-12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">
                      {game.title}
                    </h3>
                    <p className="text-lg font-semibold text-yellow-200">
                      Game of the Year {game.year}
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-base text-white/90 sm:text-lg">
                  {game.description}
                </p>

                <div className="my-2 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {game.awards.map((award, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white"
                    >
                      {award}
                    </span>
                  ))}
                </div>

                <div className="my-4 flex flex-col gap-3 text-sm sm:text-base lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                    <span className="text-white/80">Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(game.rating)}
                      <span className="font-semibold text-white">
                        ({game.rating})
                      </span>
                    </div>
                  </div>
                  <span className="text-white/80">
                    Developer: {game.developer}
                  </span>
                  <span className="font-semibold text-white">
                    ₹ {game.price}
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div
                    className="w-full cursor-pointer rounded-md bg-amber-500 p-2 text-center text-base font-bold text-slate-900 sm:w-1/3"
                    onClick={() => showSpecification()}
                  >
                    Show Specification
                  </div>
                  <Button
                    className="w-full rounded-md bg-green-700 p-2 text-xs font-semibold text-white sm:w-1/4"
                    onClick={() => addGameToCart(game)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="w-full lg:w-auto">
                <div className="w-full p-2">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={activeImage}
                    alt={game.title}
                    className="h-64 w-full rounded-lg object-cover shadow-lg sm:h-80 lg:h-90"
                  />
                </div>
                <div className="flex items-center justify-around gap-2 p-1">
                  {game.images.map((image) => (
                    <img
                      loading="lazy"
                      decoding="async"
                      src={image}
                      alt={game.title}
                      className={`h-16 w-full cursor-pointer rounded-lg object-cover shadow-lg sm:h-20 ${activeImage === image && "border-b-3 border-green-700 shadow-2xl"}`}
                      onClick={() => setActiveImage(image)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="m-2 flex flex-col items-start">
              {openSpecification && (
                <>
                  {Object.entries(game.recommendedSystemRequirements).map(
                    ([option, value]) => (
                      <div key={option} className="text-sm sm:text-base">
                        <span className="text-lg font-bold">
                          {`${option.toUpperCase()}: `}
                        </span>

                        <span className="text-gray-500">{value}</span>
                      </div>
                    ),
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GOTYContainer;
