const { tsToMillis } = require('../../../utils/')

const priceRequests = [
  'PRC_INTVL_LMP',
]

const apNodeTypes = [
  'POD',
  'AG',
  'CPZ',
  'ASR',
  'ASP',
  'EPZ',
  'SPZ',
  'DASP',
  'DEPZ',
  'TH',
  'DPZ',
  'DCA',
  'CASP',
  'EIMT'
]

const atlasRequests = [
  'ATL_APNODE&APnode_type=ALL', //ap nodes do not correspond with location nodes
  'ATL_LAP', //correspond to CA location nodes
  'ATL_HUB', //only 3 hub nodes
  'ATL_RUC_ZONE_MAP', //Residual Unit Commitment (RUC) - for the day ahead market - 2539 items
  'ATL_TAC_AREA_MAP', //Transmission Access Charge (TAC) - 2528 items
  'ATL_TIEPOINT', //Tie Points - 73 items
  'ATL_TI', //Transmission Interfaces - 47 items
  'ATL_PUB',
  'ATL_PUB_SCHED',
  'ATL_OSM',
  'ATL_PEAK_ON_OFF',
  'ATL_CBNODE', //3113 Items - These nodes correspond to the locational nodes
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
    'VALUE': {
      key: 'val',
      format: val => parseFloat(val),
    },
    'INTERVAL_START_GMT': {
      key: 'start',
      format: val => tsToMillis(val, caisoTZ),
    },
    'INTERVAL_END_GMT': {
      key: 'end',
      format: val => tsToMillis(val, caisoTZ),
    },
  },
  'ATL_APNODE&APnode_type=ALL': {
    'APNODE_NAME': {
      key: 'name',
      format: val => val,
    },
    'APNODE_TYPE': {
      key: 'apnode_type',
      format: val => val,
    },
    'MAX_CB_MW': {
      key: 'max_mw',
      format: val => parseFloat(val),
    },
    'START_DATE_GMT': {
      key: 'start_date',
      format: val => tsToMillis(val, caisoTZ),
    },
    'END_DATE_GMT': {
      key: 'end_date',
      format: val => tsToMillis(val, caisoTZ),
    },
  },
  'ATL_LAP': {
    'APNODE_NAME': {
      key: 'name',
      format: val => val,
    },
    'APNODE_TYPE': {
      key: 'apnode_type',
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
  },
  'ATL_HUB': {
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
  },
  'ATL_CBNODE': {
    'NODE_NAME': {
      key: 'name',
      format: val => val,
    },
    'TIE_NAME': {
      key: 'tie_name',
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
  },
  'ATL_RUC_ZONE_MAP': {
    'PNODE_NAME': {
      key: 'name',
      format: val => val,
    },
    'RUC_ZONE_NAME': {
      key: 'ruc_zone_name',
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
  },
  'ATL_TAC_AREA_MAP': {
    'PNODE_NAME': {
      key: 'name',
      format: val => val,
    },
    'TAC_AREA_NAME': {
      key: 'ruc_zone_name',
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
  },
  'ATL_TIEPOINT': {
    'TI_NAME': {
      key: 'ti_name',
      format: val => val,
    },
    'TIEPOINT_NAME': {
      key: 'tiepoint_name',
      format: val => val,
    },
    'TSIN_NAME': {
      key: 'tsin_name',
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
  },
  'ATL_TI': {
    'TI_NAME': {
      key: 'ti_name',
      format: val => val,
    },
    'TI_DIRECTION': {
      key: 'ti_direction',
      format: val => val,
    },
    'TI_TYPE': {
      key: 'ti_type',
      format: val => val,
    },
    'TI_WECC': {
      key: 'ti_wecc',
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
  },
}

const caisoFormat = 'YYYYMMDDTHH:mm[-0000]'

module.exports = {
  caisoTZ,
  caisoDataItems,
  caisoFormat,
  priceRequests,
  atlasRequests,
}
