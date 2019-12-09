const aggregatesSelection = `
SUM(CASE WHEN lmp > mvg_avg THEN 1 ELSE 0 END) AS above_n,
AVG(CASE WHEN lmp > mvg_avg THEN lmp END) AS above_mean,
MAX(CASE WHEN lmp > mvg_avg THEN lmp END) AS above_max,
MIN(CASE WHEN lmp > mvg_avg THEN lmp END) AS above_min,
STD(CASE WHEN lmp > mvg_avg THEN lmp END) AS above_std_dev,
SUM(CASE WHEN lmp > mvg_avg THEN 1 ELSE 0 END)/COUNT(lmp) AS above_percentage,
SUM(CASE WHEN lmp < mvg_avg THEN 1 ELSE 0 END) AS below_n,
AVG(CASE WHEN lmp < mvg_avg THEN lmp END) AS below_mean,
MAX(CASE WHEN lmp < mvg_avg THEN lmp END) AS below_max,
MIN(CASE WHEN lmp < mvg_avg THEN lmp END) AS below_min,
STD(CASE WHEN lmp < mvg_avg THEN lmp END) AS below_std_dev,
SUM(CASE WHEN lmp < mvg_avg THEN 1 ELSE 0 END)/COUNT(lmp) AS below_percentage`

const stdDevSelections = `
STD(CASE WHEN lmp > mvg_avg THEN lmp END) AS above_std_dev,
STD(CASE WHEN lmp < mvg_avg THEN lmp END) AS below_std_dev`

module.exports = {
  aggregatesSelection,
  stdDevSelections,
}
