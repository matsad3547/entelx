const express = require('express')
const app = express()
const Rx = require('rxjs/Rx')

app.set('port', process.env.PORT || 3001)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"))
}

app.get('/api', (req, res) => {
  res.json({stuff: 'poop'})
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}`)
})
