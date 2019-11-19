( async () => {

  const {
    setExitListeners,
    findThresholds,
    getDBDatetime,
    catchErrorsWithMessage,
  } = require('../../utils/')

  const {
    readTableRows,
    readTableRowsWhereBtw,
    getPriceAggregateData,
    updateTableRow,
  } = require('../../db/')

  console.time('Update project thresholds')

  const args = JSON.parse(process.argv[2])

  const {
    start,
    end,
  } = args

  const datetimes = [start, end].map( iso => getDBDatetime(iso))

  const projects = await catchErrorsWithMessage('There was an error getting all projects for updating thresholds', readTableRows)('project', {})

  await Promise.all(projects.map( async project => {

      const {
        id,
        nodeId,
        name,
        power,
        energy,
        rte,
        dischargeBuffer,
        chargeBuffer,
      } = project

      console.time(`Update thresholds for project ${name}`)

      const options = {
        power,
        energy,
        rte,
        dischargeBuffer,
        chargeBuffer,
      }

      const prices = await catchErrorsWithMessage(`There was an error getting price data for project ${id}`, readTableRowsWhereBtw)('price_with_score', {nodeId,}, 'timestamp', datetimes)

      const [
        startDatetime,
        endDatetime,
      ] = datetimes

      const initAggregate = await  getPriceAggregateData(startDatetime, endDatetime, nodeId) 

      const data = {
        timeSeries: prices,
        aggregate: initAggregate,
      }

      const { aggregate } = findThresholds(data, 'lmp', options)

      const {
        chargeThreshold,
        dischargeThreshold,
      } = aggregate

      await catchErrorsWithMessage(`There was an error updating thresholds for project ${id}`, updateTableRow)('project', {id, }, {chargeThreshold, dischargeThreshold})

      console.timeEnd(`Update thresholds for project ${name}`)
    })
  )

  setExitListeners()

  //Ignore SIGUSR2 from nodemon restart
  process.on('SIGUSR2', () => true )

  const cleanUp = code => {
    console.timeEnd('Update project thresholds')
    console.log(`Exiting "updateAllProjectThresholds"\n exit code: ${code}` )
  }

  process.on('exit', cleanUp)

  process.exit(0)
})()
