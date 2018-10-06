const fs = require('fs')

const writeToFile = (data, path, fileName) => {
  const writeFile = fs.createWriteStream(`${path}/${fileName}`)
  writeFile.write(data)
  writeFile.on('error', err => {
    throw new Error(`There was an error writing to file ${fileName} at ${path}: ${err}`)
  })
  writeFile.on('finish', () => {
    console.log(`${fileName} has been written`)
  })
  writeFile.end()
}

module.exports = {
  writeToFile,
}
