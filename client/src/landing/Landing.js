import React, { useState, useEffect } from 'react';
import Cursor from './Cursor';
import Scene from './Scene';
import './Cursor.css';
import Loading from 'components/Loading';

const Landing = () => {
  const [addClass, setAddClass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const handleMouseEnter = () => {
    setAddClass(true);
  };
  const handleMouseLeave = () => {
    setAddClass(false);
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: '#22333b', cursor: 'none' }}
    >
      <Cursor addClass={addClass} />
      <Scene width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

export default Landing;
