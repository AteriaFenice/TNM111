// Tutorial 
// Import data
var url = "./starwars-interactions/starwars-full-interactions-allCharacters.json";
var sw_data;

var width = 500, height = 500; 
var nodes = [{}, {}, {}, {}];

fetch(url)
  .then(res => res.json())
  .then( data => {

    console.log(data) // debug

    myArray = (data["nodes"]);

    console.log(myArray)

    var simulation = d3.forceSimulation(data.nodes)
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width/2, height/2))
    .on('tick', ticked);

function ticked() {
   var u =  d3.select('svg')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r',5)
      .attr('cx',function(d){
        return d.x;
      })
      .attr('cy', function(d){
        return d.y;
      });
}

  });

function data_function(data){
  console.log("hello?");
  console.log(data);
}


