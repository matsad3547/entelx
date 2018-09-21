const rawData = [
  {
    timestamp: 1537480500000,
    congestionPrc: 0,
    energyPrc: 24.20505,
    lossPrc: -0.54703,
    lmp: 23.65802,
  },
  {
    timestamp: 1537480800000,
    congestionPrc: 0,
    energyPrc: 22.86465,
    lossPrc: -0.42071,
    lmp: 22.44394,
  },
  {
    timestamp: 1537480800000,
    temperature: 86.97,
    windSpeed: 1.31,
    windBearing: 303,
    cloudCover: 0,
  },
  {
    timestamp: 1537481100000,
    congestionPrc: 0,
    energyPrc: 22.94807,
    lossPrc: -0.42224,
    lmp: 22.52583,
  },
  {
    timestamp: 1537481400000,
    congestionPrc: 0,
    energyPrc: 22.90489,
    lossPrc: -0.42145,
    lmp: 22.48344,
  },
  {
    timestamp: 1537481700000,
    congestionPrc: 0,
    energyPrc: 23.03842,
    lossPrc: -0.37783,
    lmp: 22.66059,
  },
]

const parsedData = [
  {
    timestamp: 1537480500000,
    congestionPrc: 0,
    energyPrc: 24.20505,
    lossPrc: -0.54703,
    lmp: 23.65802,
  },
  {
    timestamp: 1537480800000,
    congestionPrc: 0,
    energyPrc: 22.86465,
    lossPrc: -0.42071,
    lmp: 22.44394,
    temperature: 86.97,
    windSpeed: 1.31,
    windBearing: 303,
    cloudCover: 0,
  },
  {
    timestamp: 1537481100000,
    congestionPrc: 0,
    energyPrc: 22.94807,
    lossPrc: -0.42224,
    lmp: 22.52583,
  },
  {
    timestamp: 1537481400000,
    congestionPrc: 0,
    energyPrc: 22.90489,
    lossPrc: -0.42145,
    lmp: 22.48344,
  },
  {
    timestamp: 1537481700000,
    congestionPrc: 0,
    energyPrc: 23.03842,
    lossPrc: -0.37783,
    lmp: 22.66059,
  },
]

test('reducing data correctly should combine objects with duplicate timestamp value', () => {
  const expected = parsedData
  const actual = rawData.reduce( (agr, obj, i) =>
  i > 0 && obj.timestamp === agr[agr.length - 1].timestamp ?
  [
    ...agr.slice(0, agr.length - 1),
    {
      ...agr[agr.length - 1],
      ...obj,
    },
  ]:
  [
    ...agr,
    obj,
  ], [])
  expect(actual).toEqual(expected)
})
