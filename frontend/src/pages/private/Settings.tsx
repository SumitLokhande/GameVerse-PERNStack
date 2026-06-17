import React, { useState } from "react";
import { useAuth } from "../../hooks/customHooks";
import type { Difficulty } from "../../types/authTypes";

const PLATFORM_OPTIONS = [
  "PC",
  "PlayStation 5",
  "Xbox Series X",
  "Nintendo Switch",
  "Mobile",
];

const GENRE_OPTIONS = [
  "RPG",
  "FPS",
  "Adventure",
  "Action",
  "Strategy",
  "Sports",
  "Simulation",
  "Racing",
  "Horror",
  "Puzzle",
];

const DIFFICULTY_OPTIONS = ["easy", "medium", "hard"];

const Settings: React.FC = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    preferredPlatforms: user?.preferredPlatforms || [],
    favoriteGenres: user?.favoriteGenres || [],
    preferredDifficulty: user?.preferredDifficulty || "medium",
    multiplayerPreference: user?.multiplayerPreference ?? true,
  });

  const togglePlatform = (platform: string) => {
    setPreferences((prev) => ({
      ...prev,
      preferredPlatforms: prev.preferredPlatforms.includes(platform)
        ? prev.preferredPlatforms.filter((p: string) => p !== platform)
        : [...prev.preferredPlatforms, platform],
    }));
  };

  const toggleGenre = (genre: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter((g: string) => g !== genre)
        : [...prev.favoriteGenres, genre],
    }));
  };

  const handleProfileSave = () => {
    console.log("Save Profile", profile);
    // dispatch(updateProfile(profile))
  };

  const handlePasswordChange = () => {
    console.log("Change Password", passwordData);
    // dispatch(changePassword(passwordData))
  };

  const handlePreferencesSave = () => {
    console.log("Save Preferences", preferences);
    // dispatch(updatePreferences(preferences))
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure? This action cannot be undone.",
    );

    if (confirmed) {
      console.log("Delete Account");
      // dispatch(deleteAccount())
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-400 mt-1">
            Manage your account, security and gaming preferences
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            {/* Profile Settings */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-6">
                Profile Information
              </h2>

              <div className="flex flex-col gap-6 my-4">
                <div className="flex items-center justify-center">
                  <img
                    src={
                      profile.avatar ||
                      `https://ui-avatars.com/api/?name=${profile.name}`
                    }
                    alt="avatar"
                    className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleProfileSave}
                className="mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg transition-colors"
              >
                Save Profile
              </button>
            </div>

            {/* Security */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-8">
                Security
              </h2>

              <div className="flex flex-col gap-10 my-10">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handlePasswordChange}
                className="mt-12 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg transition-colors"
              >
                Change Password
              </button>
            </div>

            {/* Gaming Preferences */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-2/4">
              <h2 className="text-xl font-semibold text-blue-400 mb-8">
                Gaming Preferences
              </h2>

              <div className="my-6">
                {/* Platforms */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-3">
                    Preferred Platforms
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {PLATFORM_OPTIONS.map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => togglePlatform(platform)}
                        className={`px-2 py-1 rounded-lg transition-colors ${
                          preferences.preferredPlatforms.includes(platform)
                            ? "bg-blue-600"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Genres */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-3">
                    Favorite Genres
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {GENRE_OPTIONS.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => toggleGenre(genre)}
                        className={`px-2 py-1 rounded-lg transition-colors ${
                          preferences.favoriteGenres.includes(genre)
                            ? "bg-purple-600"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">
                    Preferred Difficulty
                  </label>

                  <select
                    value={preferences.preferredDifficulty}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        preferredDifficulty: e.target.value as Difficulty,
                      })
                    }
                    className="w-full lg:w-64 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  >
                    {DIFFICULTY_OPTIONS.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() +
                          difficulty.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handlePreferencesSave}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-gray-800 border border-red-500 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Danger Zone
            </h2>

            <p className="text-gray-400 mb-6">
              Deleting your account will permanently remove:
            </p>

            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
              <li>Your profile information</li>
              <li>Reviews and comments</li>
              <li>Favorite games</li>
              <li>Gaming preferences</li>
              <li>Recommendation history</li>
            </ul>

            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
