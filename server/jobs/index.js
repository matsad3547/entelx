const cron = require('node-cron')

const updateThresholds = require('./updateThresholds')

cron.schedule('21 23 * * *', updateThresholds, {timezone: 'America/Denver'})
