var url = "./starwars-interactions/starwars-full-interactions-allCharacters.json";
var url2 = "./starwars-interactions\starwars-episode-1-interactions-allCharacters.json";

fetch(url)
    .then(res => res.json())
    //.then(data => console.log(data))
    .then(data => {
        var width = 1000, height = 800

        let nodes = data.nodes
        let links = data.links
        
        // Node link diagram
        var simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-70))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links))
            .on('tick', ticked);
        
        // Links
        function updateLinks() {
            var u = d3.select('.links')
                .selectAll('line')
                .data(links)
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
                .on('mouseover', function(d){
                    d3.select(".infoLink .source").text(d['source'].name);
                    d3.select(".infoLink .target").text(d['target'].name);
                    d3.select(".infoLink .value").text(d['value']);
                    d3.select(".infoLink").style('visibility', 'visible');
                })
                .on('mouseout', function(){
                    d3.select(".infoLink").style('visibility', 'hidden');
                });
        }
        
        // Nodes
        function updateNodes() {
            var u = d3.select('.nodes')
                .selectAll('circle')
                .data(nodes)
                .join('circle')
                .attr('r', 5)
                .style('fill', function(d) {
                    return d.colour;
                })
                .attr('cx', function(d) {
                    return d.x
                })
                .attr('cy', function(d) {
                    return d.y
                })
                .on('mouseover', function(d){
                    d3.select(".info .name").text(d['name']);
                    d3.select(".info .value").text(d['value']);
                    d3.select(".info").style('visibility', 'visible');
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .attr('r', 10);
                })
                .on('mouseout', function(){
                    d3.select(".info").style('visibility', 'hidden');
                    d3.select(this)
                        .transition()
                        .duration(50)
                        .attr('r', 5);
                });

        }
        
        function ticked() {
            updateLinks()
            updateNodes()
        }


    })


