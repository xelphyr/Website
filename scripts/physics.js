// Matter.js aliases
const { Engine, World, Bodies, Body, Constraint, Mouse, MouseConstraint} = Matter;

let engine, runner, sign, world, btn, leftRope, rightRope, canvas, mConstraint;

let alreadyLoaded = false;

const BASE_W = 800, BASE_H = 600
const aspectRatio = BASE_W/BASE_H;
let scaleFactor = 1

let lengthL = 0.4,
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
        sign = new Sign({x: 0.4, y:0}, {x: 0.25, y:0.067}, "Xelphyr");
        sign.resizeUpdate(canvasWidth, canvasHeight);
        alreadyLoaded = true;
    }
    else {
        sign.resizeUpdate(canvasWidth, canvasHeight);
    }
    let leftRopeMaxLength = normToPx(lengthL, canvasHeight),
        rightRopeMaxLength = normToPx(lengthR, canvasHeight);
    leftRope = new Rope({
        bodyB: sign,
        length: leftRopeMaxLength,
        pointA: {x:0.4, y:0},
        pointB: {x:-0.9, y:-0.9},
    }, {canvasWidth, canvasHeight});
    rightRope = new Rope({
        bodyB: sign,
        length: rightRopeMaxLength,
        pointA: {x:0.6, y:0},
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
    if (leftRope?.constraint)  { World.remove(world, leftRope.constraint); }
    if (rightRope?.constraint) { World.remove(world, rightRope.constraint); }
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
    leftRope.show();
    rightRope.show();
    sign.show();

    leftRope.step();
    rightRope.step();
    sign.step();
}
