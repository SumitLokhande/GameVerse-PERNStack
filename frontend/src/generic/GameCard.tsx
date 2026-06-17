import { Button } from "@headlessui/react";
import React from "react";
import type { GameDetail } from "../types/authTypes";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/Slices/cartSlice";
import { useNavigate } from "react-router";

interface GameCardProps {
  game: GameDetail;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGameClick = (game: GameDetail) => {
    navigate(`/game-details/${game.title}`);
    console.log(game, "game Card clicked ");
  };

  const addGameToCart = (game: GameDetail) => {
    const payload = {
      id: game.id,
      title: game.title,
      text: game.text,
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

  return (
    <div
      className={`bg-gray-800 h-80 w-45 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105`}
    >
      {/* Game Image */}
      <div className="relative p-2 " onClick={() => handleGameClick(game)}>
        <img
          loading="lazy"
          decoding="async"
          src={game.image}
          alt={game.title}
          className="object-cover rounded-lg h-45 w-full"
        />
      </div>

      {/* Game Info */}
      <div className="px-2 flex flex-col h-auto">
        <h3 className="text-sm text-left font-semibold text-white overflow-hidden text-wrap w-auto h-10 ">
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
        <div className="flex justify-between gap-1 my-1 pt-2">
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
