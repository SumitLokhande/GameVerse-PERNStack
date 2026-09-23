import { useState, useMemo, useEffect, useRef } from "react";
import GameCard from "../../components/GameCard";
import { useLocation } from "react-router";
import { getAllGamesList } from "../../redux/Slices/gamesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useDebounce } from "../../hooks/customHooks";

const GamesList = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(
    location.state?.category ?? "",
  );
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const allGames = useAppSelector((state) => state.games.allGames);
  const debouncedValue = useDebounce(
    searchInput,
    searchInput.length > 0 ? 2000 : 0,
  );
  const searchTerm = debouncedValue;
  const isLoading = Boolean(searchInput && searchInput !== debouncedValue);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    dispatch(getAllGamesList());
  }, [dispatch]);

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(allGames.map((game) => game.genre))];
    return uniqueGenres;
  }, [allGames]);

  const platforms = useMemo(() => {
    const allPlatforms = allGames.flatMap((game) => game.platforms);
    const uniquePlatforms = [...new Set(allPlatforms)];
    return uniquePlatforms;
  }, [allGames]);

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
  }, [allGames, searchTerm, selectedGenre, selectedPlatform]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-900 p-4 text-white sm:p-6"
    >
      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-center text-2xl font-bold text-blue-400 sm:text-3xl xl:flex-1">
          Games Library
        </h1>

        <div className="w-full xl:w-64">
          <input
            type="text"
            placeholder="Search games..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {isLoading && searchInput ? (
        <div className="text-center py-4">
          <p className="text-blue-400 text-sm">Searching...</p>
        </div>
      ) : (
        <>
          {/* Games Grid */}
          <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredGames.map((game) => (
              <div key={game.id} className="w-full max-w-[220px] sm:max-w-none">
                <GameCard game={game} />
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
        </>
      )}
    </div>
  );
};

export default GamesList;
