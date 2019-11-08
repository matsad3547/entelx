const cron = require('node-cron')

const updateThresholds = require('./updateThresholds')

cron.schedule('41 * * * *', updateThresholds)
