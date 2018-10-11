const {
  caisoDataItems,
  caisoTZ,
} = require('./config')

const { tsToMillis } = require('../../../utils')

const parsePriceData = (query, data) => {

  const reportItems = data.OASISReport.MessagePayload.RTO.REPORT_ITEM

  return reportItems.reduce( (arr, item) => {

    const dataItem = item.REPORT_DATA[0].DATA_ITEM._text

    const dataItemFormat = caisoDataItems[query][dataItem]

    item.REPORT_DATA.forEach( rd => {

      const hasTsIndex = arr.findIndex( obj =>
        obj.timestamp === tsToMillis(rd.INTERVAL_START_GMT._text, caisoTZ) )

      hasTsIndex === -1 ?
      arr = [
        ...arr,
        {
          timestamp: tsToMillis(rd.INTERVAL_START_GMT._text, caisoTZ),
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
