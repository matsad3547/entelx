import React, { PureComponent } from 'react'

class Test extends PureComponent {

  componentWillMount() {

    // const parser = new DOMParser()

      fetch(`http://oasis.caiso.com/oasisapi/SingleZip?queryname=SLD_REN_FCST&market_run_id=DAM&startdatetime=20180919T07:00-0000&enddatetime=20180920T07:00-0000&version=1`, {mode: 'no-cors'})
        .then(res => res.text())
        .then( res => console.log('res at test:', res))
        // .then(xmlString => {
        //   parseString(xmlString, {trim: true}, (err, result) => {
        //     if (err) {
        //       console.log('at if');
        //       reject(err)
        //     }
        //     else {
        //       return result
        //     }
        //   })
        // })
        // .then(res => resolve(JSON.stringify(res)))
        .catch(err => console.error(`Error at test: ${err}`))
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
      </div>
    )
  }
}

export default Test
