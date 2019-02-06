const {
  findMin,
  readTableRows,
} = require('../db/')

const { catchErrorsWithMessage } = require('../utils/')

const getMinDate = async (req, res) => {

  const { id } = req.params

  let interval

  const [project] = await catchErrorsWithMessage(`There was an error getting project data for project ${id}`, readTableRows)('project', {id,})

  const { nodeId } = project

  res.sseSetup()

  req.on('close', () => {
    console.log('Closing min data date connection')
    clearInterval(interval)
    res.sseClose()
  })

  await getData(res, nodeId)

  interval = setInterval( () => getData(res, nodeId), 60 * 1000)
}

const getData = async (res, nodeId) => {

  const minRes = await catchErrorsWithMessage(`There was an error finding the minimum timestamp associated with node ${nodeId}`, findMin)('price', 'timestamp', {nodeId,})

  const minDateMillis = minRes[0]['min(timestamp)']

  return res.sseSend({minDateMillis,})
}

module.exports = getMinDate
