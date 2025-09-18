function local_to_world(point, body) {
    let pos = body.position;
    let { x, y } = point;
    let finalX = pos.x + x,
        finalY = pos.y + y;

    return {x: finalX, y: finalY};
}

function draw_constraint(cons) {
    const ax = cons.pointA.x, ay = cons.pointA.y;
    const {x:bx, y:by} = local_to_world(cons.pointB, cons.bodyB);

    line(ax, ay, bx, by);
}

function pxToNorm(pixel, length) {
    return pixel/length;

}

function normToPx(normalized, length) {
    return normalized*length;
}