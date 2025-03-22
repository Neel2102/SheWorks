import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="/" className="flex items-center">
          <img src={logo} alt="SheWorks Logo" className="h-10" />
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#about" className="text-gray-700 hover:text-blue-500">
                About
              </a>
            </li>
            <li>
              <a href="#programs" className="text-gray-700 hover:text-blue-500">
                Programs
              </a>
            </li>
            <li>
              <a href="#success-stories" className="text-gray-700 hover:text-blue-500">
                Success Stories
              </a>
            </li>
            <li>
              <a href="#investors" className="text-gray-700 hover:text-blue-500">
                Investors
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-700 hover:text-blue-500">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;