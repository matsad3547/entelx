const { fiveMinutes } = require('../../../config/')

const getFiveMinutesFromNow = nowMoment => nowMoment.clone()
  .add(5, 'minutes')
  .valueOf()

const getOneMinuteAgo = nowMoment => nowMoment.clone()
  .subtract(1, 'minutes')
  .valueOf()

const getFirstUpdate = lastDataAgo => lastDataAgo % fiveMinutes

module.exports = {
  getFiveMinutesFromNow,
  getOneMinuteAgo,
  getFirstUpdate,
}
