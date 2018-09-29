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
      eim_area: obj.a,
      lat: obj.c[0],
      lng: obj.c[1],
    })
  )

const parseAtlasData = (query, data) => {
  console.log('data: ', data.OASISMaster.MessagePayload.RTO.ATLS_ITEM.length);
  return data.OASISMaster.MessagePayload.RTO.ATLS_ITEM.map( obj => ({
    'name': obj.ATLS_DATA.APNODE_NAME._text,
    'start_date': obj.ATLS_DATA.START_DATE_GMT._text,
    'end_date': obj.ATLS_DATA.END_DATE_GMT._text,
    'type': obj.ATLS_DATA.APNODE_TYPE._text,
    'max_mw': obj.ATLS_DATA.MAX_CB_MW._text,
    })
  )
}

module.exports = {
  parsePriceData,
  parseNodeData,
  parseAtlasData,
}
