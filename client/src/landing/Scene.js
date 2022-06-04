import React, { useEffect, useState, useRef } from 'react'
import Matter, { Bodies, Common, Render, Svg } from 'matter-js'
import theme from '../theme/theme'

export default function Scene({ width, height, children }) {
    const canvaRef = useRef()
    // const screenSize = useState([])
    useEffect(() => {
        const Engine = Matter.Engine,
            Runner = Matter.Runner,
            Composite = Matter.Composite,
            Composites = Matter.Composites,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Vector = Matter.Vector,
            Bodies = Matter.Bodies
        Common = Matter.Common

        Common.setDecomp(require('pathseg'))

        // const width = canvaRef.current
        // const height = canvaRef.current
        console.log(canvaRef.current)
        // console.log(height)
        const engine = Engine.create({
            gravity: {
                scale: 0
            }
        }),
            world = engine.world
        const render = Render.create({
            element: canvaRef.current,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                // showVelocity: true,
                // showPositions: true,
                background: theme.palette.primary.main
            }
        })
        Render.run(render)

        const runner = Runner.create()
        Runner.run(runner, engine)

        const colors = ['#f55a3c', '#063e7b','#f5d259']

        // the floor
        const wall = (x, y, width, height) => {
            return Bodies.rectangle(x, y, width, height, {
                isStatic: true,
                render: {
                    lineWidth: 1
                },
                render: {
                    fillStyle: theme.palette.primary.main
                }
            })
        }

        // x y width height
        const floorCenter = Math.floor(width / 2)
        const wallCenter = Math.floor(height / 2)
        Composite.add(world, [
            // left
            wall(0, wallCenter, 10, height),
            // right
            wall(width, wallCenter, 10, height),
            // top
            wall(floorCenter, 0, width, 10),
            // bottom
            wall(floorCenter, height - 100, width, 10)
        ])

        Composite.add(world, Bodies.rectangle(floorCenter, wallCenter - 200, 400, 60, {
            isStatic: true,
            // collisionFilter: {
            //     group: -1
            // },
            render: {
                sprite: {
                    texture: './MyCalendar.png'
                }
            }
        }))

        // const myCircle = Bodies.circle(400, 400, 30,{
        //     force: Vector.create(0.01, 0.01)
        // })
        // Composite.add(world, myCircle)
        // Body.setAngularVelocity(myCircle, 1)
        // Body.applyForce(myCircle, myCircle.position, Vector.create(0.01, 0.01))
        const getRandForce = (min, max) => {
            let x = Math.random() * (max + min) + min
            x *= Math.round(Math.random()) ? 1 : -1
            let y = Math.random() * (max + min) + min
            y *= Math.round(Math.random()) ? 1 : -1
            return Vector.create(x, y)
        }

        const getRandNum = (min, max) => Math.random() * (max - min) + min

        Composite.add(world,
            Composites.stack(150, 100, 4, 2, 5, 5, (x, y, column, row) => {
                return Bodies.circle(x, y, Math.floor(getRandNum(150, 100)), {
                    density: 0.0015,
                    frictionAir: 0,
                    force: getRandForce(0.02, 0.03),
                    restitution: 0.3,
                    collisionFilter: {
                        group: -1
                    },
                    render: {
                        strokeStyle: Common.choose(colors),
                        opacity: getRandNum(0.6, 0.7)
                    }
                })
            }
            ))
        const mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constrain: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            })

        // const loadSvg = (url) => {
        //     return fetch(url)
        //         .then(response => response.text())
        //         .then(raw => new window.DOMParser().parseFromString(raw, 'image/svg+xml'))
        // }

        // loadSvg('./MyCalendar.svg')
        //     .then(root => {
        //         const path = root.querySelector('path')
        //         const vertexSets = Svg.pathToVertices(path, 30)
        //         Composite.add(world, Bodies.fromVertices(400, 90, vertexSets, {
        //         } ))
        //             // .map(path => Svg.pathToVertices(path, 30))
        //         // Composite.add(world, Bodies.fromVertices(400, 90, vertexSets, {
        //         //     render: {
        //         //         lineWidth: 1
        //         //     }
        //         // }))
        //     }, true)
        Composite.add(world, mouseConstraint)
        render.mouse = mouse
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height }
        })
    }, [])
    return <div ref={canvaRef} />
}