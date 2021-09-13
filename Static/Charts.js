function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
// 1. Create the buildCharts function.
function buildCharts(sample) {
// 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
// 3. Create a variable that holds the samples array.   
    let samples_data=data.samples;
// 4. Create a variable that filters the samples for the object with the desired sample number.
    let sample_array = samples_data.filter(sampleObj => sampleObj.id == sample);
 //  5. Create a variable that holds the first sample in the array.
    let sample_result = sample_array [0];
    console.log(sample_result);

 // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.   
    let otu_ids=sample_result.otu_ids;
    let otu_labels = sample_result.otu_labels;
    let sample_values=sample_result.sample_values;

// 7. Create the yticks for the bar chart.  
    var yticks = otu_ids
    .slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()

// 8. Create the trace for the bar chart. 
    var Trace1= {
      X: sample_values,                                                
      y: yticks,
      hovertext: otu_labels,
      type: "bar",
      marker:{color:"#B56576"},
      orientation: "h"
     };

    var barData = [Trace1  
    ];
// 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
         
        },
        paper_bgcolor: "rgb(43, 39, 39)",
        plot_bgcolor: "rgb(43, 39, 39)",
        font: {color:"AliceBlue"}
    

    };
// 10. Use Plotly to plot the data with the layout.     
    Plotly.newPlot("bar", barData, barLayout);

  console.log(otu_labels);
  //DELIVERABLE 2
   // 1. Create the trace for the bubble chart.
    var Trace2={
      x: otu_ids,
      y: sample_values,
      hovertext:otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
      
      
      }
    };

   var bubbleData = [Trace2];

  // 2. Create the layout for the bubble chart.
  var bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    xaxis: {title: "<b>OTU Id</b>"},
    showlegend: false,
    height: 600,
    width: 1150,
    margin: { t:40 , l: 70, b: 35, r: 20 },
    paper_bgcolor: "rgb(43, 39, 39)",
    plot_bgcolor: "rgb(43, 39, 39)",
    font: {color:"AliceBlue"}

    
  };



  // 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot("bubble", bubbleData, bubbleLayout); 



//DELIVERABLE 3
d3.json("samples.json").then((data) =>{
  let gauge_data= data.metadata;
  // 1. Create a variable that filters the metadata array for the object with the desired sample number.
  let gauge_array=gauge_data.filter(sampleObj => sampleObj.id == sample);
  // 2. Create a variable that holds the first sample in the metadata array.
  let gauge_result = gauge_array [0];
  // 3. Create a variable that holds the washing frequency.
  let freq = gauge_result.wfreq;
  //let decimal = parseFloat(freq);

  // 4. Create the trace for the gauge chart.
  
  var gaugeData = [
    {
      domain:{x:[0,1], y:[0,1]},
      value: freq,
      title: {text:"Belly Button Washing Frequency</b> <br> Scrubs per week", font: {size:17}},
      type: "indicator",
      mode: "gauge+number",
      gauge:{
        axis:{range: [null, 10]},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "#E5383B"},
          {range: [2,4], color: "#FF9E00"},
          {range: [4,6], color: "#FFE6A7"},
          {range: [6,8], color: "#ECF39E"},
          {range: [8,10], color: "#90A955"}
        ]

      }
    }
  ];
     
  var gaugeLayout = { 
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    font: { color: "AliceBlue", family: "Arial" , size: 14},
    paper_bgcolor: "rgb(43, 39, 39)",
        
  };

  Plotly.newPlot("gauge",gaugeData, gaugeLayout);  

    });
  });

}

