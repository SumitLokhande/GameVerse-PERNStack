import { Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@headlessui/react";
import type { GameDetail } from "../types/authTypes";
import { addToCart } from "../redux/Slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getLatestGamesList } from "../redux/Slices/gamesSlice";
import LazyImg from "../common/LazyImg";

const Banner = () => {
  const dispatch = useAppDispatch();
  const latestGamesList = useAppSelector((state) => state.games.latestGames);
  const [selectedNav, setSelectedNav] = useState<number | null>(null);
  const [currentItem, setCurrentItem] = useState<GameDetail | null>(
    latestGamesList.length > 0
      ? latestGamesList.find((item) => item.id === selectedNav) ||
          latestGamesList[0]
      : latestGamesList[0],
  );
  // const SLIDE_DURATION = 5000;

  useEffect(() => {
    dispatch(getLatestGamesList());
  }, [dispatch]);

  useEffect(() => {
    if (latestGamesList.length > 0 && selectedNav === null) {
      console.log(latestGamesList, "hit latestGamesList");

      setSelectedNav(latestGamesList[0].id);
      setCurrentItem(latestGamesList[0]);
    }
  }, [latestGamesList, selectedNav]);

  // const currentItem: GameDetail =
  //   latestGamesList.length > 0
  //     ? latestGamesList.find((item) => item.id === selectedNav) ||
  //       latestGamesList[0]
  //     : latestGamesList[0];

  // const timerRef = useRef<number | null>(null);

  // const startAutoSlide = () => {
  //   if (timerRef.current) {
  //     clearInterval(timerRef.current);
  //   }

  //   if (latestGamesList.length === 0) {
  //     return;
  //   }

  //   timerRef.current = window.setInterval(() => {
  //     setSelectedNav((prevId) => {
  //       if (latestGamesList.length === 0) {
  //         return prevId;
  //       }

  //       const currentIndex = latestGamesList.findIndex(
  //         (game) => game.id === prevId,
  //       );

  //       const nextIndex =
  //         currentIndex === latestGamesList.length - 1 ? 0 : currentIndex + 1;

  //       return latestGamesList[nextIndex].id;
  //     });
  //   }, SLIDE_DURATION);
  // };

  // useEffect(() => {
  //   if (latestGamesList.length === 0 || selectedNav === null) {
  //     return;
  //   }

  //   startAutoSlide();

  //   return () => {
  //     if (timerRef.current) {
  //       clearInterval(timerRef.current);
  //     }
  //   };
  // }, [latestGamesList, selectedNav]);

  const handleGameSelect = (id: number) => {
    setSelectedNav(id);
    setCurrentItem(latestGamesList.find((item) => item.id === id) || null);
    // restart countdown from selected item
    // startAutoSlide();
  };

  const buyGame = () => {
    const payload = {
      ...currentItem,
      quantity: 1,
    };
    dispatch(addToCart(payload));
  };

  console.log(currentItem, "hit currentItem");
  return (
    <div className="flex flex-col gap-4 py-2 lg:flex-row lg:items-stretch">
      <div className="w-full p-3 lg:w-1/4 lg:p-6">
        <ul className="flex flex-col gap-3">
          {latestGamesList.map((game) => (
            <li key={game.id}>
              <button
                onClick={() => handleGameSelect(game.id)}
                className={`w-full rounded-lg p-3 text-left text-sm transition-all duration-300 sm:p-4 ${
                  selectedNav === game.id
                    ? "scale-105 bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {game.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative w-full overflow-hidden rounded-xl shadow-2xl lg:w-3/4">
        {currentItem ? (
          <>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyImg
                imgUrl={currentItem.image}
                altText={currentItem.title}
                styleClass={
                  "h-[420px] w-full object-cover transition-all duration-500 sm:h-[500px] lg:h-full"
                }
              />

              <div className="absolute inset-0 flex flex-col items-center justify-end">
                <div className="w-full bg-transparent/10 p-4 text-white shadow-2xl backdrop-blur-xl">
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="mb-4 px-2 text-2xl font-bold drop-shadow-lg sm:text-3xl lg:text-4xl">
                        {currentItem.text}
                      </h2>

                      <div className="flex flex-wrap gap-2">
                        {currentItem.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="inline-flex items-center rounded-md bg-black/50 px-2 py-1 text-xs font-medium sm:text-sm"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm sm:text-base">
                      <div className="my-1">
                        <span className="font-bold">Price:</span>
                        {` ₹ ${currentItem.price}`}
                      </div>

                      <Button
                        onClick={() => buyGame()}
                        className="mx-1 inline-flex cursor-pointer items-center gap-2 rounded-md bg-green-700 px-4 py-1.5 text-sm font-semibold text-white"
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Suspense>
          </>
        ) : (
          <div className="flex h-full min-h-[420px] items-center justify-center bg-gray-900 text-white">
            Loading featured game...
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
