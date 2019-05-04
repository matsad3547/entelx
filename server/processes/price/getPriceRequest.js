const { oasisEndpoint } = require('../iso/')

const getPriceRequest = node => {

  switch (true) {
    case false:
      return

    default:
      return {
        req: oasisEndpoint,
        params: ['PRC_INTVL_LMP', 'RTM'],
      }
  }
}

module.exports = getPriceRequest
