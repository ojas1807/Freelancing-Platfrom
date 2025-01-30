import React from "react"
import { Menu, X, User, LogIn } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </label>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Find Work</a>
              </li>
              <li>
                <a>Find Talent</a>
              </li>
              <li>
                <a>Why Us</a>
              </li>
            </ul>
          )}
        </div>
        <a className="btn btn-ghost normal-case text-3xl">Hustlr.</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Find Work</a>
          </li>
          <li>
            <a>Find Talent</a>
          </li>
          <li>
            <a>Why Us</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost">
          <LogIn className="w-4 h-4 mr-2" />
          Log In
        </a>
        <a className="btn btn-primary">
          <User className="w-4 h-4 mr-2" />
          Sign Up
        </a>
      </div>
    </div>
  )
}

export default Navbar

