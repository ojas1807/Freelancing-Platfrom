import { useState, useEffect } from "react";
import { Menu, X, User, LogIn, LogOut, Briefcase, Search, Star } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status when component mounts or when location changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const handleRestrictedAccess = () => {
    alert("Please log in first to access this feature.");
  };

  return (
    <div className="navbar bg-base-100 border border-b-gray-300">
      <div className="navbar-start">
        <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </label>
        <Link to="/" className="btn btn-ghost normal-case text-3xl">Hustlr.</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {/* Show "Find Work" only for freelancers */}
          {isLoggedIn && user?.role === "freelancer" && (
            <li>
              <Link
                to="/findwork"
                className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                <span className="font-medium">Find Work</span>
              </Link>
            </li>
          )}

          {/* Show "Find Talent" only for clients */}
          {isLoggedIn && user?.role === "client" && (
            <li>
              <Link
                to="/findtalent"
                className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="font-medium">Find Talent</span>
              </Link>
            </li>
          )}

          {/* Disable buttons for unauthenticated users */}
          {!isLoggedIn && (
            <>
              <li>
                <button
                  onClick={handleRestrictedAccess}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="font-medium">Find Work</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleRestrictedAccess}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="font-medium">Find Talent</span>
                </button>
              </li>
            </>
          )}

          <li>
            <Link
              to="/whyus"
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Star className="w-4 h-4" />
              <span className="font-medium">Why Us</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <button className="btn btn-secondary" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </button>
        ) : (
          <>
            <Link className="btn btn-outline mr-1" to="/login_page">
              <LogIn className="w-4 h-4 mr-1" />
              Login
            </Link>

            <Link to="/signup" className="btn btn-primary">
              <User className="w-4 h-4 mr-2" />
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Sidebar */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
          <div className="fixed inset-y-0 left-0 bg-white h-full z-50 p-4 w-64 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary">Hustlr.</h2>
              <button onClick={toggleMenu} className="btn btn-ghost btn-sm">
                <X />
              </button>
            </div>
            <ul className="menu gap-1">
              {isLoggedIn && user?.role === "freelancer" && (
                <li>
                  <Link
                    to="/findwork"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary"
                    onClick={toggleMenu}
                  >
                    <Briefcase className="w-4 h-4" />
                    Find Work
                  </Link>
                </li>
              )}
              {isLoggedIn && user?.role === "client" && (
                <li>
                  <Link
                    to="/findtalent"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary"
                    onClick={toggleMenu}
                  >
                    <Search className="w-4 h-4" />
                    Find Talent
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <>
                  <li>
                    <button
                      onClick={handleRestrictedAccess}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary"
                    >
                      <Briefcase className="w-4 h-4" />
                      Find Work
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleRestrictedAccess}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary"
                    >
                      <Search className="w-4 h-4" />
                      Find Talent
                    </button>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/whyus"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary"
                  onClick={toggleMenu}
                >
                  <Star className="w-4 h-4" />
                  Why Us
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;