import React, { useEffect, useState } from "react";
import ReviewCard from "../../generic/ReviewCard";
import type { Review } from "../../types/authTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getGamesReviewsList } from "../../redux/Slices/gamesSlice";

// export const gamesReviews = [
//   {
//     id: 1,
//     userName: "GamerPro2024",
//     userAvatar: "https://picsum.photos/40/40?random=1",
//     rating: 5,
//     comment:
//       "Absolutely incredible game! The graphics are stunning and the storyline keeps you hooked from start to finish. The combat system is intuitive yet deep, offering hours of engaging gameplay.",
//     date: "2024-01-15",
//     helpful: 24,
//     gameTitle: "Cyberpunk 2077",
//   },
//   {
//     id: 2,
//     userName: "RetroGamer",
//     userAvatar: "https://picsum.photos/40/40?random=2",
//     rating: 4,
//     comment:
//       "Great RPG with amazing world-building. Some bugs here and there, but the overall experience is fantastic. The character development system is one of the best I've seen.",
//     date: "2024-01-10",
//     helpful: 18,
//     gameTitle: "The Witcher 3",
//   },
//   {
//     id: 3,
//     userName: "CasualPlayer",
//     userAvatar: "https://picsum.photos/40/40?random=3",
//     rating: 3,
//     comment:
//       "Decent game, but not for everyone. The learning curve is steep and some mechanics feel outdated. Still, if you enjoy sports games, it's worth a try.",
//     date: "2024-01-08",
//     helpful: 7,
//     gameTitle: "FIFA 24",
//   },
//   {
//     id: 4,
//     userName: "FPSFanatic",
//     userAvatar: "https://picsum.photos/40/40?random=4",
//     rating: 5,
//     comment:
//       "Best CoD game in years! The multiplayer is addictive and the campaign is intense. Graphics are top-notch and the sound design is incredible.",
//     date: "2024-01-05",
//     helpful: 31,
//     gameTitle: "Call of Duty: Modern Warfare III",
//   },
//   {
//     id: 5,
//     userName: "SandboxLover",
//     userAvatar: "https://picsum.photos/40/40?random=5",
//     rating: 4,
//     comment:
//       "Minecraft never gets old! The creativity it inspires is unmatched. Perfect for all ages and great for educational purposes too.",
//     date: "2024-01-03",
//     helpful: 15,
//     gameTitle: "Minecraft",
//   },
//   {
//     id: 6,
//     userName: "OpenWorldEnthusiast",
//     userAvatar: "https://picsum.photos/40/40?random=6",
//     rating: 5,
//     comment:
//       "Rockstar has done it again! GTA V is a masterpiece of open-world gaming. The story, characters, and freedom are unparalleled.",
//     date: "2024-01-01",
//     helpful: 42,
//     gameTitle: "Grand Theft Auto V",
//   },
// ];

const GameReviews: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const dispatch = useAppDispatch();
  const gamesReviews = useAppSelector((state) => state.games.gamesReviews);

  useEffect(() => {
    dispatch(getGamesReviewsList());
  }, [dispatch]);

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-${size === "sm" ? "4" : "5"} h-${size === "sm" ? "4" : "5"} ${
            i <= rating ? "text-yellow-400" : "text-gray-400"
          } fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }
    return stars;
  };

  const handleViewFullReview = (review: Review) => {
    setSelectedReview(review);
  };

  const closeFullReview = () => {
    setSelectedReview(null);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">Game Reviews</h2>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-2 gap-6">
        {gamesReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onViewFullReview={handleViewFullReview}
          />
        ))}
      </div>

      {gamesReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No reviews found matching your criteria.
          </p>
        </div>
      )}

      {/* Full Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Full Review: {selectedReview.gameTitle}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>By {selectedReview.userName}</span>
                    <span>
                      {new Date(selectedReview.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeFullReview}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Game Image */}
                <div className="lg:w-1/3">
                  <img
                    src={`https://picsum.photos/400/300?random=${selectedReview.id + 100}`}
                    alt={selectedReview.gameTitle}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                {/* Review Content */}
                <div className="lg:w-2/3">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={selectedReview.userAvatar}
                      alt={selectedReview.userName}
                      className="w-12 h-12 rounded-full border-2 border-blue-500"
                    />
                    <div>
                      <h4 className="text-xl font-semibold text-white">
                        {selectedReview.userName}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {renderStars(selectedReview.rating, "md")}
                        <span className="text-gray-300">
                          ({selectedReview.rating}/5)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg mb-4">
                    <p className="text-gray-300 leading-relaxed">
                      {selectedReview.comment}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
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
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        <span>Helpful ({selectedReview.helpful})</span>
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        Reply
                      </button>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameReviews;
