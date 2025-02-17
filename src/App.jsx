import React from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-scroll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GiSkills } from "react-icons/gi";
import { Nav, Footer, Home, Contact, Projects, Skills } from "/src/components";

//Dictionary of mapping component ids to the components themselves for population in main app page.
export const comps = {"Home" : <Home />,
  "Skills/Coursework" : <Skills />,
   "Projects" : <Projects />,
   "Contact" : <Contact />
  };

function App() {
  return (
    <>
        <div className="bg-slate-900 flex flex-col min-h-screen">
            <Nav />
            {Object.entries(comps).map((component, name) => (
              <React.Fragment key={component[0]}>
                <div id = {component[0]}>
                  <Border />
                  {component}
                </div>
              </React.Fragment>
            ))}
        </div>
        <Footer/> 
    </>
  );
}

//Function that creates a border between each of the components besides the footer.
function Border() {
  return <hr className="border border-gray-300" />;
}

export default App;