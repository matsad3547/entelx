const { fiveMinutesMillis } = require('../../../config/')

const getFiveMinutesFromNow = nowMoment => nowMoment.clone()
  .add(5, 'minutes')
  .valueOf()

const getOneMinuteAgo = nowMoment => nowMoment.clone()
  .subtract(1, 'minutes')
  .valueOf()

const getFirstUpdateMillis = lastDataAgoMillis => lastDataAgoMillis % fiveMinutesMillis

module.exports = {
  getFiveMinutesFromNow,
  getOneMinuteAgo,
  getFirstUpdateMillis,
}
