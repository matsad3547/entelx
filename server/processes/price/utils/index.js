const { fiveMinutes } = require('../../../config/')

const getFiveMinutesFromNow = nowMoment => nowMoment.valueOf() + fiveMinutes

const getOneMinuteAgo = nowMoment => nowMoment.clone()
                    .subtract(1, 'minutes')
                    .valueOf()

const getFirstUpdate = lastDataAgo => lastDataAgo % fiveMinutes

module.exports = {
  getFiveMinutesFromNow,
  getOneMinuteAgo,
  getFirstUpdate,
}
