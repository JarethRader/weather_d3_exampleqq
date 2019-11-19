import React, { Component } from "react";
import * as d3 from "d3";

const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 45 };
const green = "#FF6600";

class WindChart extends Component {
  state = {
    highs: null, // svg path command for all the high temps
    lows: null, // svg path command for low temps,
    // d3 helpers
    xScale: d3.scaleTime().range([margin.left, width - margin.right]),
    yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
    lineGenerator: d3.line()
  };

  xAxis = d3
    .axisBottom()
    .scale(this.state.xScale)
    .tickFormat(d3.timeFormat("%H"));
  yAxis = d3
    .axisLeft()
    .scale(this.state.yScale)
    .tickFormat(d => `${d}mph`);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const { data } = nextProps;
    const { xScale, yScale, lineGenerator } = prevState;

    // data has changed, so recalculate scale domains

    const timeDomain = d3.extent(
      data.data,
      d => d.apparentTemperatureMaxDateTime._d
    );
    const windMax = d3.max(data.data, d => d.windSpeed);

    xScale.domain(timeDomain);
    yScale.domain([0, windMax]);

    // calculate line for lows
    lineGenerator.x(d => xScale(d.apparentTemperatureMaxDateTime._d));
    // const lows = lineGenerator(data);
    // and then highs
    lineGenerator.y(d => yScale(d.windSpeed));
    const wind = lineGenerator(data.data);

    return { wind };
  }

  componentDidUpdate() {
    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }

  render() {
    return (
      <svg width={width} height={height}>
        <path d={this.state.wind} fill="none" stroke={green} strokeWidth="2" />
        <g>
          <g
            ref="xAxis"
            transform={`translate(0, ${height - margin.bottom})`}
          />
          <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
        </g>
      </svg>
    );
  }
}

export default WindChart;
