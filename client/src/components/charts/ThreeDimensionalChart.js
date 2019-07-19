import * as d3 from 'd3'
import { _3d } from 'd3-3d'
import React, {useRef, useEffect} from 'react'
// import PropTypes from 'prop-types'

const ThreeDimensionalChart = ({
  data,
}) => {

  const chartRef = useRef(null)

  const width = 1000, height = 600, startAngle = Math.PI/4
  const origin = [500, -100]

  const color = d3.scaleLinear()

  useEffect(() => {

    const {
      points,
      axisLength,
    } = data

    const surface = _3d()
      .scale(10)
      .x( d => d.x )
      .y( d => d.y )
      .z( d => d.z )
      .origin(origin)
      .rotateY(startAngle)
      .rotateX(-startAngle)
      .shape('SURFACE', axisLength)

    const svg = d3.select(chartRef.current).append('g')

    const colorize = d => {
      const _y = (d[0].y + d[1].y + d[2].y + d[3].y)/4

      return d.ccw ? d3.interpolateSpectral(color(_y)) : d3.color(d3.interpolateSpectral(color(_y))).darker(2.5)
    }

    const processData = (surfaceData, millis) => {
      const planes = svg.selectAll('path').data(surfaceData, sd => sd.plane )

      planes
        .enter()
        .append('path')
        .attr('class', '_3d')
        .attr('fill', colorize)
        .attr('opacity', 0)
        .attr('stroke-opacity', 0.1)
        .merge(planes)
        .attr('stroke', 'black')
        .transition().duration(millis)
        .attr('opacity', 1)
        .attr('fill', colorize)
        .attr('d', surface.draw)

      planes.exit().remove()

      d3.selectAll('._3d').sort(surface.sort);
    }

    const init = () => {
      const yMin = d3.min(points, d => d.y )
      const yMax = d3.max(points, d => d.y )
      console.log('data?', yMax);

      color.domain([yMin, yMax])
      processData(surface(points), 1000)
    }

    init()

  }, [color, data, origin, startAngle])

  return (
    <svg width={width} height={height} ref={chartRef} />
  )
}

export default ThreeDimensionalChart
