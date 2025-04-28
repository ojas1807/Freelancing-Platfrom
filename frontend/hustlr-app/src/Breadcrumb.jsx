import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="bg-gray-100 py-3 px-5 rounded-md mb-6">
      <ol className="flex space-x-2 text-sm text-gray-600">
        <li>
          <Link to="/freelancer_dashboard" className="text-blue-500 hover:underline">
            Dashboard
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500">{value}</span>
              ) : (
                <Link to={to} className="text-blue-500 hover:underline">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;