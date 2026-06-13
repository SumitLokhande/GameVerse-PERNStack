import { Button } from "@headlessui/react";
import React from "react";
import type { GameDetail } from "../types/authTypes";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/Slices/cartSlice";

interface GameCardProps {
  game: GameDetail;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const dispatch = useAppDispatch();
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={`half-${game.id}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-${game.id})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    return stars;
  };

  const handleGameClick = (game: GameDetail) => {
    console.log(game, "game Card clicked ");
  };

  const addGameToCart = (game: GameDetail) => {
    const payload = {
      id: game.id,
      title: game.title,
      text: game.text,
      image: game.image,
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
    <div
      className={`bg-gray-800 h-75 w-45 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105`}
    >
      {/* Game Image */}
      <div className="relative p-2 " onClick={() => handleGameClick(game)}>
        <img
          src={game.image}
          alt={game.title}
          className="object-cover rounded-lg h-45 w-full"
        />
      </div>

      {/* Game Info */}
      <div className="px-2 flex flex-col h-auto">
        <h3 className="text-sm text-left font-semibold text-white overflow-hidden text-wrap w-auto h-8 ">
          {game.title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 py-1">{game.genre}</span>
          <div className="flex items-center">
            <span className="text-md text-yellow-300 font-bold">
              {game.rating}
            </span>
            <span className="font-semibold text-sm">/5</span>
          </div>
        </div>

        {/* <div className="flex flex-wrap gap-1 mb-3">
          {game.platform.slice(0, 3).map((platform) => (
            <span
              key={platform}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
            >
              {platform}
            </span>
          ))}
          {game.platform.length > 3 && (
            <span className="text-xs text-gray-400">
              +{game.platform.length - 3} more
            </span>
          )}
        </div> */}
        <div className="flex justify-between gap-1 my-1">
          <div className="items-start rounded-md cursor-pointer py-1.5 text-sm font-semibold text-white">
            ₹ {game.price}
          </div>

          <Button
            className="items-center rounded-md cursor-pointer bg-green-700 w-2/4 text-xs font-semibold text-white"
            onClick={() => addGameToCart(game)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
