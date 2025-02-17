import React, { useState, useEffect } from "react";
import "./Projects.css";

//Content components for each project
const projectContent = [
  {
    name: "Personify",
    component: (
      <div className="personify-content flex flex-col gap-[16px]">
        <h1 className="text-center bold font-bold text-[18px]">Personify</h1>
        <h3>
          <i>
            HackRU Spring 2025 - <b>Winner iCIMS-sponsored First Place Prize</b>
          </i>
        </h3>
        <p>
          Say goodbye to spreadsheets and continuously checking emails for job
          application management, and meet Personify. Personify is a
          personalized job application tracker that simplifies the management of
          your job applications. It comes in two modes: automatic and manual
          tracking, where the automatic mode will continuously scan your emails
          to provide real-time application updates.
        </p>
        <p>
          <b>Tech Stack:</b> HTML, CSS, JavaScript, Flask, MongoDB, Google
          OAuth, Gmail API
        </p>
        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition w-40 block mx-auto">
          <a href="https://github.com/nikhil68596/Personify" target="_blank">
            Github Link
          </a>
        </button>
      </div>
    ),
  },
  {
    name: "CSP",
    component: (
      <div className="personify-content flex flex-col gap-[16px]">
        <h1 className="text-center bold font-bold text-[18px]">
          RUAAA AI Academic Advisor
        </h1>
        <h3>
          <i>HackHers Spring 2025- Now expanding it to a side project</i>
        </h3>
        <p>
          Are you an ECE freshman or an incoming student struggling to know
          where to start in your journey? Meet RUAAA Academic Advisor, a chatbot
          providing you course recommendations, eligibilities and more to
          efficiently help you plan out your schedules. Waste less time
          searching to swiftly schedule the classes you want to take and have an
          amazing semester! Looking to expand this for CS students in the
          future.
        </p>
        <p>
          <b>Tech Stack:</b> HTML, CSS, JavaScript, Figma, Flask, GroqAPI, AWS
          DynamoDB
        </p>
        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition w-40 block mx-auto">
          <a
            href="https://github.com/nikhil68596/RUAAA-AI-Advisor"
            target="_blank"
          >
            Github Link
          </a>
        </button>
      </div>
    ),
  },
  {
    name: "Personal Website",
    component: (
      <div className="personify-content flex flex-col gap-[16px]">
        <h1 className="text-center bold font-bold text-[18px]">
          Personal Website
        </h1>
        <p>My previous portfolio website! 😊</p>
        <p>
          <b>Tech Stack:</b> HTML, CSS, JavaScript, EmailJS
        </p>
        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition w-40 block mx-auto">
          <a
            href="https://github.com/nikhil68596/nikhil68596.github.io"
            target="_blank"
          >
            Github Link
          </a>
        </button>
      </div>
    ),
  },
  {
    name: "RuVerify",
    component: (
      <div className="personify-content flex flex-col gap-[16px]">
        <h1 className="text-center bold font-bold text-[18px]">RuVerify</h1>
        <h3>
          <i>HackRU Spring 2023- Fully finished side project</i>
        </h3>
        <p>
          You are a typical Rutgers student going to the school gym. But as you
          are entering, you forget your ID. Oh no, what do I do? Meet RuVerify,
          a facial recognition app that can be used to scan in student's faces
          instead of scanning in IDs. Using OpenCV and MySQL, it compares the
          facial recognition scan with the corresponding student id photo to
          provide entry. Amazing that this is a fully-Python based application.
        </p>
        <p>
          <b>Tech Stack:</b> Flet (Python), OpenCV, MySQL, NumPy, Pandas
        </p>
        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition w-40 block mx-auto">
          <a href="https://github.com/nikhil68596/RuVerify" target="_blank">
            Github Link
          </a>
        </button>
      </div>
    ),
  },
];

const Projects = () => {
  return (
    <div className="projects">
      <h1 className="text-xl text-center text-white">Projects</h1>
      <br />
      <Slideshow
        imgs={[
          "../../images/Personify.png",
          "../../images/RUAAA.png",
          "../../images/PersonalWebsite.png",
          "../../images/RUVerify.png",
        ]}
      />
    </div>
  );
};

//Generating clickable thumbnails on the side of the projects section.
const Thumbnail = ({ arr, image, index }) => {
  return (
    <div className="thumbnail flex flex-col justify-around">
      {arr.map((imgsrc, i) => (
        <img
          key={i}
          style={{ height: "50px", cursor: "pointer" }}
          src={imgsrc}
          onClick={() => image(i)}
          className={index === i ? "active" : ""}
        />
      ))}
    </div>
  );
};

//Slideshow component of images, displaying the current image
const Slideshow = ({ imgs }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [imgs]);

  return (
    <div className="slideshow flex justify-center justify-around">
      <div
        className="imgContent relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={imgs[index]} className="mainImg" alt="Project preview" />
        {isHovered && (
          <div className="hover-content absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 text-white flex items-center justify-center p-4">
            {projectContent[index]?.component}
          </div>
        )}
      </div>
      <Thumbnail arr={imgs} image={setIndex} index={index} />
    </div>
  );
};

export default Projects;
