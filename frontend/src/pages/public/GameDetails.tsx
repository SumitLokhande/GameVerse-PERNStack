import { useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/Slices/cartSlice";
import type { GameDetail } from "../../types/authTypes";

const GameDetails = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const allGames = useAppSelector((state) => state.games.allGames);

  const currentGame = allGames.find((game) => game.title === name);

  const [activeImage, setActiveImage] = useState(
    currentGame?.images?.[0] || "",
  );

  const addGameToCart = (game: GameDetail) => {
    const payload = {
      id: game.id,
      title: game.title,
      text: "game.text",
      image: game.image,
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

  const renderStars = (rating = 4) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? "text-yellow-400" : "text-gray-600"
          } fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    return stars;
  };

  if (!currentGame) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-2xl">
        Game not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl p-4">
        {/* Hero */}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="overflow-hidden rounded-xl bg-gray-800 shadow-2xl">
              <img
                loading="lazy"
                decoding="async"
                src={activeImage}
                alt={currentGame.title}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-5 gap-3">
              {currentGame.images.map((image, index) => (
                <img
                  loading="lazy"
                  decoding="async"
                  key={index}
                  src={image}
                  alt={`${currentGame.title}-${index}`}
                  onClick={() => setActiveImage(image)}
                  className={`h-24 w-full cursor-pointer rounded-lg object-cover transition-all duration-300 ${
                    activeImage === image
                      ? "border-4 border-yellow-400"
                      : "opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>

            {/* Description */}
            <div className="mt-8 rounded-xl bg-gray-800 p-6 shadow-xl text-start">
              <h2 className="font-bold">{currentGame.title}</h2>

              <p className="text-gray-300 leading-relaxed text-lg">
                {currentGame.description}
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 rounded-xl bg-gray-800 p-6 shadow-xl text-start">
              <h2 className="mb-4 text-2xl font-bold text-yellow-400">
                Highlights
              </h2>

              <ul className="space-y-3 text-gray-300">
                <li>🎮 Immersive Gameplay Experience</li>
                <li>🌍 Stunning Open World Environments</li>
                <li>⚔️ Action-Packed Combat System</li>
                <li>🎵 Cinematic Sound Design</li>
                <li>🏆 Award Winning Storytelling</li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <div className="sticky top-6 rounded-xl bg-gray-800 p-6 shadow-2xl">
              {/* Extra Info */}
              <div className="my-4 space-y-4 border-b border-gray-700 p-6">
                <div>
                  <p className="text-sm text-gray-400">Platform</p>
                  <div>
                    {currentGame.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="inline-flex items-center rounded-md bg-black/50 m-1 px-2 py-1 text-sm font-medium"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Genre</p>
                  <p className="font-medium"> {currentGame.genre}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Availability</p>
                  <p className="font-medium text-green-400">In Stock</p>
                </div>
              </div>

              <div>
                {/* Rating */}
                <div className="mt-6 flex justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderStars(currentGame.rating)}
                    </div>
                    <span className="font-semibold text-white">
                      {currentGame.rating}
                    </span>
                  </div>
                  <div className=" flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-2 text-sm">
                      {" "}
                      ₹ {currentGame.price}
                    </span>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => addGameToCart(currentGame)}
                  className="mt-8 w-full rounded-lg bg-green-700 py-3 text-lg font-semibold text-white transition-all hover:bg-green-600 cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
