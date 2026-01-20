import { useContext } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            ShopX
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/shop" className={linkClass}>
              Shop
            </NavLink>
            <NavLink to="/cart" className={linkClass}>
              Cart
            </NavLink>

            {!user ? (
              <>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <Link to={"/profile"} className="relative group cursor-pointer">
                  {/* Avatar */}
                  <img
                    src={user.avatar || "https://i.pravatar.cc/40"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />

                  {/* Tooltip */}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2
        hidden group-hover:block
        bg-gray-900 text-white text-sm px-3 py-1 rounded
        whitespace-nowrap shadow-lg z-50"
                  >
                    {user.name}

                    {/* Arrow */}
                    <div
                      className="absolute -top-1 left-1/2 -translate-x-1/2
          w-2 h-2 bg-gray-900 rotate-45"
                    ></div>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
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
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow">
          <div className="px-4 py-3 space-y-3">
            <NavLink
              onClick={() => setIsOpen(false)}
              to="/"
              className={linkClass}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(false)}
              to="/shop"
              className={linkClass}
            >
              Shop
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(false)}
              to="/cart"
              className={linkClass}
            >
              Cart
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(false)}
              to="/login"
              className={linkClass}
            >
              Login
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(false)}
              to="/register"
              className="block bg-blue-600 text-white text-center py-2 rounded-md"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
