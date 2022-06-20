import React, { useEffect, useState, useRef } from 'react';
import './Cursor.css';

export default function Cursor({ addClass }) {
  const cursorRef = useRef();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (addClass) cursorRef.current.className = 'cursor';
    else cursorRef.current.className = '';
    cursorRef.current.style.top = coords.y - 7 + 'px';
    cursorRef.current.style.left = coords.x - 7 + 'px';
    cursorRef.current.style.display = 'block';
  }, [coords]);
  const cursor = <div ref={cursorRef} />;
  return cursor;
}
