const timeoutTest = () => {
  console.log('starting...');
  let n = 0

  const timeout = () => {
    const t = setTimeout( () => {
      n++
      console.log('n in timeout:', n, Date.now())
      if(n < 10) {
        timeout()
      }
      else {
        console.log('canceling timeout', Date.now())
        clearTimeout(t)
        return 'finished!'
      }
    }, 3000)
  }
  timeout()
}

module.exports = timeoutTest
