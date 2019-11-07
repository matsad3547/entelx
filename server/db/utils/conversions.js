const moment = require('moment-timezone')

const { gmtTZ } = require('../../config/')

const snakeToCamel = snakeStr => snakeStr.toLowerCase()
  .replace(/(_\w)/g, m => m[1].toUpperCase())

const camelToSnake = camelStr => camelStr.replace(/[A-Z]/g, m => ['_', m[0].toLowerCase()].join(''))

const convertObj = snakeObj => typeof snakeObj === 'object' ? Object
  .keys(snakeObj)
  .reduce( (obj, k) => ({
      ...obj,
      [snakeToCamel(k)]: snakeObj[k]
    }), {}) : snakeObj

const datetimeToIso = datetimeString => {
  return moment.tz(datetimeString, gmtTZ).toISOString()
}

module.exports = {
  snakeToCamel,
  camelToSnake,
  convertObj,
  datetimeToIso,
}
