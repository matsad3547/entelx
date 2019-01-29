const {
  findRevenueAndSoc,
  catchErrorsWithMessage,
} = require('../../utils/')

const { updateTableRow } = require('../../db/')

const updateRevenueAndSoc = (data, key, project) => {

  const {
    id,
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
    dischargeThreshold,
    chargeThreshold,
    soc,
    revenue,
  } = project

  const batterySpecs = {
    power,
    energy,
    rte,
    dischargeBuffer,
    chargeBuffer,
  }

  const currentState = {
    soc,
    revenue,
  }

  const {
    newSoc,
    newRevenue,
  } = findRevenueAndSoc(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)

  console.log('does findRevenueAndSoc work?',
  project, data,
  currentState,
  newSoc,
  newRevenue);

  return updateTableRow('project', {id,}, {soc: newSoc, revenue: newRevenue})
}

module.exports = updateRevenueAndSoc
