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
        <label
          tabIndex={0}
          className="btn btn-ghost lg:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </label>
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
        <button
          className="btn btn-outline mr-1"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <LogIn className="w-4 h-4 mr-1" />
          Login
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box pt-10 pb-10 pl-15 pr-15 ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <a className="btn btn-ghost normal-case text-4xl text-center ml-25">Hustlr.</a>
                <h2 className="mt-10 text-center text-xl normal-case">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                  Not a member?{" "}
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Signup now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </dialog>
        <a className="btn btn-primary">
          <User className="w-4 h-4 mr-2" />
          Sign Up
        </a>
      </div>

      {/* Sidebar */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0  bg-opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
          <div className="fixed inset-y-0 left-0 bg-white h-full z-50 p-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <ul className="menu mt-2">
              <li>
                {/* <a onClick={}>Find Work</a> */}
                <Link to="/findwork">Find Work</Link>
              </li>
              <li>
                <a onClick={toggleMenu}>Find Talent</a>
              </li>
              <li>
                <a onClick={toggleMenu}>Why Us</a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
