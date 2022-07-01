import React from 'react';
import './about.css';
import AboutDescription from './components/AboutDescription';
import Banner from './components/Banner';
import TeamMember from './components/Team';
import Contact from './components/Contact/Contact';

const About = () => {
  return (
    <div>
      <Banner />
      <AboutDescription />
      {/* <TeamMember /> */}
      <Contact />
    </div>
  );
};

export default About;
