/**
 * Created by Alex on 27/01/2017.
 */

// ToDo: Should be able to custom group lines on which to create spiral

function spiral (container, iterations) {

    // Spiral based on intersections of lines

    let foundation = container.select('g:nth-child(1)');

    let length = getLength(foundation, iterations);

    for (let i = 0; i < iterations; i++) {
        let gaps = getGaps(container, length);
        generateSpiral(container, gaps);
    }
}

function getLength(foundation, iterations) {

    let lineNum = foundation.selectAll('line').size();
    let ret = [];

    for (let i = 0; i < lineNum; i++) {
        let rise = foundation.select('line:nth-child(' + (i+1) + ')').attr('y2') - foundation.select('line:nth-child(' + (i+1) + ')').attr('y1');
        let run = foundation.select('line:nth-child(' + (i+1) + ')').attr('x2') - foundation.select('line:nth-child(' + (i+1) + ')').attr('x1');
        run = run ? run : 0.00001;

        let length = Math.round(Math.sqrt(Math.pow(run, 2) + Math.pow(rise, 2))*1000)/1000;
        let subLength = length/((5/lineNum)*iterations);
        ret.push(subLength);
    }
    return ret;
}


function getGaps(container, length) {

    let layerNum = container.selectAll('g').size();
    let layer = container.select('g:nth-child(' + layerNum + ')');
    let lineNum = layer.selectAll('line').size();
    let ret = [];

    for (let i = 0; i < lineNum; i++) {
        let rise = layer.select('line:nth-child(' + (i+1) + ')').attr('y2') - layer.select('line:nth-child(' + (i+1) + ')').attr('y1');
        let run = layer.select('line:nth-child(' + (i+1) + ')').attr('x2') - layer.select('line:nth-child(' + (i+1) + ')').attr('x1');
        run = run ? run : 0.00001;

        let angle = Math.round(Math.atan(rise/run)*1000)/1000;

        let x = Math.abs(length[i]*Math.cos(angle)) * (run < 0 ? -1 : 1);
        let y = Math.abs(length[i]*Math.sin(angle)) * (rise < 0 ? -1 : 1);

        ret.push({'x': Math.round(x*1000)/1000, 'y': Math.round(y*1000)/1000});
    }
    return ret;
}

function generateSpiral (g, gaps) {

    let layerNum = g.selectAll('g').size();
    let layer = g.select('g:nth-child(' + layerNum + ')');
    let newLayer = g.append('g');
    let lineNum = layer.selectAll('line').size();

    for (let j = 0; j < lineNum; j++) {
        let intersect = findLineIntersection(layer.select('line:nth-child(' + (j+1) + ')'), layer.select('line:nth-child(' + ((j+(lineNum-1))%(lineNum)+1) + ')'));
        let intersect2 = findLineIntersection(layer.select('line:nth-child(' + (j+1) + ')'), layer.select('line:nth-child(' + ((j+1)%(lineNum)+1) + ')'));

        let x1 = intersect.x + gaps[j].x;
        let y1 = intersect.y + gaps[j].y;
        let x2 = intersect2.x + gaps[(j+1)%lineNum].x;
        let y2 = intersect2.y + gaps[(j+1)%lineNum].y;

        newLayer.append('line')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2);
    }
}