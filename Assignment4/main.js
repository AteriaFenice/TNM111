var url = "./starwars-interactions/starwars-full-interactions-allCharacters.json";
var url2 = "./starwars-interactions\starwars-episode-1-interactions-allCharacters.json";

fetch(url)
    .then(res => res.json())
    //.then(data => console.log(data))
    .then(data => {
        var width = 600, height = 800

        let data2 = data;

        //console.log(data_clone);
        console.log(data2)

        let nodes1 = data.nodes
        let links1 = data.links

        let nodes2 = data2.nodes
        let links2 = data2.links
        
        // Node link diagram
        var simulation = d3.forceSimulation(nodes1)
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links1))
            .on('tick', ticked);

        // Second node link diagram
        var simulation2 = d3.forceSimulation(nodes2)
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links2))
            .on('tick', ticked);
            
        // Links
        function updateLinks() {
            var u = d3.select('.links1')
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
                .style('stroke', '#ededed', )
                .style('stroke-width', '1px')
                .on('mouseover', function(d){
                    d3.select(".infoLink .source").text(d['source'].name);
                    d3.select(".infoLink .target").text(d['target'].name);
                    d3.select(".infoLink .value").text(d['value']);
                    d3.select(".infoLink").style('visibility', 'visible');
                    d3.select(this)
                        .style('stroke', '#d3d3d3', )
                        .style('stroke-width', '3px');
                })
                .on('mouseout', function(){
                    d3.select(".infoLink").style('visibility', 'hidden');
                    d3.select(this)
                    .style('stroke', '#ededed', )
                    .style('stroke-width', '1px');
                });
        }

        function updateLinks2() {
            var u = d3.select('.links2')
                .selectAll('line')
                .data(links2)
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
                .style('stroke', '#ededed', )
                .style('stroke-width', '1px')
                .on('mouseover', function(d){
                    d3.select(".infoLink .source").text(d['source'].name);
                    d3.select(".infoLink .target").text(d['target'].name);
                    d3.select(".infoLink .value").text(d['value']);
                    d3.select(".infoLink").style('visibility', 'visible');
                    d3.select(this)
                        .style('stroke', '#d3d3d3', )
                        .style('stroke-width', '3px');
                })
                .on('mouseout', function(){
                    d3.select(".infoLink").style('visibility', 'hidden');
                    d3.select(this)
                    .style('stroke', '#ededed', )
                    .style('stroke-width', '1px');
                });
        }
        
        // Nodes
        function updateNodes() {
            var u = d3.select('.nodes1')
                .selectAll('circle')
                .data(nodes1)
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
                .attr('dy', function(d){
                    return 5
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

        function updateNodes2() {
            var u = d3.select('.nodes2')
            .selectAll('circle')
            .data(nodes2)
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
            updateLinks2()
            updateNodes2()
        }
    })


