const {
  caisoDataItems,
  caisoTZ,
} = require('./config')

const { tsToMillis } = require('../../../utils')

const parsePriceData = (query, data) => {
  const reportItems = data.OASISReport.MessagePayload.RTO.REPORT_ITEM

  return reportItems.reduce( (arr, item) => [...arr, ...item.REPORT_DATA], [] )
  .map( rd => {
    const dataItem = rd.DATA_ITEM._text
    const dataItemFormat = caisoDataItems[query][dataItem]
    return {
      timestamp: tsToMillis(rd.INTERVAL_START_GMT._text, caisoTZ),
      [dataItemFormat.key]: dataItemFormat.format(rd.VALUE._text),
    }
  })
  .sort( (a, b) => a.timestamp - b.timestamp )
  .reduce( (acc, next) => {
    const lastItemIndex = acc.length - 1
    const accHasContent = acc.length > 0

    return (accHasContent && acc[lastItemIndex].timestamp === next.timestamp ) ?
    [
      ...acc.slice(0, lastItemIndex),
      {
        ...next,
        ...acc[lastItemIndex],
      },
    ] :
    [
      ...acc,
      next,
    ]
  }, [])
}

const parseNodeData = json => json.l[2].m.map( obj => ({
      name: obj.n,
      type: obj.p,
      control_area: obj.a,
      lat: obj.c[0],
      lng: obj.c[1],
    })
  )

const parseControlAreaData = json => json.control_areas.map( obj => ({
      control_area: obj.short,
      name: obj.name,
      full_name: obj.fullname,
      lat: obj.lat,
      lng: obj.long,
    })
  )

const parseAtlasData = (query, data) => {

  const dataItemFormat = caisoDataItems[query]

  return data.OASISMaster.MessagePayload.RTO.ATLS_ITEM.map( d => Object.keys(dataItemFormat).reduce( (obj, k) => ({
      ...obj,
      [dataItemFormat[k].key]: dataItemFormat[k].format(d.ATLS_DATA[k]._text),
    }), {})
  )
}

module.exports = {
  parsePriceData,
  parseNodeData,
  parseAtlasData,
  parseControlAreaData,
}
