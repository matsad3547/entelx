const compression = require('compression')

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

const getCompressionOptions = (req, res) => {

  return {
    filter: shouldCompress,
  }
}

module.exports = getCompressionOptions
