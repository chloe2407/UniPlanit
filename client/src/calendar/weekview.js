import React from 'react';
import Timetable from 'react-timetable-events';

const WeekView = () => {
    return (
    <div>
        
        <Timetable 
        hoursInterval={{from: 8, to: 20}}
        events={{
            monday: [
            {
                id: 1,
                name: "Custom Event 1",
                type: "custom",
                startTime: new Date("2018-02-23T11:30:00"),
                endTime: new Date("2018-02-23T13:30:00"),
            },
            ],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
        }}
    />
    </div>
    )};

export default WeekView;
