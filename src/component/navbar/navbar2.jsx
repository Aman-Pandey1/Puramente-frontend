import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { IsAdmin } from "../authantication/isauthanticat";
import { AiFillInstagram } from "react-icons/ai";
import { ChevronDown } from "lucide-react";

export default function Navbar2() {
  const categories = [
    { name: "Necklace", category: "Necklaces" },
    { name: "Earring", category: "Earrings" },
    { name: "Bracelet", category: "Bracelets" },
    { name: "Ring", category: "Rings" },
    { name: "Pendant", category: "Pendant" },
  ];

  const [dropdown, setDropdown] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <nav className="relative hidden lg:flex gap-8 items-center h-16 w-full">
        <div className="text-button-orange  flex justify-between items-center px-24  w-full gap-10 p-2 text-lg font-bold">
          <Link
            onMouseEnter={() => setDropdown(false)}
            className="hover:text-cyan-600"
            to="/"
          >
            {t("Home")}
          </Link>
          <Link
            onMouseEnter={() => setDropdown(false)}
            className="hover:text-cyan-600"
            to="/aboutus"
          >
            {t("About us")}
          </Link>

          {/* Jewellery Design Dropdown */}
          <div className="relative" onMouseEnter={() => setDropdown(true)}>
            <Link
             
              className="hover:text-cyan-600 flex items-center cursor-pointer"
            >
              Jewellery Design
              <ChevronDown />
            </Link>
            {dropdown && (
              <ul
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="absolute z-50 left-0 mt-2 w-48 bg-white shadow-lg rounded-md"
              >
                {categories.map((item) => (
                  <li key={item.category}>
                    <Link
                      to={`/category/${item.category}`}
                      className="block px-4 py-2 hover:bg-cyan-100 text-black"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            onMouseEnter={() => setDropdown(false)}
            className="hover:text-cyan-600"
            to="/fairtrade"
          >
            Fair Trade Practicing
          </Link>

          <Link className="hover:text-cyan-600" to="/contactus">
            {t("Contact us")}
          </Link>

          {IsAdmin() ? (
            <Link className="text-center text-lg" to="/dashboard">
              <button className="bg-cyan-500 hover:bg-cyan-800 h-8 w-28 border-2 border-cyan-800 text-white">
                {t("Dashboard")}
              </button>
            </Link>
          ) : (
            <div className="flex gap-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/puramenteinternational/"
              >
                <AiFillInstagram className="h-6 hover:text-cyan-500 w-8" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/puramenteinternational1/"
              >
                <FaFacebook className="h-6 hover:text-cyan-500 w-8" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/@puramenteinternational1982"
              >
                <FaYoutube className="h-6 hover:text-cyan-500 w-8" />
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
