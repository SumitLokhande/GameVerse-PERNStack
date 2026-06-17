import React from "react";
import { useAuth } from "../../hooks/customHooks";
import { useNavigate } from "react-router";

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              <img
                src={
                  user?.avatar ||
                  "https://ui-avatars.com/api/?name=GameVerse&background=2563eb&color=fff"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-800 object-cover"
              />

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">
                  {user?.name || "Player One"}
                </h1>

                <p className="text-gray-400 mt-1">
                  {user?.email || "player@example.com"}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                    Gamer
                  </span>

                  <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">
                    Reviewer
                  </span>

                  <span className="px-3 py-1 bg-green-600 rounded-full text-sm">
                    Active Member
                  </span>
                </div>
              </div>

              <button
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Reviews Written", value: 42 },
            { label: "Games Played", value: 128 },
            { label: "Hours Logged", value: 1240 },
            { label: "Followers", value: 326 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-800 border border-gray-700 rounded-xl p-5"
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <h3 className="text-3xl font-bold text-blue-400 mt-2">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* About */}
          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">
              About Me
            </h2>

            <p className="text-gray-300 leading-relaxed">
              Passionate gamer who enjoys RPGs, FPS titles, and open-world
              adventures. Always looking for hidden gems and sharing honest game
              reviews with the community.
            </p>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Favorite Genres</h3>

              <div className="flex flex-wrap gap-2">
                {["RPG", "Open World", "Adventure", "FPS", "Strategy"].map(
                  (genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Gaming Profile */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">
              Gaming Profile
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Preferred Platform</p>
                <p className="font-medium">PC</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Favorite Game</p>
                <p className="font-medium">Baldur's Gate 3</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="font-medium">January 2025</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Review Rating</p>
                <p className="font-medium text-yellow-400">★★★★★</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {[
              "Reviewed Baldur's Gate 3",
              "Added Cyberpunk 2077 to Favorites",
              "Posted a comment on Elden Ring",
              "Liked a review for GTA V",
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border-b border-gray-700 pb-3"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-gray-300">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
