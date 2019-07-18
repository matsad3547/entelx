import * as d3 from 'd3'
import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

const ThreeDimensionalChart = ({
  data,
}) => {

  const dataFromFormular = (func) => {
    var output=[];
    for(var x=-20;x<20;x++){
      var f0=[];
      output.push(f0);
      for(var y=-20;y<20;y++){
          f0.push(func(x,y));
      }
    }
    return output;
  }

  const surfaces = [
    {
      name: 'Dataset 1',
      data: dataFromFormular(function(x,y){
          return Math.sin(Math.sqrt(x*x+y*y)/5*Math.PI)*50;
        })
    },
    {
      name: 'Dataset 2',
      data: dataFromFormular(function(x,y){
          return Math.cos(x/15*Math.PI)*Math.cos(y/15*Math.PI)*60+Math.cos(x/8*Math.PI)*Math.cos(y/10*Math.PI)*40;
        })
    },
    {
      name: 'Dataset 3',
      data: dataFromFormular(function(x,y){
          return -(Math.cos(Math.sqrt(x*x+y*y)/6*Math.PI)+1)*300/(Math.pow(x*x+y*y+1,0.3)+1)+50;
        })
    }
  ]

  const selected = surfaces[0]

  const chartRef = useRef(null)

  var yaw=0.5,pitch=0.5, width=700, height=400, drag=false;

  useEffect(() => {
    const svg=d3.select(chartRef.current)
              .append('svg')
                .attr('height',height)
                .attr('width',width);

    const group = svg.append("g");

    console.log('group:', group.data([surfaces[0].data]));

    group.data([surfaces[0].data])
    .surface3D(width,height)
      .surfaceHeight(function(d){
        return d;
      }).surfaceColor(function(d){
        var c=d3.hsl((d+100), 0.6, 0.5).rgb();
        return "rgb("+parseInt(c.r)+","+parseInt(c.g)+","+parseInt(c.b)+")";
      });
  }, [data, height, width, surfaces])

  return (
    <div ref={chartRef}/>
  )
}

export default ThreeDimensionalChart
