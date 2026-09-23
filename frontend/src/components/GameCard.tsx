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
    <div className="h-auto w-full max-w-[220px] cursor-pointer rounded-lg bg-gray-800 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:max-w-[230px]">
      <div className="relative p-2" onClick={() => handleGameClick(game)}>
        <img
          loading="lazy"
          decoding="async"
          src={game.image}
          alt={game.title}
          className="h-44 w-full rounded-lg object-cover sm:h-48"
        />
      </div>

      <div className="flex h-auto flex-col px-2 pb-3">
        <h3 className="h-10 overflow-hidden text-left text-sm font-semibold text-white">
          {game.title}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <span className="py-1 text-sm text-gray-400">{game.genre}</span>
          <div className="flex items-center">
            <span className="text-md font-bold text-yellow-300">
              {game.rating}
            </span>
            <span className="text-sm font-semibold">/5</span>
          </div>
        </div>

        <div className="my-1 flex items-center justify-between gap-2 pt-2">
          <div className="cursor-pointer rounded-md py-1.5 text-sm font-semibold text-white">
            ₹ {game.price}
          </div>

          <Button
            className="w-2/4 rounded-md bg-green-700 px-2 py-2 text-[11px] font-semibold text-white sm:text-xs"
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
