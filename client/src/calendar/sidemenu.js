import React, { useEffect, useState } from 'react'
import courseData from './data/course_and_title.json'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { createFilterOptions } from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import Radio from '@mui/material/Radio'
import Divider from '@mui/material/Divider'
import RadioGroup from '@mui/material/RadioGroup'
import useAuth from '../context/Auth'

const demo = [
    { code: 'csc110', name: 'foundation of cs', index: 1, select: false, attendance: [{ index: 3, select: true, code: 'tut100' }, { index: 2, select: false, code: 'lec100' }] },
    { code: 'mat137', name: 'calculus with proof', index: 2, select: true, attendance: [{ index: 1, select: false, code: 'tut222' }, { index: 2, select: true, code: 'lec601' }] }
]

const SideMenu = () => {

    const [input, setInput] = useState({ code: "", university: "uoft", term: "" });
    const [data, setData] = useState()
    const [tempData, setTempData] = useState()
    const [userData, setUserData] = useState(demo)
    const [edit, setEdit] = useState(false)
    const { user } = useAuth()

    function handleChange(option, e) {
        if (option === 'code') {
            setInput({
                ...input,
                code: e.target.value
            })
        } else if (option === 'university') {
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

    function handleBoxClick(courseIndex, attendIndex, clicked) {
        if (attendIndex === undefined) {
            setUserData(userData.map(course => {
                if (course.index === courseIndex) {
                    return {
                        ...course,
                        select: clicked
                    };
                }
                else {
                    return course;
                }
            }))
        }
        else {
            setUserData(userData.map(course => {
                if (course.index === courseIndex) {
                    return {
                        ...course,
                        attendance: course.attendance.map(attendance => {
                            if (attendance.index === attendIndex) {
                                return {
                                    ...attendance,
                                    select: clicked
                                };
                            }
                            else {
                                return attendance;
                            }
                        })
                    };
                }
                else {
                    return course;
                }
            }))
        }

    }

    const fetchCourse = () => {
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

    function Editing() {
        return (
            <>
                <p>editing</p>
                {/* display edit screen uwu */}
            </>
        )
    }

    return (

        <Box mt={2} sx={{
            // backgroundColor: theme.palette.primary.main, 
            // color: theme.palette.secondary.contrastText
        }}>
            {/* <button onClick={fetchStuff}>
            Click me
        </button>
        {
            data ? data.map(d => {
                <div>{d}</div>
            }) : ''
        } */}
            <Typography variant='h4'>Course Search</Typography>
            {edit
                ? <Editing />
                :
                <>
                    <UserCourses userData={userData} handleClick={handleBoxClick} />
                    <SearchBar handleChange={handleChange} input={input} />
                </>
            }
            <button onClick={() => setEdit(!edit)}>
                click to edit or end edit
            </button>
        </Box>
    )
}

function UserCourses({ userData, handleClick }) {
    return (
        <List>
            {userData.map(course =>
                <>
                    <ListItem sx={{ flexDirection: 'column', alignItems: 'baseline', pt: 0, pb: 0 }}>
                        <Typography>
                            <Checkbox
                                checked={course.select}
                                onChange={e => {
                                    handleClick(course.index, undefined, e.target.checked)
                                }}
                            />
                            [{course.code}] {course.name}
                        </Typography>
                        <List sx={{ p: 0 }}>
                            {course.attendance.map(attendance =>
                                <ListItem sx={{ pb: 0, pt: 0 }} key={attendance.index}>
                                    <Checkbox
                                        checked={course.select || attendance.select}
                                        onChange={e => handleClick(course.index, attendance.index, e.target.checked)}
                                    />
                                    <Typography>{attendance.code} </Typography>
                                </ListItem>
                            )}
                        </List>
                    </ListItem>
                    <Divider sx={{ mt: 1, mb: 1, mx: 2 }} />
                </>
            )}
        </List>
    )
}

function SearchBar() {
    const filterOptions = createFilterOptions({
        limit: 10,
        ignoreCase: true
    })
    const terms = ['F', 'S', 'Y']
    return (
        <Box mb={2}>
            {/* <input
            placeholder="Search Course Code..."
            value={input.code}
            onChange={e => handleChange('code', e)}
            /> */}
            <Container>
                <FormGroup sx={{ mb: 1 }}>
                    <FormLabel id='search-label' sx={{ textAlign: 'left', mb: 2 }}>Search Course</FormLabel>
                    <Autocomplete
                        sx={{ mb: 2 }}
                        disablePortal
                        id="search-course"
                        options={courseData}
                        filterOptions={filterOptions}
                        renderInput={(params) => <TextField {...params} label='Search Course' />} />
                    <FormLabel id="term-label" sx={{ textAlign: 'left' }}>Term</FormLabel>
                    <RadioGroup row>
                        {
                            terms.map(t =>
                                <FormControlLabel key={t}
                                    value={t}
                                    control={<Radio />}
                                    label={t}
                                />
                            )
                        }</RadioGroup>
                </FormGroup>
                <Button color='primary' variant='outlined'>
                    Add course
                </Button>
            </Container>
            {/* add the displayed course, on change for button click to add: send request to update backend data*/}
        </Box>

    )
}

export default SideMenu
