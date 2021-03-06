const { findRevenueAndCharge } = require('../../utils/')

const { updateTableRow } = require('../../db/').connections

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

  const newVals = findRevenueAndCharge(data, key, batterySpecs, currentState, chargeThreshold, dischargeThreshold)

  return updateTableRow('project', {id,}, {
    charge: newVals.charge,
    revenue: newVals.revenue,
    status: newVals.status,
  })
}

module.exports = updateRevenueAndSoc
