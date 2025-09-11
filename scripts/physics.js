// Matter.js aliases
const { Engine, World, Bodies } = Matter;

let engine, body, btn;

function setup() {
    createCanvas(800, 600);

    // physics setup
    engine = Engine.create();
    body = Bodies.circle(200, 100, 25, { restitution: 0.6 });
    World.add(engine.world, body);

    // p5.js HTML button
    btn = createButton('Tap me');
    btn.style('position', 'absolute');
    btn.style('border-style', 'solid');
    btn.style('border-width', '1px');
    btn.style('border-color', '#000000')
    btn.mousePressed(() => console.log('Button clicked!'));
}

function draw() {
    background(240);
    Engine.update(engine);

    // draw body
    circle(body.position.x, body.position.y, 50);

    btn.position(body.position.x-btn.size().width/2, body.position.y-btn.size().height/2);
}
