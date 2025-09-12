function local_to_world(point, body) {
    let pos = body.position,
        rot = body.angle;

    let { x, y } = point;
    let c = Math.cos(rot), s = Math.sin(rot);
    let finalX = pos.x + x*c - y*s,
        finalY = pos.y + x*s + y*c;

    return {x: finalX, y: finalY};
}

function draw_constraint(cons) {
    const ax = cons.pointA.x, ay = cons.pointA.y;
    const {x:bx, y:by} = local_to_world(cons.pointB, cons.bodyB);

    line(ax, ay, bx, by);
}