const {
  aggregatesSelection,
  stdDevSelections,
} = require('./aggregateQueries')

const {
  getPriceRangesSelectionString
} = require('./priceRangeQueries')

module.exports = {
  aggregatesSelection,
  stdDevSelections,
  getPriceRangesSelectionString,
}
