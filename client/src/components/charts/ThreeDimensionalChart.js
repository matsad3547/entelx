import * as d3 from 'd3'
import { _3d } from 'd3-3d'
import React, {useRef, useEffect} from 'react'
// import PropTypes from 'prop-types'

// import './ThreeDimensionalChart.css'

const ThreeDimensionalChart = ({
  data,
}) => {

  const chartRef = useRef(null)

  const width = 600, height = 400

  const color = d3.scaleLinear()

  useEffect(() => {
    const origin = [width/2, height/2], j = 16, startAngle = Math.PI/4
    const svg = d3.select(chartRef.current).append('g')
    let points = []
    // var mx, my, mouseX, mouseY;
    // var svg = d3.select(chartRef.current).call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd)).append('g');
    // var mx, my, mouseX, mouseY;

    const surface = _3d()
      .scale(10)
      .x( d => d.x )
      .y( d => d.y )
      .z( d => d.z )
      .origin(origin)
      .rotateY(startAngle)
      .rotateX(-startAngle)
      .shape('SURFACE', j*2)

    const processData = (data, millis) => {
      const planes = svg.selectAll('path').data(data, d => d.plane )

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

    const colorize = d => {
      // console.log('data point at colorize:', d);
      const _y = (d[0].y + d[1].y + d[2].y + d[3].y)/4

      return d.ccw ? d3.interpolateSpectral(color(_y)) : d3.color(d3.interpolateSpectral(color(_y))).darker(2.5)
    }

    const init = eq => {
      points = []

        for(var z = -j; z < j; z++){
          for(var x = -j; x < j; x++){
            points.push({
              x: x,
              y: eq(x, z),
              z: z
            })
        }
      }

      const yMin = d3.min(points, d => d.y )
      const yMax = d3.max(points, d => d.y )

      color.domain([yMin, yMax]);
      processData(surface(points), 1000);
    }

    const dataEq = (x, z) => Math.cos(Math.sqrt(x*x+z*z)/5*Math.PI) * 5

    init(dataEq)
  }, [color, data])

  return (
    <svg width={width} height={height} ref={chartRef} />
  )
}

export default ThreeDimensionalChart