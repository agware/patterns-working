/**
 * Created by Alex on 26/01/2017.
 */

function addLine(points, step, i) {
    g.append('line')
        .attr('x1', points.x1)
        .attr('y1', points.y1)
        .attr('x2', points.x1)
        .attr('y2', points.y1)
        .attr('id', 'step' + step + 'Line' + i)
        .classed('construction', true)
        .transition()
        .duration(duration)
        .attr('x2', points.x2)
        .attr('y2', points.y2);
}

function addStaticLine(points, step, i) {
    g.append('line')
        .attr('x1', points.x1)
        .attr('y1', points.y1)
        .attr('x2', points.x2)
        .attr('y2', points.y2)
        .attr('id', 'step' + step + 'Line' + i)
        .classed('construction', true);
}

function findCircleIntersection(line, circle) {
    let circleFormula = getCircleFormula(circle);
    let lineFormula = getLineFormula(line);

    // 1 + m^2
    let a = 1 + Math.pow(lineFormula.m, 2);
    // 2mc - 2mk - 2h
    let b = 2*lineFormula.m*lineFormula.c - 2*lineFormula.m*circleFormula.k - 2*circleFormula.h;
    // h^2 + c^2 + k^2 - r^2 - 2ck
    let c = Math.pow(circleFormula.h, 2) + Math.pow(lineFormula.c, 2) + Math.pow(circleFormula.k, 2) - Math.pow(circleFormula.r, 2) - 2*lineFormula.c*circleFormula.k;

    let discriminant = Math.pow(b, 2) - 4*a*c;

    let x1 = (-b + Math.sqrt(discriminant))/(2*a);
    let x2 = (-b - Math.sqrt(discriminant))/(2*a);

    let x = checkIfInBound(x1, x2, line);
    let y = lineFormula.m*x + lineFormula.c;
    return {'x': x, 'y': y};
}

function findLineIntersection (line1, line2) {
    let formula1 = getLineFormula(line1);
    let formula2 = getLineFormula(line2);



    let x = (formula2.c - formula1.c)/(formula1.m - formula2.m);
    let y = formula1.m*x + formula1.c;

    return {'x': x, 'y': y};
}

function extendLine(point1, point2, extension) {
    let x1 = point1.x;
    let x2 = point2.x;
    let y1 = point1.y;
    let y2 = point2.y;

    let rise = y2-y1;
    let run = x2-x1;
    run = run ? run : -0.000001;
    let m = Math.round(rise*1000/run)/1000;

    let angle = Math.round(Math.atan(m)*1000)/1000;
    let xShift = Math.round(extension*Math.cos(angle)*1000)/1000;
    let yShift = Math.round(extension*Math.sin(angle)*1000)/1000;

    xShift = xShift*(run > 0 ? -1 : 1);
    yShift = yShift*(run > 0 ? -1 : 1);

    return {'x1': x1 + xShift, 'y1': y1 + yShift, 'x2': x2 - xShift, 'y2': y2 - yShift};
}

function ripLineData (g) {

    let lineNum = g.selectAll('line').size();
    let ret = [];

    for(let i = 0; i < lineNum; i++) {
        let line = g.select('line:nth-child(' + (i+1) + ')');
        let data = {'x1': line.attr('x1'), 'y1': line.attr('y1'), 'x2': line.attr('x2'), 'y2': line.attr('y2')}
        ret.push(data);
    }

    return ret;
}

function generateUsingLineData (g, lineData) {

    g.selectAll('line')
        .data(lineData)
        .enter().append('line')
        .attr('x1', function(d) {return d.x1})
        .attr('y1', function(d) {return d.y1})
        .attr('x2', function(d) {return d.x2})
        .attr('y2', function(d) {return d.y2})
        .classed('final', true);

}

function getLineFormula (line) {
    let x1 = line.attr('x1');
    let x2 = line.attr('x2');
    let y1 = line.attr('y1');
    let y2 = line.attr('y2');

    let rise = y2-y1;
    let run = x2-x1;
    run = run ? run : -0.000001;
    let m = Math.round(rise*1000/run)/1000;

    let c = Math.round((y1 - m*x1)*1000)/1000;
    return {'m': m, 'c': c};
}

function getCircleFormula(circle) {
    let h = circle.attr('cx');
    h = (h == null) ? 0 : h;
    let k = circle.attr('cy');
    k = (k == null) ? 0 : k;
    let r = circle.attr('r');

    return {'h': h, 'k': k, 'r': r};
}

function checkIfInBound(x1, x2, line) {
    let xBound1 = line.attr('x1');
    let xBound2 = line.attr('x2');
    let x;
    if (Math.min(xBound1, xBound2) <= x1 && Math.max(xBound1, xBound2) >= x1) {
        x = x1;
    } else {
        x = x2;
    }
    return x;
}
