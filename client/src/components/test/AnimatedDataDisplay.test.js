import React from 'react'
import { render, getByTestId, cleanup} from "react-testing-library"
import AnimatedDataDisplay from '../AnimatedDataDisplay'

// import * as jest from 'jest'

describe('AnimatedDataDisplay', () => {

  // console.log('jest???', jest);

  beforeEach( () => {
    jest.useFakeTimers()
  })
  afterEach(cleanup)

  test('should do things', () => {
    const display = render(<AnimatedDataDisplay value={5} seconds={5} />,)
    console.log('display???', display);
    // render(<AnimatedDataDisplay value={6} seconds={5} />)
    // jest.advanceTimersByTime(1000)
    // const actual = getByTestId(display, 'displayVal')
    // const expected = 5.2
    // expect(actual).toBe(expected)
  })
})
