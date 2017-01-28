/**
 * Created by Alex on 26/01/2017.
 */

function getTile1Data (g, r) {

    step0();
    step1();
    step2();
    step3();
    step4();
    step5();

    d3.selectAll('.construction').remove();
    let ret = ripLineData(g);
    g.remove();

    return ret;


    function step0 () {
        g.append('circle')
            .attr('r', r)
            .attr('id', 'step1Circle')
            .classed('construction', true);
    }

    function step1 () {

        const lineNum = 12;
        const lineOffset = 15;

        for (let i = 0; i < lineNum; i++) {
            g.append('line')
                .attr('id', 'step1Line' + i)
                .classed('construction', true)
                .attr('x2', (r+lineOffset) * Math.sin((2*Math.PI/lineNum)*i))
                .attr('y2', (r+lineOffset) * Math.cos((2*Math.PI/lineNum)*i));
        }
    }

    function step2 () {
        const lineNum = 6;

        for (let i = 0; i < lineNum; i++) {
            let intersect = findCircleIntersection(d3.select('#step1Line' + i*2), d3.select('#step1Circle'));
            let intersect2 = findCircleIntersection(d3.select('#step1Line' + ((i+1)*2) % (lineNum*2)), d3.select('#step1Circle'));
            let points = {'x1': intersect.x, 'y1': intersect.y, 'x2': intersect2.x, 'y2': intersect2.y};
            addStaticLine(points, 2, i);
        }
    }

    function step3 () {
        const lineNum = 6;

        for (let i = 0; i < lineNum; i++) {
            let intersect = findLineIntersection(d3.select('#step2Line' + i), d3.select('#step2Line' + (i + 1) % lineNum));
            let intersect2 = findLineIntersection(d3.select('#step2Line' + (i + 2) % lineNum), d3.select('#step2Line' + (i + 3) % lineNum));
            let points = {'x1': intersect.x, 'y1': intersect.y, 'x2': intersect2.x, 'y2': intersect2.y};
            addStaticLine(points, 3, i);
        }
    }

    function step4 () {
        const lineNum = 6;

        for (let i = 0; i < lineNum; i++) {
            let intersect = findLineIntersection(d3.select('#step3Line' + i), d3.select('#step3Line' + (i+1)%lineNum));
            let intersect2 = findLineIntersection(d3.select('#step3Line' + (i+2)%lineNum), d3.select('#step3Line' + (i+3)%lineNum));
            let points = extendLine(intersect, intersect2, 100);
            addStaticLine(points, 4, i);
        }
    }

    function step5 () {
        const lineNum = 6;

        for (let i = 0; i < lineNum; i++) {
            let intersect = findLineIntersection(d3.select('#step2Line' + i), d3.select('#step4Line' + (i+2)%lineNum));
            let intersect2 = findLineIntersection(d3.select('#step2Line' + (i+2)%lineNum), d3.select('#step4Line' + i));
            let points = {'x1': intersect.x, 'y1': intersect.y, 'x2': intersect2.x, 'y2': intersect2.y};
            addStaticLine(points, 5, i);
            d3.select('#step5Line' + i)
                .classed('construction', false)
                .classed('final', true);
        }
    }
}

function getTile2Data (g, r) {

    step0();
    step1();
    step2();
    step3();
    step4();
    step5();

    g.selectAll('.construction').remove();
    let ret = ripLineData(g);
    g.remove();

    return ret;

    function step0 () {

        g.append('circle')
            .attr('id', 'step1Circle')
            .classed('construction', true)
            .attr('r', r);
    }

    function step1 () {

        const lineNum = 12;
        const lineOffset = 15;

        for (let i = 0; i < lineNum; i++) {
            g.append('line')
                .attr('id', 'step1Line' + i)
                .classed('construction', true)
                .attr('x2', (r+lineOffset) * Math.sin((2*Math.PI/lineNum)*i))
                .attr('y2', (r+lineOffset) * Math.cos((2*Math.PI/lineNum)*i));
        }

    }

    function step2 () {
        const lineNum = 6;

        for (let i = 0; i < lineNum; i++) {
            let intersect = findCircleIntersection(d3.select('#step1Line' + i*2), d3.select('#step1Circle'));
            let intersect2 = findCircleIntersection(d3.select('#step1Line' + ((i+1)*2) % (lineNum*2)), d3.select('#step1Circle'));
            let points = {'x1': intersect.x, 'y1': intersect.y, 'x2': intersect2.x, 'y2': intersect2.y};
            addStaticLine(points, 2, i);
        }
    }

    function step3 () {
        const lineNum = 6;

        for (let i = 0; i < lineNum; i++) {
            let intersect = findLineIntersection(d3.select('#step1Line' + (i*2 + 1) % (lineNum*2)), d3.select('#step2Line' + i));
            let intersect2 = findLineIntersection(d3.select('#step1Line' + ((i+1)*2 + 1) % (lineNum*2)), d3.select('#step2Line' + (i+1) % lineNum));
            let points = {'x1': intersect.x, 'y1': intersect.y, 'x2': intersect2.x, 'y2': intersect2.y};
            addStaticLine(points, 3, i);
        }
    }

    function step4 () {
        const lineNum = 6;

        for (let i = 0; i < lineNum; i++) {
            let intersect = findLineIntersection(d3.select('#step1Line' + ((i+1)*2) % (lineNum*2)), d3.select('#step3Line' + i));
            let intersect2 = findLineIntersection(d3.select('#step1Line' + ((i+3)*2) % (lineNum*2)), d3.select('#step3Line' + (i+2) % lineNum));
            let points = extendLine(intersect, intersect2, 70);
            addStaticLine(points, 4, i);
        }
    }

    function step5 () {
        const lineNum = 6;

        for (let i = 0; i < lineNum; i++) {
            let intersect = findLineIntersection(d3.select('#step2Line' + i), d3.select('#step4Line' + i));
            let intersect2 = findLineIntersection(d3.select('#step1Line' + ((i+1)*2 + 1) % (lineNum*2)), d3.select('#step4Line' + i));
            let points = {'x1': intersect.x, 'y1': intersect.y, 'x2': intersect2.x, 'y2': intersect2.y};
            addStaticLine(points, 5, i);
            d3.select('#step5Line' + i)
                .classed('construction', false)
                .classed('final', true);
        }

        for (let j = 0; j < lineNum; j++) {
            let intersect = findLineIntersection(d3.select('#step2Line' + j), d3.select('#step4Line' + (j+3) % lineNum));
            let intersect2 = findLineIntersection(d3.select('#step1Line' + ((j+5)*2 + 1) % (lineNum*2)), d3.select('#step4Line' + (j+3) % lineNum));
            let points = {'x1': intersect.x, 'y1': intersect.y, 'x2': intersect2.x, 'y2': intersect2.y};
            addStaticLine(points, 5, j+lineNum);
            d3.select('#step5Line' + (j+lineNum))
                .classed('construction', false)
                .classed('final', true);
        }
    }

}