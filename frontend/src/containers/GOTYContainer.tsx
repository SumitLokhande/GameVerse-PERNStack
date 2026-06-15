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
    <div className="bg-gray-900 text-white p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">
          Game of the Year
        </h2>
        <p className="text-gray-300">
          Celebrating the best games that defined gaming excellence
        </p>
      </div>

      {/* Year Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
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

      {/* GOTY Winners */}
      <div className="space-y-8">
        {filteredGames.map((game) => (
          <div key={game.id} className=" p-4 rounded-xl shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="lg:w-2/3 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <svg
                    className="w-12 h-12 text-yellow-300 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold text-white">
                      {game.title}
                    </h3>
                    <p className="text-yellow-200 text-lg font-semibold">
                      Game of the Year {game.year}
                    </p>
                  </div>
                </div>

                <p className="text-white/90 text-lg mb-4">{game.description}</p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2 my-2">
                  {game.awards.map((award, index) => (
                    <span
                      key={index}
                      className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {award}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-center lg:justify-between space-x-6 my-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-white/80">Rating:</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(game.rating)}
                      <span className="text-white font-semibold">
                        ({game.rating})
                      </span>
                    </div>
                  </div>
                  <span className="text-white/80">
                    Developer: {game.developer}
                  </span>
                  <span className="text-white font-semibold">
                    ₹ {game.price}
                  </span>
                </div>
                <div className="flex items-end justify-between mt-8">
                  <div
                    className="font-bold text-lg cursor-pointer rounded-md p-1 bg-amber-500 w-1/3 text-center"
                    onClick={() => showSpecification()}
                  >
                    Show Specification
                  </div>
                  <Button
                    className="rounded-md cursor-pointer bg-green-700 w-1/4 p-2 text-xs font-semibold text-white"
                    onClick={() => addGameToCart(game)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div>
                <div className="w-full p-2">
                  <img
                    src={activeImage}
                    alt={game.title}
                    className="w-full h-90 object-fit rounded-lg shadow-lg"
                  />
                </div>
                <div className=" flex items-center justify-around gap-2 p-1 w-2xl">
                  {game.images.map((image) => (
                    <img
                      src={image}
                      alt={game.title}
                      className={`w-full h-18 object-cover rounded-lg shadow-lg cursor-pointer ${activeImage === image && "border-green-700 border-b-3 shadow-2xl"}`}
                      onClick={() => setActiveImage(image)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start m-2">
              {openSpecification && (
                <>
                  {Object.entries(game.recommendedSystemRequirements).map(
                    ([option, value]) => (
                      <div key={option}>
                        <span className="font-bold text-lg">
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
