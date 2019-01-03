const { getPriceRequest } = require('../processes/')

const args = JSON.parse(process.argv[2])

const {
  node,
} = args

const {
  req,
  params,
} = getPriceRequest(node)

let n = 0


const doThing = () => console.log('doing shit, dicks!', n)

doThing()

const int = setInterval( () => {
  n++
  doThing()
  if (n > 3) {
    process.exit()

  }
}, 1000)

process.on('exit', () => {
  console.log('exiting!');
  clearInterval(int)
})
