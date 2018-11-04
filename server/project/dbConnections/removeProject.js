const knex = require('../../store/')

const removeProject = (query) => {

  const key = Object.keys(query)[0]
  const value = query[key]
  console.log('running remove project', key, value);

  knex('project')
    .where(key, value)
    .del()
    .then( rows => rows ? {success: true} : {success: false}
    )
    // .then( rows => {
    //   console.log('return value at remove project:', rows);
    //   return rows ? {success: true} : {success: false}
    // })
    // .debug()
    .catch( err => console.error(`Error at removeProject: ${err}`))
}

module.exports = removeProject
