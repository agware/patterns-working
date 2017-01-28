/**
 * Created by Alex on 7/01/2017.
 */

function initSliders(inputs) {

    const controlWidth = 200;
    const sliderGap = 80;

    let controlSvg = d3.select('div#control').append('svg')
        .attr('height', height)
        .attr('width', controlWidth);

    for (let i = 0;i < inputs.length; i++){
        controlSvg.append('g')
            .attr('transform', 'translate(' + 20 + ',' + sliderGap*(i+1) + ')')
            .attr('id', inputs[i].id);
        initSlider(d3.select('#' + inputs[i].id), inputs[i]);
        d3.select('#' + inputs[i].id + 'Text').text(inputs[i].name)
    }
}

function initSlider(g, inputs) {

    const dim = {'r': 15, 'textY': -30, 'lineLen': 100};

    let id = g.attr('id');

    g.append('text')
        .attr('y', dim.textY)
        .attr('id', id + 'Text');
    g.append('line')
        .attr('x2', dim.lineLen);

    let sliderScale = d3.scaleLinear()
        .domain([inputs.min, inputs.max])
        .range([0, dim.lineLen]);

    g.append('circle')
        .attr('cx', sliderScale(inputs.val))
        .attr('r', dim.r)
        .attr('id', id + 'Ball')
        .call(d3.drag()
        .on("start", dragStart)
        .on("drag", dragEvent)
        .on("end", dragEnd));
}

function dragStart() {
    dragging = true;
    d3.select(this).classed('active', true);
}

function dragEvent() {
    const lim = {'min': 0, 'max': 100};
    d3.select(this).attr('cx', Math.max(Math.min(d3.event.x, lim.max), lim.min));

    dragSlider(d3.select(this));
}

function dragEnd() {
    dragging = false;
    d3.select(this).classed('active', false);
}