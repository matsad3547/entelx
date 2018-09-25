const { caisoDataItems } = require('./config')

const { tsToMillis } = require('./utils')

const parsePriceData = (query, data) => {

  const reportItems = data.OASISReport.MessagePayload.RTO.REPORT_ITEM

  return reportItems.reduce( (arr, item) => {

    const dataItem = item.REPORT_DATA[0].DATA_ITEM._text

    const dataItemFormat = caisoDataItems[query][dataItem]

    item.REPORT_DATA.forEach( rd => {

      const hasTsIndex = arr.findIndex( obj =>
        obj.timestamp === tsToMillis(rd.INTERVAL_START_GMT._text) )

      hasTsIndex === -1 ?
      arr = [
        ...arr,
        {
          timestamp: tsToMillis(rd.INTERVAL_START_GMT._text),
          [dataItemFormat.key]: dataItemFormat.format(rd.VALUE._text),
        },
      ] :
      arr = [
        ...arr.slice(0, hasTsIndex),
        {
          ...arr[hasTsIndex],
          [dataItemFormat.key]: dataItemFormat.format(rd.VALUE._text)
        },
        ...arr.slice(hasTsIndex + 1),
      ]
    })

    return arr
  }, [])
}

const parseNodeData = json => json.l[2].m.map( obj => ({
      name: obj.n,
      type: obj.p,
      state: obj.a,
      latLng: obj.c,
    })
  )

module.exports = {
  parsePriceData,
  parseNodeData,
}
