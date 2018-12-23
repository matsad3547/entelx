const sse = (req, res, next) => {
  
  res.sseSetup = () => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
    res.write('\n')
  }

  res.sseSend = data => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
    res.flush()
  }

  res.sseClose = () => {
    res.end()
    console.log('Connection is closed');
  }

  next()
}

module.exports = sse
