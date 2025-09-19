// Matter.js aliases
const { Engine, World, Bodies, Body, Constraint, Mouse, MouseConstraint} = Matter;

let engine, runner, world, btn, canvas, mConstraint;
let sign, subsign1, subsign2;
let leftRope1, rightRope1, leftRope2, rightRope2, leftRope3, rightRope3;

let alreadyLoaded = false;

const BASE_W = 800, BASE_H = 600
const aspectRatio = BASE_W/BASE_H;
let scaleFactor = 1

let lengthL = 0.3,
    lengthR = 0.3

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
        sign = new Sign({x: 0.4, y:0.1}, {x: 0.25, y:0.067}, "Xelphyr");
        subsign1 = new Sign({x: 0.42, y:0}, {x: 0.2, y:0.055}, "About Me");
        subsign2 = new Sign({x: 0.42, y:-0.1}, {x: 0.2, y:0.055}, "Projects");
        sign.resizeUpdate(canvasWidth, canvasHeight);
        subsign1.resizeUpdate(canvasWidth, canvasHeight);
        subsign2.resizeUpdate(canvasWidth, canvasHeight);
        alreadyLoaded = true;
    }
    else {
        sign.resizeUpdate(canvasWidth, canvasHeight);
        subsign1.resizeUpdate(canvasWidth, canvasHeight);
        subsign2.resizeUpdate(canvasWidth, canvasHeight);
    }
    let leftRopeMaxLength = normToPx(lengthL, canvasHeight),
        rightRopeMaxLength = normToPx(lengthR, canvasHeight);
    leftRope1 = new Rope({
        bodyB: sign,
        length: leftRopeMaxLength,
        pointA: {x:0.4, y:0},
        pointB: {x:-0.9, y:-0.9},
    }, {canvasWidth, canvasHeight});
    rightRope1 = new Rope({
        bodyB: sign,
        length: rightRopeMaxLength,
        pointA: {x:0.6, y:0},
        pointB: {x:0.9, y:-0.9},
    }, {canvasWidth, canvasHeight} );

    leftRope2 = new Rope({
        bodyA: sign,
        bodyB: subsign1,
        length: leftRopeMaxLength/3,
        pointA: {x:-0.9, y:0.9},
        pointB: {x:-0.9, y:-0.9},
    }, {canvasWidth, canvasHeight});
    rightRope2 = new Rope({
        bodyA: sign,
        bodyB: subsign1,
        length: rightRopeMaxLength/3,
        pointA: {x:0.9, y:0.9},
        pointB: {x:0.9, y:-0.9},
    }, {canvasWidth, canvasHeight} );

    leftRope3 = new Rope({
        bodyA: subsign1,
        bodyB: subsign2,
        length: leftRopeMaxLength/4,
        pointA: {x:-0.9, y:0.9},
        pointB: {x:-0.9, y:-0.9},
    }, {canvasWidth, canvasHeight});
    rightRope3 = new Rope({
        bodyA: subsign1,
        bodyB: subsign2,
        length: rightRopeMaxLength/4,
        pointA: {x:0.9, y:0.9},
        pointB: {x:0.9, y:-0.9},
    }, {canvasWidth, canvasHeight} );


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
    if (leftRope1?.constraint)  { World.remove(world, leftRope1.constraint); }
    if (rightRope1?.constraint) { World.remove(world, rightRope1.constraint); }
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
    background(2);
    Engine.update(engine);

    // draw body
    leftRope1.show();
    rightRope1.show();
    leftRope2.show();
    rightRope2.show();
    leftRope3.show();
    rightRope3.show();
    sign.show();
    subsign1.show();
    subsign2.show();

    leftRope1.step();
    rightRope1.step();
    leftRope2.step();
    rightRope2.step();
    leftRope3.step();
    rightRope3.step();
    sign.step();
    subsign1.step();
    subsign2.step();
}
