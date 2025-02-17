import { useState, useEffect} from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-scroll";
import { GiSkills } from "react-icons/gi";
import {comps} from "../App"

const Nav = () => {
  /* Essential logic for clicking on certain buttons to produce different
  responsive design components. */
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  /* Scrolling logic! */
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* This will be displayed after reducing the width of the screen in a sorta like 
  block mode when clicking on the menu button. */  
  const content = (
    <>
      <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900">
        <ul className="text-center text-xl p-20">
          {Object.entries(comps).map((component, name) => (
            <li key={name}>
              <a href={`#${name}`}>{name}</a>
          </li>
          ))}
          <PdfLink />
        </ul>
      </div>
    </>
  );

  /*Main part of displaying the navbar.
    - For the div containing content, it is only rendered
      if you haven't clicked on the menu button (for small devices ONLY)
    - 
  */
  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 transition duration-300 ${
        isScrolled ? "bg-gray-300" : "bg-slate-900 shadow-lg"
      }`}
    >
      <div className={`h-10vh flex justify-between z-50 lg:py-5 px-5 py-4 ${
        isScrolled ? "text-black" : "text-white"
      }`}>
        <div className="flex items-center flex-1">
          <span className="text-xl font-bold">Nikhil Munagala</span>
        </div>
        <div className="lg:flex md:flex lg: flex-1 justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 text-[18px]">
              {Object.entries(comps).map((component, name) => (
                <li key={component[0]} className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  <a href={`#${component[0]}`}>{component[0]}</a>
                </li>
              ))}
              <PdfLink />
            </ul>
          </div>
        </div>
        <div>{click && content}</div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

//Function generating a pdf link for the resume link in the Navbar.
function PdfLink() {
  return (
    <a
      className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer"
      href="../../Nikhil Munagala- 2025 Latest Resume (15).pdf"
      target="_blank"
      rel="noopener noreferrer"
      download
    >
      Resume
    </a>
  );
}

export default Nav;
