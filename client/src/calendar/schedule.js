const schedule = {
    schedule1: [
        {
            courseName: "CSC110",
            courseSection: "LEC0101",
            courseDescription: "this is the course description for csc110",
            courseSession: "F",
            daysOfWeek: ["Monday", "Wednesday"],
            startTime: "09:00",
            endTime: "11:00",
            location: "In Person",
            color: 'green'
        },
        {
            courseName: "MAT137",
            courseSection: "LEC0101",
            courseDescription: "this is the course description for csc110",
            courseSession: "Y",
            daysOfWeek: ["Monday", "Wednesday"],
            startTime: "09:00",
            endTime: "10:00",
            location: "In Person",
            color: 'orange'
        },
        {
            courseName: "CSC111",
            courseSection: "LEC0101",
            courseDescription: "this is the course description for csc110",
            courseSession: "S",
            daysOfWeek: ["Tuesday", "Wednesday"],
            startTime: 9,
            endTime: 10,
            location: "In Person",
            color: 'pink'
        }
    ],
    schedule2: [
        {
            courseName: "CSC110",
            courseSection: "LEC0102",
            courseDescription: "this is the course description for csc110",
            daysOfWeek: ["Monday", "Wednesday"],
            startTime: 11,
            endTime: 14,
            location: "In Person"
        }
    ]
}

export default schedule;