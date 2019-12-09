const {
  findMin,
  readTableRows,
} = require('../db/').connections

const { catchErrorsWithMessage } = require('../utils/')

const getMinDate = async (req, res, next) => {

  const { id } = req.params

  let interval

  const [project] = await readTableRows('project', {id,})

  if (!project) {
    return next(`Project ${id} is no longer available`)
  }

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

  const minDatetime = minRes[0]['min(timestamp)']

  return res.sseSend({minDatetime,})
}

module.exports = getMinDate
