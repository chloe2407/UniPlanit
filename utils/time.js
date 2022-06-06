module.exports.calibrateTimeToUTC = (date, option) => {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
}