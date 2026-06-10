import { NavLink } from "react-router";
import { useAuth } from "../hooks/customHooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent/30 backdrop-blur-xs z-50 shadow-xl">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-white font-bold text-xl">GamerVerse</div>
        <ul className="flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                  : "text-white hover:text-gray-300 transition-colors duration-200"
              }
            >
              Home
            </NavLink>
          </li>
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
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                  : "text-white hover:text-gray-300 transition-colors duration-200"
              }
            >
              Categories
            </NavLink>
          </li>
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
              to="/goty"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                  : "text-white hover:text-gray-300 transition-colors duration-200"
              }
            >
              GOTY
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                      : "text-white hover:text-gray-300 transition-colors duration-200"
                  }
                >
                  Cart
                </NavLink>
              </li>
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
                        href="#"
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
