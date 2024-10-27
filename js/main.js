// Hint: This is a great place to declare your global variables

let female_data,male_data,countries = [];

// This function is called once the HTML page is fully loaded by the browser
document.addEventListener("DOMContentLoaded", function () {
  // Hint: create or set your svg element inside this function

  // Load your CSV files and store them into two arrays.
  Promise.all([
    d3.csv("data/females_data.csv"),
    d3.csv("data/males_data.csv"),
  ]).then(function (values) {
    console.log("Loaded the females_data.csv and males_data.csv");
    female_data = values[0];
    male_data = values[1];

    // Hint: This is a good spot for data wrangling
    countries = Object.keys(female_data[0]).filter((d) => d !== "Year");

    drawLolliPopChart("Argentina");
  });
});

function drawLolliPopChart(selectedCountry) {
  const svg = d3.select("svg");
  const margin = { top: 50, right: 100, bottom: 50, left: 60 };
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;

  // Clear previous chart
  const g = svg.selectAll("g.chart-container").data([null]);
  const container = g
    .enter()
    .append("g")
    .attr("class", "chart-container")
    .merge(g)
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Map the data for the selected country
  const femaleFiltered = female_data.map((d) => ({
    year: new Date(+d.Year, 0),
    employmentRate: +d[selectedCountry],
  }));

  const maleFiltered = male_data.map((d) => ({
    year: new Date(+d.Year, 0),
    employmentRate: +d[selectedCountry],
  }));

  // Create the x-axis scale
  const xScale = d3
    .scaleTime()
    .domain([new Date(1990, 0), new Date(2023, 0)]) // Date objects for the range
    .range([0, width]);

  // Create the y-axis scale
  const yScale = d3.scaleLinear().domain([0.0, 1.0]).range([height, 0]);

  // Axis transitions
  const xAxis = d3.axisBottom(xScale).ticks(d3.timeYear.every(5));
  const yAxis = d3.axisLeft(yScale).ticks(10).tickFormat(d3.format(".2f"));

  // update x-axis
  const xAxisGroup = container.selectAll(".x-axis").data([null]);
  xAxisGroup
    .enter()
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .merge(xAxisGroup)
    .transition()
    .duration(1000)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  // update y-axis
  const yAxisGroup = container.selectAll(".y-axis").data([null]);
  yAxisGroup
    .enter()
    .append("g")
    .attr("class", "y-axis")
    .merge(yAxisGroup)
    .transition()
    .duration(1000)
    .call(yAxis);

  // Update lollipops for female
  const femaleLines = container.selectAll(".female-line").data(femaleFiltered);
  femaleLines
    .enter()
    .append("line")
    .attr("class", "female-line")
    .attr("x1", (d) => xScale(d.year) + 5)
    .attr("x2", (d) => xScale(d.year) + 5)
    .attr("y1", height)
    .attr("y2", height)
    .attr("stroke", "#FF1493")
    .attr("stroke-width", 2)
    .merge(femaleLines)
    .transition()
    .duration(1000)
    .attr("x1", (d) => xScale(d.year) + 5)
    .attr("x2", (d) => xScale(d.year) + 5)
    .attr("y2", (d) => yScale(d.employmentRate));

  const femaleCircles = container
    .selectAll(".female-circle")
    .data(femaleFiltered);
  femaleCircles
    .enter()
    .append("circle")
    .attr("class", "female-circle")
    .attr("cx", (d) => xScale(d.year) + 5)
    .attr("cy", height)
    .attr("r", 5)
    .attr("fill", "#FF1493")
    .merge(femaleCircles)
    .transition()
    .duration(1000)
    .attr("cx", (d) => xScale(d.year) + 5)
    .attr("cy", (d) => yScale(d.employmentRate));

  // Update lollipops for male
  const maleLines = container.selectAll(".male-line").data(maleFiltered);
  maleLines
    .enter()
    .append("line")
    .attr("class", "male-line")
    .attr("x1", (d) => xScale(d.year) - 5)
    .attr("x2", (d) => xScale(d.year) - 5)
    .attr("y1", height)
    .attr("y2", height)
    .attr("stroke", "#008080")
    .attr("stroke-width", 2)
    .merge(maleLines)
    .transition()
    .duration(1000)
    .attr("x1", (d) => xScale(d.year) - 5)
    .attr("x2", (d) => xScale(d.year) - 5)
    .attr("y2", (d) => yScale(d.employmentRate));

  const maleCircles = container.selectAll(".male-circle").data(maleFiltered);
  maleCircles
    .enter()
    .append("circle")
    .attr("class", "male-circle")
    .attr("cx", (d) => xScale(d.year) - 5)
    .attr("cy", height)
    .attr("r", 5)
    .attr("fill", "#008080")
    .merge(maleCircles)
    .transition()
    .duration(1000)
    .attr("cx", (d) => xScale(d.year) - 5)
    .attr("cy", (d) => yScale(d.employmentRate));

  // Legend
  const legend = svg.selectAll(".legend").data([null]);
  const legendGroup = legend
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 100}, ${margin.top})`);

  legendGroup
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", "#FF1493");

  legendGroup
    .append("text")
    .attr("x", 20)
    .attr("y", 12)
    .text("Female Employment Rate")
    .style("font-size", "14px")
    .attr("alignment-baseline", "middle");

  legendGroup
    .append("rect")
    .attr("x", 0)
    .attr("y", 25)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", "#008080");

  legendGroup
    .append("text")
    .attr("x", 20)
    .attr("y", 37)
    .text("Male Employment Rate")
    .style("font-size", "14px")
    .attr("alignment-baseline", "middle");
}
