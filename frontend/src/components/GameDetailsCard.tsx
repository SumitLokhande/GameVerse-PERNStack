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

interface GameDetailsCardProps {
  game: Game;
}

const GameDetailsCard: React.FC<GameDetailsCardProps> = ({ game }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400 fill-current"
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
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={`detail-half-${game.id}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#detail-half-${game.id})`}
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
          className="w-5 h-5 text-gray-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }

    return stars;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Game Image */}
        <div className="md:w-1/3">
          <img
            loading="lazy"
            decoding="async"
            src={game.image}
            alt={game.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Game Details */}
        <div className="md:w-2/3 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{game.title}</h2>
            <p className="text-gray-300 text-lg">{game.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Game Info
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Genre:</span>
                  <span className="text-white">{game.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Developer:</span>
                  <span className="text-white">{game.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Date:</span>
                  <span className="text-white">
                    {formatDate(game.releaseDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price:</span>
                  <span className="text-green-400 font-semibold">
                    ${game.price}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Rating & Platforms
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Rating:</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(game.rating)}
                    <span className="text-white ml-1">({game.rating}/5)</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Platforms:</span>
                  <div className="flex flex-wrap gap-2">
                    {game.platform.map((platform) => (
                      <span
                        key={platform}
                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-700">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l1.1-5m8.9 5L17 8m0 0l1.1 5M9 21h6m-6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Add to Cart</span>
            </button>
            <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>Add to Wishlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsCard;
