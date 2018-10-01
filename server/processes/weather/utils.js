const { millisToSeconds } = require('../../utils/')

const getTimestamps = (adjStartMillis, adjEndMillis) => {

  const diff = (adjEndMillis - adjStartMillis) / (60 * 60 * 1000)

  return Array.apply(null, Array(Math.ceil(diff/24)))
    .map( (time, i) => millisToSeconds(adjStartMillis + (i * 24 * 60 * 60 * 1000)) )
}

module.exports = {
  getTimestamps,
}
