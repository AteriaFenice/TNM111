// Tutorial 
// Import data

var url = "../starwars-interactions/starwars-full-interactions-allCharacters.json";
/*d3.json(url, function(data){
  console.log(data);
}); */

//d3.json("./starwars-interactions/starwars-epsiode-1-interactions-allCharacters.json").then(function(data){ console.log(data)});

//d3.json(url).then(onLoad).catch(err => console.log(err));

fetch(url).then(res => res.json()).then(data => console.log(data));

var width = 300, height = 300; 
var nodes = [{}, {}, {}, {}];

var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width/2, height/2))
    .on('tick', ticked);

function ticked() {
   var u =  d3.select('svg')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r',5)
      .attr('cx',function(d){
        return d.x;
      })
      .attr('cy', function(d){
        return d.y;
      });
}