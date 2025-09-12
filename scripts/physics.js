// Matter.js aliases
const { Engine, World, Bodies, Constraint, Mouse, MouseConstraint} = Matter;

let engine, runner, sign, world, btn, leftRope, rightRope, canvas, mConstraint;
const BASE_W = 800, BASE_H = 600
const aspectRatio = BASE_W/BASE_H;
let scaleFactor = 1

function setup() {
    const {canvasWidth, canvasHeight} = updateCanvasDimensions();

    canvas = createCanvas(canvasWidth, canvasHeight);

    const x = (windowWidth - canvasWidth) / 2;
    const y = (windowHeight - canvasHeight) / 2;
    canvas.position(x, y);

    pixelDensity(window.devicePixelRatio);
    strokeWeight(2 * scaleFactor);

    // physics setup
    engine = Engine.create();
    world = engine.world;

    sign = new SignMain();
    let leftRopeMaxLength = 200, rightRopeMaxLength = 200;
    leftRope = Constraint.create({
        bodyB: sign.body,
        length: leftRopeMaxLength,
        stiffness: 0.000001,
        pointA: {x: 320, y: 80},
        pointB: {x: -90, y: 5}
    } );
    leftRope.sqrLength = leftRopeMaxLength*leftRopeMaxLength;
    rightRope = Constraint.create({
        bodyB: sign.body,
        length: rightRopeMaxLength,
        stiffness: 0.000001,
        pointA: {x: 480, y: 80},
        pointB: {x: 90, y:-5}
    } );
    rightRope.sqrLength = rightRopeMaxLength*rightRopeMaxLength;
    World.add(world, leftRope);
    World.add(world, rightRope);

    let canvasmouse = Mouse.create(canvas.elt)
    canvasmouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, {
        mouse: canvasmouse,
    })
    World.add(world, mConstraint);
}

function windowResized() {
    setup()
}

function updateCanvasDimensions() {
    if (windowWidth / windowHeight > aspectRatio) {
        return {
            canvasWidth: windowHeight * aspectRatio,
            canvasHeight: windowHeight
        };
    }

    return {
        canvasWidth: windowWidth,
        canvasHeight: windowWidth / aspectRatio
    };
}

function draw() {
    background(240);
    Engine.update(engine);

    // draw body
    draw_constraint(leftRope);
    draw_constraint(rightRope);
    sign.show();

    leftRope.stiffness = ((Matter.Constraint.currentLength(leftRope) > leftRope.length) ?  1 : 0.00001);
    rightRope.stiffness = ((Matter.Constraint.currentLength(rightRope) > rightRope.length) ?  1 : 0.00001);
}
