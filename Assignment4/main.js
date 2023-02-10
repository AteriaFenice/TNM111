var url = "./starwars-interactions/starwars-full-interactions-allCharacters.json";


fetch(url)
    .then(res => res.json())
    //.then(data => console.log(data))
    .then(data => {
        var width = 600, height = 800

        let data2 = data;

        //console.log(data_clone);
        console.log(data2)

        let nodes = data.nodes
        let links = data.links

        let nodes2 = data2.nodes
        let links2 = data2.links
        
        // Node link diagram
        var simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links))
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
                });
        }
        
        function updateNodes() {
            var u = d3.select('.nodes1')
                .selectAll('text')
                .data(nodes)
                .join('text')
                .text(function(d){
                    return d.name
                })
                .style('fill', function(d) {
                    return d.colour;
                })
                .attr('x', function(d) {
                    return d.x
                })
                .attr('y', function(d) {
                    return d.y
                })
                .attr('dy', function(d) {
                    return 5
                });
        }

        function updateNodes2() {
            var u = d3.select('.nodes2')
                .selectAll('text')
                .data(nodes2)
                .join('text')
                .text(function(d){
                    return d.name
                })
                .style('fill', function(d) {
                    return d.colour;
                })
                .attr('x', function(d) {
                    return d.x
                })
                .attr('y', function(d) {
                    return d.y
                })
                .attr('dy', function(d) {
                    return 5
                });
        }
        
        function ticked() {
            updateLinks()
            updateNodes()
            updateLinks2()
            updateNodes2()
        }

    })


