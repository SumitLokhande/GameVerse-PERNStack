import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getRecommendation } from "../../redux/Slices/gamesSlice";
import type { GameRecommendation } from "../../types/authTypes";
import { toast } from "react-toastify";

const GAME_GENRES = [
  "Any",
  "Action",
  "Adventure",
  "RPG", // Role-Playing Game
  "Strategy",
  "Simulation",
  "Sports",
  "Racing",
  "Shooter",
  "Puzzle",
  "Fighting",
  "Platformer",
];

const GAME_PLATFORMS = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X/S",
  "Xbox One",
  "Nintendo Switch",
  "iOS",
  "Android",
  "VR", // Virtual Reality
];
const GAME_DIFFICULTIES = [
  { value: "easy", label: "Easy (Story / Casual)" },
  { value: "medium", label: "Medium (Normal / Standard)" },
  { value: "hard", label: "Hard (Challenging / Veteran)" },
];

// const testData = {
//   name: "Baldur's Gate 3",
//   description: "A story-driven RPG with deep character choices.",
//   genreType: "RPG",
//   platforms: ["PC", "PlayStation 5"],
//   difficulty: "medium",
//   players: 4,
//   estimatedPlaytime: "80-120 hours",
//   releaseYear: 2023,
//   developer: "Larian Studios",
//   gameTags: ["RPG", "Turn-Based", "Co-op", "Fantasy"],
//   whyRecommended: [
//     "Supports multiplayer",
//     "Deep role-playing systems",
//     "Excellent story choices",
//   ],
//   pros: ["Outstanding writing", "Huge replay value"],
//   cons: ["Long campaign"],
//   similarGames: [
//     "Divinity Original Sin 2",
//     "Dragon Age Origins",
//     "Pathfinder Wrath of the Righteous",
//   ],
// };

const RecommendationGenerator = () => {
  const [gamePlatform, setGamePlatform] = useState(GAME_PLATFORMS);
  const [players, setPlayers] = useState(4);
  const [difficulty, setGameDifficulty] = useState("medium");
  const [generating, setGenerating] = useState(false);
  const [generatedRecommendation, setGeneratedRecommendation] =
    useState<GameRecommendation | null>(null);
  const [genreType, setGenreType] = useState("Any");
  const [saving, setSaving] = useState(false);
  // const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const gameRecommendation = useAppSelector(
    (state) => state.games.gameRecommendation,
  );

  useEffect(() => {
    if (gameRecommendation) {
      setGeneratedRecommendation(gameRecommendation);
    }
  }, [gameRecommendation]);
  // Load user preferences on component mount
  // useEffect(() => {
  //   const fetchUserPreferences = async () => {
  //     try {
  //       const response = await api.get("/user/profile");
  //       const preferences = response.data.data.preferences;

  //       if (preferences) {
  //         // Auto-fill dietary restrictions
  //         if (
  //           preferences.dietary_restrictions &&
  //           preferences.dietary_restrictions.length > 0
  //         ) {
  //           setGamePlatform(preferences.dietary_restrictions);
  //         }

  //         //Auto-fill preferred cuisine (use first one if multiple)
  //         if (
  //           preferences.preferred_cuisine &&
  //           preferences.preferred_cuisine.length > 0
  //         ) {
  //           setGenreType(preferences.preferred_cuisine);
  //         }

  //         //Auto-fill default players
  //         if (preferences.default_players) {
  //           setPlayers(preferences.default_players);
  //         }

  //         setPreferencesLoaded(true);
  //       }
  //     } catch (error) {
  //       console.log("Failed to load user preferences:", error);
  //       setPreferencesLoaded(false);
  //     }
  //   };
  //   fetchUserPreferences();
  // }, []);

  const toggleGames = (option: string) => {
    console.log(option, "hit option toggleGames");
    if (gamePlatform.includes(option)) {
      setGamePlatform(gamePlatform.filter((d) => d !== option));
    } else {
      setGamePlatform([...gamePlatform, option]);
    }
  };

  const handleGenerate = async () => {
    setSaving(true);
    setGenerating(true);
    setGeneratedRecommendation(null);

    try {
      const payload = {
        platforms: [...gamePlatform],
        genreType: genreType,
        players: players,
        difficulty: difficulty,
      };

      console.log(payload, "hit payload");

      const resultAction = await dispatch(getRecommendation(payload));

      if (getRecommendation.fulfilled.match(resultAction)) {
        setGeneratedRecommendation(resultAction.payload);
        toast.success("Recommendation generated successfully!");
      } else {
        toast.error("Failed to generate recommendation");
      }
    } catch (error) {
      toast.error("Failed to generate recommendation");
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveRecommendation = async () => {};

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Recommendation Generator
          </h1>
          <p className="text-yellow-600 mt-2">
            Get AI recommanded games based on your choices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Results Section */}
          <div>
            {generatedRecommendation ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {generatedRecommendation.name}
                  </h2>
                  <p className="text-gray-600">
                    {generatedRecommendation.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {generatedRecommendation.genreType}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                      {generatedRecommendation.difficulty}
                    </span>
                    {generatedRecommendation.platforms?.map((platform) => (
                      <span
                        key={platform}
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {generatedRecommendation.gameTags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="text-xs uppercase text-gray-500 tracking-wide">
                        Playtime
                      </div>
                      <div className="mt-2 font-semibold text-gray-900">
                        {generatedRecommendation.estimatedPlaytime}
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="text-xs uppercase text-gray-500 tracking-wide">
                        Release Year
                      </div>
                      <div className="mt-2 font-semibold text-gray-900">
                        {generatedRecommendation.releaseYear}
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="text-xs uppercase text-gray-500 tracking-wide">
                        Developer
                      </div>
                      <div className="mt-2 font-semibold text-gray-900">
                        {generatedRecommendation.developer}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Why recommended
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {generatedRecommendation.whyRecommended?.map(
                      (reason, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-blue-500">•</span>
                          <span>{reason}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Pros</h3>
                    <ul className="space-y-2 text-gray-700">
                      {generatedRecommendation.pros?.map((pro, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-emerald-500">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Cons</h3>
                    <ul className="space-y-2 text-gray-700">
                      {generatedRecommendation.cons?.map((con, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-red-500">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Similar games
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {generatedRecommendation.similarGames?.map(
                      (game, index) => (
                        <li key={index}>{game}</li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveRecommendation}
                    disabled={saving}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Recommendation"}
                  </button>
                  <button
                    onClick={() => setGeneratedRecommendation(null)}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    New Recommendation
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center h-full flex flex-col items-center justify-center">
                {/* <ChefHat className="w-16 h-16 text-gray-300 mb-4" /> */}
                <p className="text-gray-500">
                  Your generated recommendation will appear here
                </p>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            {/* Preferences */}
            <div className="bg-white rounded-xl p-6 space-y-5">
              <label className="block text-md font-medium text-gray-700 mb-2">
                Preferences
              </label>

              {/* Genre Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre Type
                </label>
                <select
                  value={genreType}
                  onChange={(e) => setGenreType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  {GAME_GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* GAME PLATFORMS */}
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Game Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {GAME_PLATFORMS.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleGames(option)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        gamePlatform.includes(option)
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Players */}
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Players: {players}
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={players}
                  onChange={(e) => setPlayers(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>4</span>
                </div>
              </div>

              {/* Game difficulty */}
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Game difficulty
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {GAME_DIFFICULTIES.map((difficultyLevel) => (
                    <button
                      key={difficultyLevel.value}
                      onClick={() => setGameDifficulty(difficultyLevel.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        difficulty === difficultyLevel.value
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {difficultyLevel.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating Recommendation...
                </>
              ) : (
                <>
                  {/* <Sparkles className="w-5 h-5" /> */}
                  Generate Recommendation
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// const NutritionBadge = ({ label, value, unit }) => (
//   <div className="text-center p-3 bg-gray-50 rounded-lg">
//     <div className="text-lg font-bold text-gray-900">
//       {value}
//       {unit}
//     </div>
//     <div className="text-xs text-gray-600">{label}</div>
//   </div>
// );

export default RecommendationGenerator;
