const {
  findRevenueAndCharge,
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
    charge,
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
    charge,
    revenue,
  }

  const newVals = findRevenueAndCharge(data, key, batterySpecs, currentState, dischargeThreshold, chargeThreshold)

  return updateTableRow('project', {id,}, {charge: newVals.charge , revenue: newVals.revenue })
}

module.exports = updateRevenueAndSoc
