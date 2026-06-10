import { Button } from "@headlessui/react";
import React from "react";

interface Game {
  id: number;
  title: string;
  genre: string;
  platform: string[];
  rating: number;
  image: string;
  description: string;
  releaseDate: string;
  developer: string;
  price: number;
}

interface GameCardProps {
  game: Game;
  onClick: () => void;
  isSelected: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, isSelected }) => {
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

  const addToCart = (game: Game) => {
    console.log(game, "Add to cart");
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 h-full ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      {/* Game Image */}
      <div className="relative h-48 overflow-hidden p-2 ">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover rounded-l"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-sm font-semibold">
          ${game.price}
        </div>
      </div>

      {/* Game Info */}
      <div className="p-2 flex flex-col h-auto">
        <h3 className="text-sm text-left font-semibold text-white mb-2 line-clamp-2">
          {game.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">{game.genre}</span>
          <div className="flex items-center space-x-1">
            {renderStars(game.rating)}
            <span className="text-sm text-gray-300 ml-1">({game.rating})</span>
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

        <Button
          className="items-center rounded-md cursor-pointer bg-green-700 mx-1 py-1.5 text-sm font-semibold text-white"
          onClick={() => addToCart(game)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
