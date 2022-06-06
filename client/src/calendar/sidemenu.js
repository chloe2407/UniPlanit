import React from 'react';
//import all time table 
//import user timetable

var demo = [
    {
        index: 1,
        name: "foundation of cs",
        code: "csc110",
        attend: [
            {
                code: "LEC101",
                time: "place holder",
                index: 1
            },
            {
                code: "TUT001",
                time: "place holder",
                index: 2
            }
        ]
    },
    {
        index: 2,
        name: "cal with proof",
        code: "mat137",
        attend: [
            {
                code: "TUT001",
                time: "place holder",
                index: 2
            }
        ]
    }
];

var userTable = demo;

function tableToList(table){
    const listItems = table.map(course =>
        <li key={course.index}>
          {course.code}
          <ul>
            {course.attend.map(attendance =>
                <li key={attendance.index}>
                    {attendance.code}
                </li>
            )}
          </ul>
        </li>
    );
    return listItems
}

const SideMenu = () => {
    
    return (
    <>
        <div>
            <h1>your course outline</h1>
            <ul>{tableToList(userTable)}</ul>
        </div>
        <div>
            <h1>serch for course</h1>
        </div>
    </>
    )};

export default SideMenu;
