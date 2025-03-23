import { useState } from "react";
import { Menu, X, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </label>
        <Link to="/" className="btn btn-ghost normal-case text-3xl">Hustlr.</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/findwork">Find Work</Link></li>
          <li><Link to="/findtalent">Find Talent</Link></li>
          <li><Link to="/whyus">Why Us</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link className="btn btn-outline mr-1" to="/login_page">
          <LogIn className="w-4 h-4 mr-1" />
          Login
        </Link>

        <Link to="/signup" className="btn btn-primary">
          <User className="w-4 h-4 mr-2" />
          Sign Up
        </Link>
      </div>

      {/* Sidebar */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-opacity-50 z-40" onClick={toggleMenu}></div>
          <div className="fixed inset-y-0 left-0 bg-white h-full z-50 p-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <ul className="menu mt-2">
              <li><Link to="/findwork">Find Work</Link></li>
              <li><Link to="/findtalent">Find Talent</Link></li>
              <li><Link to="/whyus">Why Us</Link></li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
