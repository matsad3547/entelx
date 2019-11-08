const cron = require('node-cron')

const updateThresholds = require('./updateThresholds')

cron.schedule('38 * * * *', updateThresholds)
