const cp = require('child_process')
const mv = require('mv')
const rimraf = require('rimraf')

const buildDir = 'server/public'
const args = [ 'run build' ]
const opts = {
  stdio: 'inherit',
  cwd: 'client',
  shell: true,
}

rimraf(buildDir, () => {

  const build = cp.spawn('yarn', args, opts)

  build.on('close', () => mv('client/build', buildDir, {mkdirp: true}, err => {
      if (err) throw err
    })
  )
})
