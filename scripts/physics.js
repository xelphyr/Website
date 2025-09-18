// Matter.js aliases
const { Engine, World, Bodies, Body, Constraint, Mouse, MouseConstraint} = Matter;

let engine, runner, sign, world, btn, leftRope, rightRope, canvas, mConstraint;

let alreadyLoaded = false;

const BASE_W = 800, BASE_H = 600
const aspectRatio = BASE_W/BASE_H;
let scaleFactor = 1

let pointLA = {x:0.4, y:0},
    pointLB = {x:-0.9, y:-0.9},
    pointRA = {x:0.6, y:0},
    pointRB = {x:0.9, y:-0.9},
    lengthL = 0.4,
    lengthR = 0.4

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

    if (!alreadyLoaded) {
        sign = new SignMain;
        sign.resizeUpdate(canvasWidth, canvasHeight);
        alreadyLoaded = true;
    }
    else {
        sign.resizeUpdate(canvasWidth, canvasHeight);
    }
    let leftRopeMaxLength = normToPx(lengthL, canvasHeight),
        rightRopeMaxLength = normToPx(lengthR, canvasHeight);
    leftRope = Constraint.create({
        bodyB: sign.body,
        length: leftRopeMaxLength,
        stiffness: 0.000001,
        pointA: {
            x: normToPx(pointLA.x, canvasWidth),
            y: normToPx(pointLA.y, canvasHeight),
        },
        pointB: {
            x: normToPx(pointLB.x, normToPx(sign.sizeBackup.x/2, canvasWidth)),
            y: normToPx(pointLB.y, normToPx(sign.sizeBackup.y/2, canvasHeight)),
        },
    } );
    leftRope.sqrLength = leftRopeMaxLength*leftRopeMaxLength;
    rightRope = Constraint.create({
        bodyB: sign.body,
        length: rightRopeMaxLength,
        stiffness: 0.000001,
        pointA: {
            x: normToPx(pointRA.x, canvasWidth),
            y: normToPx(pointRA.y, canvasHeight),
        },
        pointB: {
            x: normToPx(pointRB.x, normToPx(sign.sizeBackup.x/2, canvasWidth)),
            y: normToPx(pointRB.y, normToPx(sign.sizeBackup.y/2, canvasHeight)),
        },
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

function cleanup () {
    if (mConstraint) {
        World.remove(world, mConstraint);
        Matter.Mouse.clearSourceEvents(mConstraint.mouse);
        mConstraint = null;
    }
    if (leftRope)  { World.remove(world, leftRope);  leftRope = null; }
    if (rightRope) { World.remove(world, rightRope); rightRope = null; }
    if (sign?.body){ World.remove(world, sign.body); }

    //Composite.clear(world, false, true);
    //Engine.clear(engine);

    engine = null;
    world = null;
    if (canvas) canvas.remove();
}

function windowResized() {
    cleanup();
    setup();
}

function updateCanvasDimensions() {
    if (windowWidth / windowHeight < aspectRatio) {
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

    sign.step();
}
