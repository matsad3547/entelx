const getDashboardData = require('./getDashboardData')
const getHistoricalData = require('./getHistoricalData')
const getMinDate = require('./getMinDate')
const setProjectData = require('./setProjectData')
const getInsightData = require('./getInsightData')
const getRevenueSurface = require('./getRevenueSurface')
const getRevenueByThresholds = require('./getRevenueByThresholds')
const getPriceRanges = require('./getPriceRanges')

module.exports = {
  getDashboardData,
  getHistoricalData,
  setProjectData,
  getMinDate,
  getInsightData,
  getRevenueSurface,
  getRevenueByThresholds,
  getPriceRanges,
}
