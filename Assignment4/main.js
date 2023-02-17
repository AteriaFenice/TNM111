var url1 = "./starwars-interactions/starwars-full-interactions-allCharacters.json";
var url2 = "./starwars-interactions/starwars-episode-1-interactions-allCharacters.json";

urls = [url1, url2];

async function run(url,nr){
    fetch(url)
    .then((res) => res.json())
    //.then(data => console.log(data))
    .then(data => {
        var width = 600, height = 800
    
        //let data2 = url1;

        // Debug
        console.log(data)
        //console.log(data2)

        let nodes1 = data.nodes
        let links1 = data.links
        
        // Node link diagram
        var simulation = d3.forceSimulation(nodes1)
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(width / 1.5, height / 2))
            .force('link', d3.forceLink().links(links1))
            .on('tick', ticked);
            
        // Links
        function updateLinks() {
            var u = d3.select('.links' + nr)
                .selectAll('line')
                .data(links1)
                .join('line')
                .attr('x1', function(d) {
                    return d.source.x
                })
                .attr('y1', function(d) {
                    return d.source.y
                })
                .attr('x2', function(d) {
                     return d.target.x
                })
                .attr('y2', function(d) {
                    return d.target.y
                })
                .attr("class", "link")
                .style('stroke', '#ededed', )
                .style('stroke-width', '2px')
                .on('mouseover', function(d){
                    d3.select(".infoLink .source").text(d['source'].name);
                    d3.select(".infoLink .target").text(d['target'].name);
                    d3.select(".infoLink .value").text(d['value']);
                    d3.select(".infoLink").style('visibility', 'visible');
                    d3.select(this)
                        .style('stroke', '#d3d3d3', )
                        .style('stroke-width', '5px');
                    
                })
                .on('mouseout', function(){
                    d3.select(".infoLink").style('visibility', 'hidden');
                    d3.select(this)
                    .style('stroke', '#ededed', )
                    .style('stroke-width', '2px');
                });
        }
        
        // Nodes
        function updateNodes() {
            var u = d3.select('.nodes' + nr)
                .selectAll('circle')
                .data(nodes1)
                .join('circle')
                .attr('r', 7)
                .style('fill', function(d) {
                    return d.colour;
                })
                .attr('cx', function(d) {
                    return d.x
                })
                .attr('cy', function(d) {
                    return d.y
                })
                .attr('dy', function(d){
                    return 5
                })
                .attr("class", "node")
                .on('mouseover', function(d){
                    d3.select(".info .name").text(d['name']);
                    d3.select(".info .value").text(d['value']);
                    d3.select(".info").style('visibility', 'visible');
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('r', 15);
                    var char_name = d3.select(this)._groups[0][0].__data__['name']; //Name of the character of the hovered node
                    d3.selectAll('.node')
                        .filter(function(d){ return d.name == char_name }) //Find the node with the same character name
                        .transition()
                        .duration(100)
                        .attr('r',15); // Make it bigger
                })
                .on('mouseout', function(){
                    d3.select(".info").style('visibility', 'hidden');
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('r', 7);

                    var char_name = d3.select(this)._groups[0][0].__data__['name'];
                    d3.selectAll('.node') 
                        .filter(function(d){ return d.name == char_name}) 
                        .transition()
                        .duration(100)
                        .attr('r',7); // Returns it to its original size
                    
                });
                

        }
        
        function ticked() {
            updateLinks()
            updateNodes()
        }

        //var dispatch = d3.dispatch('mymouseover')
    })
};

 //runs the function that runs the whole program
run(url1,1); //graph 1
run(url2,2);// graph 2



