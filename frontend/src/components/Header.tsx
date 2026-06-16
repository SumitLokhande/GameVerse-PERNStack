import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/customHooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAppSelector } from "../redux/hooks";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent/30 backdrop-blur-xs z-50 shadow-xl">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div
          className="text-white font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          GamerVerse
        </div>
        <ul className="flex space-x-8">
          <li>
            <NavLink
              to="/games"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                  : "text-white hover:text-gray-300 transition-colors duration-200"
              }
            >
              Games
            </NavLink>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/reviews"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-gray-300 transition-colors duration-200"
                  }
                >
                  Reviews
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recommendations"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-gray-300 transition-colors duration-200"
                  }
                >
                  Recommendations
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                  : "text-white hover:text-gray-300 transition-colors duration-200"
              }
            >
              <button
                className="relative text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
                aria-label="Cart"
              >
                <svg
                  xmlns="http://w3.org"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalItems}
                </span>
              </button>
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <div className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10 py-1">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                      >
                        Your profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        onClick={() => logout()}
                        className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                      >
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-gray-300 transition-colors duration-200"
                  }
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-gray-300 transition-colors duration-200"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
