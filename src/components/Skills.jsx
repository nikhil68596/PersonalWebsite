import React from 'react'
//Following libraries are for logos for the tech stack skills.
import { FaJava } from "react-icons/fa"; 
import { FaPython } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { FaAws } from "react-icons/fa";

const Skills = () => {
  return (
    <>
    <h1 className = "text-xl text-center text-white">Skills/Coursework</h1>
    <div className = "text-white flex-col justify- space-y-3">
    <p><b>Note:</b> I included a Fireship video as part of each icon explaining each technology below, because
    I love Fireship's videos!!</p>
    <div class = "skills" className = "flex flex-row justify-center justify-around">
      <a id = "target" target="_blank" href="https://www.youtube.com/embed/x7X9w_GIm1s?si=BW7SyRxlfYm-CSU5">
        <FaPython color="#306998" className="text-8xl" />
      </a>		
      <a id = "target" target="_blank" href="https://youtube.com/embed/m4-HM_sCvtQ?si=lV4xJW1KIB3iAemT">
        <FaJava color="#007396" className="text-8xl" />
      </a>		
      <a id = "target" target="_blank" href="https://www.youtube.com/embed/Tn6-PIqc4UM">
        <FaReact color="#61DAFB" className="text-8xl" />
      </a>						  
      <a id = "target" target="_blank" href="https://www.youtube.com/embed/-MTSQjw5DrM">
        <FaNodeJs color="#8CC84B" className="text-8xl" />
      </a>
      <a id = "target" target="_blank" href="https://www.youtube.com/embed/ZzI9JE0i6Lc">
        <FaAws color="#FF9900" className="text-8xl" />
      </a>
    </div>
      <br />
      <b>School Coursework</b>: Data Structures, Computer Architecture, Calc III, Systems Programming, 
    Principles of Programming Languages, Design and Analysis of Computer Algorithms, Software Methodology,
              Principles of Information and Data Management, Data Management for Data Science in Python + R, Computer Security,
              Internet Technology, Introduction to Data Science
    </div>
    </>
  )
}

export default Skills
