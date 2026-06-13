import React from "react";
import { gamesCategories } from "../dummyData";
import { useNavigate } from "react-router";
import type { Category } from "../types/authTypes";

const GamesCategory: React.FC = () => {
  const navigate = useNavigate();
  // const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  // const renderStars = (rating: number) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;

  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(
  //       <svg
  //         key={i}
  //         className="w-4 h-4 text-yellow-400 fill-current"
  //         viewBox="0 0 20 20"
  //       >
  //         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //       </svg>,
  //     );
  //   }

  //   if (hasHalfStar) {
  //     stars.push(
  //       <svg
  //         key="half"
  //         className="w-4 h-4 text-yellow-400 fill-current"
  //         viewBox="0 0 20 20"
  //       >
  //         <defs>
  //           <linearGradient id={`half-star-${rating}`}>
  //             <stop offset="50%" stopColor="currentColor" />
  //             <stop offset="50%" stopColor="transparent" />
  //           </linearGradient>
  //         </defs>
  //         <path
  //           fill={`url(#half-star-${rating})`}
  //           d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  //         />
  //       </svg>,
  //     );
  //   }

  //   const emptyStars = 5 - Math.ceil(rating);
  //   for (let i = 0; i < emptyStars; i++) {
  //     stars.push(
  //       <svg
  //         key={`empty-${i}`}
  //         className="w-4 h-4 text-gray-400 fill-current"
  //         viewBox="0 0 20 20"
  //       >
  //         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //       </svg>,
  //     );
  //   }

  //   return stars;
  // };

  const handleNavigation = (category: Category) => {
    const userData = { category: category.name };

    // Pass the route path first, then the state object
    navigate("/game-list", { state: userData });
  };

  const spanClasses = [
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-2",
  ];

  return (
    <div className="bg-gray-900 text-white p-6 my-2">
      <div className="mb-8 text-start">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">
          Games by Category
        </h2>
        <p className="text-gray-300">
          Explore games organized by genre and style
        </p>
      </div>

      <div className="grid grid-cols-4 auto-rows-[150px] gap-5">
        {gamesCategories.map((category, i) => (
          <div
            key={i}
            className={`relative overflow-hidden cursor-pointer rounded-xl shadow-lg hover:scale-105 transition-all duration-300 ${
              spanClasses[i % spanClasses.length]
            }`}
            onClick={() => handleNavigation(category)}
          >
            <img
              src={category.backgroundImage}
              alt={category.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-end">
              <div className="w-full bg-black/30 py-2 px-4 text-start">
                <h2 className="text-white text-2xl font-bold">
                  {category.name}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesCategory;
