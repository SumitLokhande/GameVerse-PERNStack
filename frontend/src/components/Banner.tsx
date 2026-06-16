import { useEffect, useRef, useState } from "react";
import { Button } from "@headlessui/react";
import type { GameDetail } from "../types/authTypes";
import { addToCart } from "../redux/Slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getLatestGamesList } from "../redux/Slices/gamesSlice";

const Banner = () => {
  const dispatch = useAppDispatch();
  const latestGamesList = useAppSelector((state) => state.games.latestGames);
  const [selectedNav, setSelectedNav] = useState<number | null>(null);
  const SLIDE_DURATION = 5000;

  useEffect(() => {
    dispatch(getLatestGamesList());
  }, [dispatch]);

  useEffect(() => {
    if (latestGamesList.length > 0 && selectedNav === null) {
      setSelectedNav(latestGamesList[0].id);
    }
  }, [latestGamesList, selectedNav]);

  const currentItem: GameDetail | null =
    latestGamesList.find((item) => item.id === selectedNav) ||
    latestGamesList[0] ||
    null;

  const timerRef = useRef<number | null>(null);

  const startAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setSelectedNav((prevId) => {
        const currentIndex = latestGamesList.findIndex(
          (game) => game.id === prevId,
        );

        const nextIndex =
          currentIndex === latestGamesList.length - 1 ? 0 : currentIndex + 1;

        return latestGamesList[nextIndex].id;
      });
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleGameSelect = (id: number) => {
    setSelectedNav(id);

    // restart countdown from selected item
    startAutoSlide();
  };

  const buyGame = () => {
    const payload = {
      ...currentItem,
      quantity: 1,
    };
    dispatch(addToCart(payload));
  };

  return (
    <div className="flex h-150 py-2">
      <div className="w-1/4 p-6 mx-2 flex flex-col justify-center">
        <ul className="space-y-4">
          {latestGamesList.map((game) => (
            <li key={game.id}>
              <button
                onClick={() => handleGameSelect(game.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  selectedNav === game.id
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {game.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 relative overflow-hidden rounded-xl shadow-2xl">
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className="w-full h-full object-cover transition-all duration-500"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-end">
          <div className="text-start text-white bg-transparent/10 backdrop-blur-xl p-4 shadow-2xl w-full">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-8 drop-shadow-lg px-2">
                  {currentItem.text}
                </h2>

                <div>
                  {currentItem.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center rounded-md bg-black/50 mx-1 px-2 py-1 text-sm font-medium"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="my-1">
                  <span className="font-bold">Price:</span>
                  {` ₹ ${currentItem.price}`}
                </div>

                <Button
                  onClick={() => buyGame()}
                  className="inline-flex items-center gap-2 rounded-md cursor-pointer bg-green-700 px-4 mx-1 py-1.5 text-sm font-semibold text-white"
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
