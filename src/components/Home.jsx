import React from 'react'
import './Home.css';

const Home = () => {
  return (
    <div className = "flex justify-between text-white">
      <div id = "images" className = "flex flex-column">
        <img className = "yo" src="../src/assets/images/NikhilMunagala.png"/>
        <div>
          <img className = "img1" src="../src/assets/images/Pickleball.png"/>
          <img className = "img2" src="../src/assets/images/Netflix.png"/>
        </div>
      </div>
      <div className = "flex-col pl-4">
        <h5>Hey, my name is Nikhil Munagala!</h5>
        <br/>
        <p>As a recent Computer Science graduate at 
          Rutgers University and a hackathon enthusiast, I have immersed myself in programming by 
          developing innovative solutions to everyday problems. I am up-to-date in the latest full-stack 
          technologies and have 1-2 years experience in designing scalable applications 
          through them. 
          <br />
          <br />
          Right now, I am thoroughly interested in the fields of cloud computing and automation. 
          After being AWS Solutions Architect certified in the Associate level
          along with currently assisting in the innovation of an auomated job application tracking tool that won iCIMS-sponsored first place prize
          at HackRU Spring 2025, I have exceled my passion and am curious to continuously improve my skills and expertise in these areas. 
          <br/> 
          <br/> 
          Overall, I have an enormous passion for tech in its' various popular fields,
          and am hungry to learn more! In my free time, I love to play pickleball, 
          binge watch the latest tv shows on Netflix (ex.Squid Game),
          and socialize with my friends. 

          <br/> 
          <br/> 
          By the way, try hovering onto the image in the left and see what will happen!!
        </p>

      </div>
    </div>
  )
}

export default Home