const sse = (req, res, next) => {

  let int

  res.sseSetup = () => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
    res.write('\n')

    int = setInterval( () => {
      const now = Date.now()
      res.write(`event: ping\ndata: ${JSON.stringify({time: now})}\n\n`)
      res.flush()
    }, 30 * 1000)
  }

  res.sseSend = data => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
    res.flush()
  }

  res.sseClose = () => {
    res.end()
    int && clearInterval(int)
    console.log('Connection is closed');
  }

  next()
}

module.exports = sse
