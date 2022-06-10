const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

module.exports.toUTC = date => date.utc().format()

module.exports.toCurrent = date => date.tz(dayjs.tz.guess()).format()

module.exports.getEventDateTime = (date, day, hour) => {
    // day = monday hour = 11:00
    const weekStart = date.startOf('week')
    // map day of week to num
    const stringToInt = {
        'Sunday': 0,
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6
    }
    const hourNum = parseInt(hour.substring(0, 2))
    const startTime = weekStart.set('day', stringToInt[day]).set('hour', hourNum)
    return startTime
}