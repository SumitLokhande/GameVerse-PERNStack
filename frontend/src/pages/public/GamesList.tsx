import { useState, useMemo, useEffect, useRef } from "react";
import GameCard from "../../generic/GameCard";
import { useLocation } from "react-router";
import { getAllGamesList } from "../../redux/Slices/gamesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const GamesList = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const userData = location.state;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const allGames = useAppSelector((state) => state.games.allGames);

  useEffect(() => {
    console.log(userData, "hit userData");
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (userData) {
      setSelectedGenre(userData.category);
    }
  }, [userData]);

  useEffect(() => {
    dispatch(getAllGamesList());
  }, [dispatch]);

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(allGames.map((game) => game.genre))];
    return uniqueGenres;
  }, []);

  const platforms = useMemo(() => {
    const allPlatforms = allGames.flatMap((game) => game.platforms);
    const uniquePlatforms = [...new Set(allPlatforms)];
    return uniquePlatforms;
  }, []);

  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGenre = !selectedGenre || game.genre === selectedGenre;
      const matchesPlatform =
        !selectedPlatform || game.platforms.includes(selectedPlatform);

      return matchesSearch && matchesGenre && matchesPlatform;
    });
  }, [searchTerm, selectedGenre, selectedPlatform]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        {/* Filters on Left */}
        <div className="flex space-x-4">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        {/* Page Title in Center */}
        <h1 className="text-3xl font-bold text-blue-400 flex-1 text-center">
          Games Library
        </h1>

        {/* Search on Right */}
        <div className="w-64">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Games Grid */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {filteredGames.map((game) => (
          <div key={game.id}>
            <GameCard game={game} />
            {/* {selectedGameId === game.id && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <GameDetailsCard game={game} />
              </div>
            )} */}
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No games found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default GamesList;
