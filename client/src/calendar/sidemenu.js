import React, { useEffect, useState } from 'react'

const demo = [
    {code:'csc110', name:'foundation of cs', index:1, select: false, attendance: [{index: 3, select:true, code: 'tut100'}, {index: 2, select:false, code: 'lec100'}]},
    {code:'mat137', name:'calculus with proof', index:2, select: true, attendance: [{index: 1, select:false, code: 'tut222'}, {index: 2, select:true, code: 'lec601'}]}
]

const SideMenu = () => {

    const [input, setInput] = useState({code:"", university:"uoft", term:""});
    const [data, setData] = useState()
    const [userData, setUserData] = useState(demo)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetchStuff()
    }, [input])

    function handleChange(option, e){
        if (option === 'code'){
            setInput({
                ...input,
                code: e.target.value
            })
        } else if (option === 'university'){
            setInput({
                ...input,
                university: e.target.value
            })
        } else {
            setInput({
                ...input,
                term: e.target.value
            })
        }
    }
    
    function handleBoxClick(courseIndex, attendIndex, clicked){
        if(attendIndex===undefined){
            setUserData(userData.map(course => {
                if (course.index === courseIndex){
                    return {
                        ...course, 
                        select:clicked}; 
                }
                else{
                    return course;
                }
            }))
        }
        else{
            setUserData(userData.map(course => {
                if (course.index === courseIndex){
                    return {
                        ...course,
                        attendance: course.attendance.map(attendance =>{
                            if (attendance.index === attendIndex){
                                return {
                                    ...attendance,
                                    select:clicked};
                            }
                            else{
                                return attendance;
                            }
                        })
                    };
                }
                else{
                    return course;
                }
            }))
        }
        
    }

    const fetchStuff = () => {
        fetch("/courses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseCode: input.code,
                university: input.university,
                term: input.term
            })
        })
            .then(res => res.json())
            .then(data => {
                setData(data)
                console.log(data)
            });
        // fetchUser;
    }

    // const fetchUser = () =>{
    //     fetch("/users/getUserCourse", {
    //         method: 'GET'
    //     })
    //         .then(res => res.json())
    //         .then(userData => {
    //             setUserData(userData)
    //         })
    // }

    function Editing(){
        return(
            <>
            <p>editing</p>
            {/* display edit screen uwu */}
            </>
        )
    }

    return (
        <>
        {/* <button onClick={fetchStuff}>
            Click me
        </button>
        {
            data ? data.map(d => {
                <div>{d}</div>
            }) : ''
        } */}
        {edit ? 
            <Editing/> 
            : 
            <>
            <div>
            <UserCourses userData={userData} handleClick={handleBoxClick}/>
            </div>
            <SearchBar handleChange={handleChange} input={input}/>
            <p>{input.code}</p>
            <p>{input.term}</p>
            </>}
        <button onClick={() => setEdit(!edit)}>
            click to edit or end edit
        </button>
        </>
    )
}

function UserCourses ({userData, handleClick}){
    const lst = userData.map(course =>
        <li key={course.index}>
            <input
                type="checkbox"
                checked={course.select}
                onChange={e => {
                    handleClick(course.index, undefined, e.target.checked)
                }}
            />
            [{course.code}] {course.name} 
          <ul>
            {course.attendance.map(attendance =>
                <li key={attendance.index}>
                    <input
                        type="checkbox"
                        checked={course.select || attendance.select}
                        onChange={e => {
                            handleClick(course.index, attendance.index, e.target.checked)
                        }}
                    />
                    {attendance.code}
                </li>
            )}
          </ul>
        </li>
    );
    return(
        <ul>{lst}</ul>
    )
}

function SearchBar ({handleChange, input}){
      return (
        <div>
        <label>
            <input
            placeholder="Search Course Code..."
            value={input.code}
            onChange={e => handleChange('code', e)}
            />
        </label>
        <label>
            <input
            placeholder="Search Course Term..."
            value={input.term}
            onChange={e => handleChange('term', e)}
            />
        </label>
        {/* add the displayed course, on change for button click to add: send request to update backend data*/}
        </div>
    )
}

export default SideMenu
