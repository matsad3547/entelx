const mapKey = process.env.MAPBOX_KEY

const getEnv = (req, res) => res.json({
  mapKey,
})

module.exports = getEnv
