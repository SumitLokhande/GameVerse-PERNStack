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
      <div className="mx-auto flex max-w-7xl flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div
          className="cursor-pointer text-xl font-bold text-white"
          onClick={() => navigate("/")}
        >
          GamerVerse
        </div>
        <ul className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-sm sm:justify-end sm:gap-x-6 sm:text-base">
          <li>
            <NavLink
              to="/games"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-blue-400 pb-1 font-semibold text-blue-400"
                  : "text-white transition-colors duration-200 hover:text-gray-300"
              }
            >
              Games
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/card-generator"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-blue-400 pb-1 font-semibold text-blue-400"
                  : "text-white transition-colors duration-200 hover:text-gray-300"
              }
            >
              Card Generator
            </NavLink>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/reviews"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-blue-400 pb-1 font-semibold text-blue-400"
                      : "text-white transition-colors duration-200 hover:text-gray-300"
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
                      ? "border-b-2 border-blue-400 pb-1 font-semibold text-blue-400"
                      : "text-white transition-colors duration-200 hover:text-gray-300"
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
                  ? "border-b-2 border-blue-400 pb-1 font-semibold text-blue-400"
                  : "text-white transition-colors duration-200 hover:text-gray-300"
              }
            >
              <button
                className="relative inline-flex items-center justify-center text-gray-300 transition-colors hover:text-blue-400 focus:outline-none"
                aria-label="Cart"
              >
                <svg
                  xmlns="http://www.w3.org"
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

                <span className="absolute top-0 right-0 inline-flex -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                  {totalItems}
                </span>
              </button>
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Menu as="div" className="relative ml-0 sm:ml-3">
                  <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <div className="flex size-8 items-center justify-center rounded-full bg-gray-800 py-1 text-sm font-semibold text-white outline -outline-offset-1 outline-white/10">
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
                      ? "border-b-2 border-blue-400 pb-1 font-semibold text-blue-400"
                      : "text-white transition-colors duration-200 hover:text-gray-300"
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
                      ? "border-b-2 border-blue-400 pb-1 font-semibold text-blue-400"
                      : "text-white transition-colors duration-200 hover:text-gray-300"
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
