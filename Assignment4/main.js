var url1 = "./starwars-interactions/starwars-full-interactions-allCharacters.json";
var url2 = "./starwars-interactions/starwars-episode-1-interactions-allCharacters.json";

urls = [url1, url2];

async function run(url,nr){
    fetch(url)
    .then((res) => res.json())
    .then(data => {
        var width = 600, height = 500
    
        let nodes = data.nodes
        let links = data.links
        
        // Node link diagram
        var simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-30))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(links))
            .on('tick', ticked);
            
        // Links
        function updateLinks() {
            var u = d3.select('.links' + nr)
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
                .attr("class", "link")
                .style('stroke', '#ededed', )
                .style('stroke-width', '2px')
                .on('mouseover', function(d){
                    d3.select(".infoLink .source").text(d['source'].name);
                    d3.select(".infoLink .target").text(d['target'].name);
                    d3.select(".infoLink .value").text(d['value']);
                    d3.select(".infoLink").style('visibility', 'visible');
                    d3.select(this)
                        .style('stroke', '#d3d3d3',)
                        .style('stroke-width', '5px');
                    target_name = d3.select(this)._groups[0][0].__data__['target']['name'];
                    source_name = d3.select(this)._groups[0][0].__data__['source']['name'];
                    d3.selectAll('.link')
                    .filter(function(d){ return d.target.name == target_name && d.source.name == source_name; }) //Find both target and source that matches
                    .style('stroke', '#d3d3d3',) //Change color
                    .style('stroke-width','5px'); //Make it bigger
                    
                })
                .on('mouseout', function(){
                    d3.select(".infoLink").style('visibility', 'hidden');
                    d3.select(this)
                    .style('stroke', '#ededed')
                    .style('stroke-width', '2px');

                    target_name = d3.select(this)._groups[0][0].__data__['target']['name'];
                    source_name = d3.select(this)._groups[0][0].__data__['source']['name'];
                    d3.selectAll('.link')
                    .filter(function(d){ return d.target.name == target_name && d.source.name == source_name; }) 
                    .style('stroke', '#ededed',)
                    .style('stroke-width','2px'); 
                    
                });
        }
        
        // Nodes
        function updateNodes() {
            var u = d3.select('.nodes' + nr)
                .selectAll('circle')
                .data(nodes)
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

        // Layout for slider
        layout = ({
            width: 400,
            height: 620,
            margin: {
              top: 570,
              bottom: 20,
              left: 80,
              right: 20
            }
        })
        
        // Slider function, example from: https://observablehq.com/@sarah37/snapping-range-slider-with-d3-brush
        slider = function(min, max, starting_min=min, starting_max=max) {
            var range = [min, max + 1]
            var starting_range = [starting_min, starting_max + 1]

            // set width and height of svg
            var w = layout.width
            var h = layout.height
            var margin = layout.margin

            // Dimensions of slider bar
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;

            // create x scale
            var x = d3.scaleLinear()
                .domain(range) // data space
                .range([0, width]); // display space

            // create svg and translated g
            var svg = d3.select('svg')//d3.select(DOM.svg(w, h))
            const g = svg.append('g')
                            .attr('transform',`translate(${margin.left}, ${margin.top})`)


            // draw background lines
            g.append('g').selectAll('line')
                .data(d3.range(range[0], range[1]+1))
                .enter()
                .append('line')
                .attr('x1', d => x(d))
                .attr('x2', d => x(d))
                .attr('y1', 0)
                .attr('y2', height)
                .style('stroke', '#ccc')

            // labels
            var labelL = g.append('text')
                .attr('id', 'labelleft')
                .attr('x', 0)
                .attr('y', height + 5)
                .text(range[0])

            var labelR = g.append('text')
                .attr('id', 'labelright')
                .attr('x', 0)
                .attr('y', height + 5)
                .text(range[1])

            // define brush
            var brush = d3.brushX()
                .extent([[0, 0], [width, height]])
                .on('brush', function(){
                    var s = d3.event.selection;

                    // update and move labels
                    labelL.attr('x', s[0])
                        .text(Math.round(x.invert(s[0])))
                    labelR.attr('x', s[1])
                        .text(Math.round(x.invert(s[1])) - 1)

                    // move brush handles
                    handle.attr('display', null).attr('transform', function(d, i) {
                        return 'translate(' + [ s[i], -height / 4] + ')';
                    });

                    // update view
                    svg.node().value = s.map(d => Math.round(x.invert(d)));
                    //svg.node().dispatchEvent(new CustomEvent('input'));
                    // event for range sliders
                    let event = new Event('change');
                    eventhandler.dispatchEvent(event);
                })
                .on('end', function() {
                    if(!d3.event.sourceEvent) return;
                    var d0 = d3.event.selection.map(x.invert);
                    var d1 = d0.map(Math.round)
                    d3.select(this).transition().call(d3.event.target.move, d1.map(x))
                })

            // append brush to g
            var gBrush = g.append('g')
                .attr('class', 'brush')
                .call(brush)

            // add brush to handles
            var brushResizePath = function(d) {
                var e = +(d.type == 'e'),
                    x = e ? 1 : -1,
                    y = height / 2;
                return 'M' + (.5 * x) + "," + y + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) + "V" + (2 * y - 6) +
                "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y) + "Z" + "M" + (2.5 * x) + "," + (y + 8) + "V" + (2 * y - 8) +
                "M" + (4.5 * x) + "," + (y + 8) + "V" + (2 * y - 8);
            }

            var handle = gBrush.selectAll(".handle--custom")
                .data([{type: "w"}, {type: "e"}])
                .enter()
                .append("path")
                .attr("class", "handle--custom")
                .attr("stroke", "#000")
                .attr("fill", '#eee')
                .attr("cursor", "ew-resize")
                .attr("d", brushResizePath);

            // clicking outside selected area will select small peice there
            gBrush.selectAll('overlay')
                .each(function(d){
                    d.type = 'selection';
                })
                .on('mousedown touchstart', brushcentered)

            function brushcentered(){
                var dx = x(1) - x(0),
                    cx = dd3.mouse(this)[0],
                    x0 = cx - dx / 2,
                    x1 = cx + dx / 2;

                d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
            }

            // select entire starting range
            gBrush.call(brush.move, starting_range.map(x))

            // get values
            var getRange = function(){
                var range = d3.brushSelection(gBrush.node()).map(d => Math.round(x.invert(d)))
                return range
            }

            return svg.node, {getRange : getRange} // myslider.getRange returns selected range

        }

        // Set range values and call slider
        const rangeMax = Math.max.apply(Math, links.map(function(d){return d.value}))
        const rangeMin = Math.min.apply(Math, links.map(function(d){return d.value}))

        // Only use slider on url1
        if(nr == 1){
            myslider = slider(rangeMin, rangeMax, undefined, undefined)
        
        //myslider = slider(rangeMin, rangeMax, undefined, undefined)

            // Update node link diagram based on slider
            d3.select('#eventhandler')
            .on('change', function(){
                // change visibility of links and nodes)
                links = data.links
                nodes = data.nodes
                let filteredLinks = links
                    .filter(function (d) { 
                        linksFiltered = d.value <= myslider.getRange()[1] && d.value >= myslider.getRange()[0]; 
                        return linksFiltered
                    });
            // console.log(filteredLinks)
                links = filteredLinks
                updateLinks()
                
                // sources and targets of remaining links
                linkSource = links.map(function(d){return d.source.name})
                linkTarget = links.map(function(d){return d.target.name})
                //console.log(linkSource, linkTarget)

                let filteredNodes = nodes
                    .filter(function (d) { 
                        // om node finns som source eller target hos links ska den va kvar
                        nodesFiltered = linkSource.includes(d.name) || linkTarget.includes(d.name)
                        return nodesFiltered
                    })
                //console.log(filteredNodes)
                nodes = filteredNodes
                updateNodes()


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

run(url2,2);// graph 2
run(url1,1); //graph 1



