const { oasisEndpoint } = require('./iso/')

const getPriceRequest = node => {

  switch (true) {
    case false:

    default:
      return {
        req: oasisEndpoint,
        params: ['PRC_INTVL_LMP', 'RTM'],
      }
  }
}

module.exports = getPriceRequest
