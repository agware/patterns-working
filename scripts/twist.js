/**
 * Created by Alex on 28/01/2017.
 */

function twist (container, duration, lineData) {

    setTwist(container, lineData, duration);
    setTimeout(function() {revertTwist(container, lineData)}, duration+100);
}

function setTwist (container, lineData, duration) {

    let layer = container.select('g:nth-child(1)');
    let linesPerLayer = layer.selectAll('line').size();
    let lineNum = lineData.length;

    for (let i = 0; i < (lineNum-linesPerLayer); i++) {
        let nextLine = (i + linesPerLayer);

        let layer = Math.floor(i/linesPerLayer);
        let layerG = container.select('g:nth-child(' + (layer+1) + ')');
        layerG.select('line:nth-child(' + ((i%linesPerLayer)+1) + ')')
            .transition()
            .duration(duration)
            .attr('x1', lineData[nextLine].x1)
            .attr('y1', lineData[nextLine].y1)
            .attr('x2', lineData[nextLine].x2)
            .attr('y2', lineData[nextLine].y2);
    }

    container.append('g')
        .attr('id', 'tempLines')
        .selectAll('line')
        .data(d3.range(linesPerLayer))
        .enter().append('line')
        .attr('x1', function (d) {return lineData[d].x1; })
        .attr('y1', function (d) {return lineData[d].y1; })
        .attr('x2', function (d) {return lineData[d].x2; })
        .attr('y2', function (d) {return lineData[d].y2; });
}

function revertTwist (container, lineData) {
    d3.select('#tempLines').remove();

    let layer = container.select('g:nth-child(1)');
    let linesPerLayer = layer.selectAll('line').size();
    let lineNum = lineData.length;

    for (let i = 0; i < lineNum; i++) {
        let layer = Math.floor(i/linesPerLayer);
        let layerG = container.select('g:nth-child(' + (layer+1) + ')');
        layerG.select('line:nth-child(' + ((i%linesPerLayer)+1) + ')')
            .attr('x1', lineData[i].x1)
            .attr('y1', lineData[i].y1)
            .attr('x2', lineData[i].x2)
            .attr('y2', lineData[i].y2);
    }
}
