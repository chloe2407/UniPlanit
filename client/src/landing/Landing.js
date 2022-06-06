import React, { useState, useRef, useEffect } from 'react';
import Cursor from './Cursor'
import Scene from './Scene'
import './Cursor.css'
import './Landing.css'

const Landing = () => {
    const [addClass, setAddClass] = useState(false)
    document.body.style.overflow = 'hidden'
    // checking for screen size destroys the computer
    // const [dimensions, setDimensions] = useState({
    //     height: window.innerWidth,
    //     width: window.innerWidth})
    // useEffect(() => {
    //     if (containerRef.current) {
    //         let height = containerRef.current.offsetHeight
    //         let width = containerRef.current.offsetWidth
    //     }
    // }, [])
    // useEffect(() => {
    //     const handleResize = () => {
    //         setDimensions({
    //             height: window.innerHeight,
    //             width: window.innerWidth
    //         })
    //     }
    //     window.addEventListener('resize', handleResize)
    // })
    const handleMouseEnter = () => {
        setAddClass(true)
    }
    const handleMouseLeave = () => {
        setAddClass(false)
    }
    return (
        <div onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ backgroundColor: '#22333b', cursor: 'none' }}>
            <Cursor addClass={addClass}/>
            <Scene width={window.innerWidth} height={window.innerHeight} />
        </div>
    )
}

export default Landing;