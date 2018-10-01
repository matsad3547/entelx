const { tsToMillis } = require('../../../utils/')

const priceRequests = [
  'PRC_INTVL_LMP',
]

const atlasRequests = [
  'ATL_APNODE&APnode_type=ALL',
  'ATL_LAP',
  'ATL_HUB',
  'ATL_RUC_ZONE_MAP',
  'ATL_TAC_AREA_MAP',
  'ATL_TIEPOINT',
  'ATL_TI',
  'ATL_PUB',
  'ATL_PUB_SCHED',
  'ATL_OSM',
  'ATL_PEAK_ON_OFF',
  'ATL_CBNODE',
  'ATL_ITC_SP',
]

const caisoTZ = 'Etc/GMT'

const caisoDataItems = {
  'PRC_INTVL_LMP': {
    'LMP_CONG_PRC': {
      key: 'congestionPrc',
      format: val => parseFloat(val),
    },
    'LMP_ENE_PRC': {
      key: 'energyPrc',
      format: val => parseFloat(val),
    },
    'LMP_LOSS_PRC': {
      key: 'lossPrc',
      format: val => parseFloat(val),
    },
    'LMP_PRC' : {
      key: 'lmp',
      format: val => parseFloat(val),
    },
    'LMP_GHG_PRC' : { //available on some nodes?
      key: 'ghgPrc',
      format: val => parseFloat(val),
    },
  },
  'ENE_WIND_SOLAR_SUMMARY': {
    'OPR_DATE': {
      key: 'timestamp',
      format: val => parseFloat(val),
    },
    'DATA_ITEM': {
      key: 'di',
      format: val => parseFloat(val),
    },
    'INTERVAL_START_GMT': {
      key: 'start',
      format: val => parseFloat(val),
    },
    'INTERVAL_END_GMT': {
      key: 'end',
      format: val => parseFloat(val),
    },
    'VALUE': {
      key: 'val',
      format: val => parseFloat(val),
    },
  },
  'ATL_APNODE&APnode_type=ALL': {
    'APNODE_NAME': {
      key: 'name',
      format: val => val,
    },
    'START_DATE_GMT': {
      key: 'start_date',
      format: val => tsToMillis(val, caisoTZ),
    },
    'END_DATE_GMT': {
      key: 'end_date',
      format: val => tsToMillis(val, caisoTZ),
    },
    'APNODE_TYPE': {
      key: 'type',
      format: val => val,
    },
    'MAX_CB_MW': {
      key: 'max_mw',
      format: val => parseFloat(val),
    },
  }
}

const caisoFormat = 'YYYYMMDDTHH:mm[-0000]'

module.exports = {
  caisoTZ,
  caisoDataItems,
  caisoFormat,
  priceRequests,
  atlasRequests,
}
