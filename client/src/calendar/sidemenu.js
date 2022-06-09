import React from 'react';
//import all time table 
//import user timetable

//TODO:
//lock button with function
//search course by code
//make course buttons
//edit page
//course search sucks

//user courses

var demoCourses = {
    "c": {
        "s": {
            "k": {
                "1": {
                    "1": {
                        "0" : [
                            {
                                code: "LEC101",
                                time: "place holder",
                                index: 1
                            },
                            {
                                code: "LEC102",
                                time: "place holder",
                                index: 2
                            },
                            {
                                code: "TUT001",
                                time: "place holder",
                                index: 3
                            },
                            {
                                code: "TUT002",
                                time: "place holder",
                                index: 4
                            }
                        ]
                    }
                }
            },
            "c": {
                "1": {
                    "1": {
                        "0" : [
                            {
                                code: "LEC101",
                                time: "place holder",
                                index: 1
                            },
                            {
                                code: "LEC102",
                                time: "place holder",
                                index: 2
                            },
                            {
                                code: "TUT001",
                                time: "place holder",
                                index: 3
                            },
                            {
                                code: "TUT002",
                                time: "place holder",
                                index: 4
                            }
                        ],
                        "1" : [
                            {
                                code: "LEC201",
                                time: "place holder",
                                index: 1
                            },
                            {
                                code: "LEC202",
                                time: "place holder",
                                index: 2
                            },
                            {
                                code: "TUT201",
                                time: "place holder",
                                index: 3
                            },
                            {
                                code: "TUT202",
                                time: "place holder",
                                index: 4
                            }
                        ],
                        "21" : [
                            {
                                code: "LEC201",
                                time: "place holder",
                                index: 1
                            },
                            {
                                code: "LEC202",
                                time: "place holder",
                                index: 2
                            },
                            {
                                code: "TUT201",
                                time: "place holder",
                                index: 3
                            },
                            {
                                code: "TUT202",
                                time: "place holder",
                                index: 4
                            }
                        ]
                    }
                }
            }
        }
    }
};

var totalCourses = demoCourses;

var demoUser = [
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

var userTable = demoUser;


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

//search courses

function searchedToList(target, searched){
    if(searched instanceof Array){
        return (
        <>
            <li>{target}</li>
            <ul>
                {
                    searched.map(session =>
                        <li key={session.index}>
                          {session.code};
                        </li>
                    )
                }
            </ul>
        </>
        )
    }
    else{
        let overall = []
        for(const sublist in searched){
            overall.push(searchedToList(target + sublist, searched[sublist]))
        };
        return overall;
    };
}

function courseSearch(target){
    let searched = totalCourses;
    for(var i = 0; i < target.length; i++){
        searched = searched[target[i]];
        if(searched === undefined){
            return;
        }
    };
    
    return (
        <>
            {searchedToList(target, searched)}
        </>
      );
}
    

//actual side menu

const SideMenu = () => {
    
    return (
    <>
        <div>
            <h1>your course outline</h1>
            <ul>{tableToList(userTable)}</ul>
        </div>
        <div>
            <h1>search for course</h1>
            <ul>{courseSearch("cs")}</ul>
        </div>
    </>
    )};

export default SideMenu;
