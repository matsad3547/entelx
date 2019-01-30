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

  const newVals = findRevenueAndSoc(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)

  return updateTableRow('project', {id,}, {soc: newVals.soc , revenue: newVals.revenue })
}

module.exports = updateRevenueAndSoc
