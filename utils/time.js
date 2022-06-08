module.exports.calibrateTimeToUTC = (date, option) => {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
}

module.exports.getDate = (date, day, hour) => {
    // to be implemented
}

module.exports.dayToMs = (day) => {
    return day * 60000
}