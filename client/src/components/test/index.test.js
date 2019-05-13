import { useInterpolateValues } from '../index'

describe('useInterpolateValues', () => {

  beforeEach( () => {
    jest.useFakeTimers()
  })

  test('should do things', () => {
    const actual = useInterpolateValues(5, 5)
    jest.advanceTimersByTime(1000)
    const expected = 1
    expect(actual).toBe(expected)
  })
})
