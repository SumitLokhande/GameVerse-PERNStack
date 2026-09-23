import React from "react";

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  gameTitle: string;
}

interface ReviewCardProps {
  review: Review;
  onViewFullReview: (review: Review) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onViewFullReview,
}) => {
  // const renderStars = (rating: number) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       <svg
  //         key={i}
  //         className={`w-4 h-4 ${i <= rating ? "text-yellow-400" : "text-gray-400"} fill-current`}
  //         viewBox="0 0 20 20"
  //       >
  //         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //       </svg>,
  //     );
  //   }
  //   return stars;
  // };

  // Truncate comment to first 100 characters
  const truncatedComment =
    review.comment.length > 100
      ? review.comment.substring(0, 100) + "..."
      : review.comment;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 max-h-48">
      <div className="flex h-full">
        {/* Game Image Section */}
        <div className="w-1/4 relative">
          <img
            src={`https://picsum.photos/200/300?random=${review.id + 100}`}
            alt={review.gameTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Review Content Section */}
        <div className="w-1/2 p-3 flex flex-col">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-3">
            <div>
              <h4 className="text-white font-semibold text-sm">
                {review.gameTitle}
              </h4>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-gray-300 text-sm leading-relaxed mb-3 flex-grow">
            {truncatedComment}
          </p>

          {/* Review Meta */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <span>{new Date(review.date).toLocaleDateString()}</span>
            <div className="flex items-center space-x-1">
              <svg
                className="w-3 h-3"
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
              <span>{review.helpful}</span>
            </div>
          </div>
        </div>

        {/* Action Column */}
        <div className="w-1/4 p-3 flex items-end justify-center">
          <button
            onClick={() => onViewFullReview(review)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Full Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
