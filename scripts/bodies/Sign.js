class Sign {

    constructor(position, size, text) {
        //this.positionBackup = {x: 0.4, y:0};
        //this.sizeBackup = {x: 0.25, y:0.067};
        this.positionBackup = position;
        this.sizeBackup = size;
        this.angle = 0;
        this.body = null;
        this.canvasCache = null;
        this.text = text
    }


    getRot = () => {
        return this.body.angle;
    }

    getPos = () => {
        return this.body.position;
    }

    step = () => {
        let {x:pixelX, y:pixelY} = this.getPos();
        this.positionBackup = {
            x:pxToNorm(pixelX, this.canvasCache.canvasWidth),
            y:pxToNorm(pixelY, this.canvasCache.canvasHeight)
        };
        this.angle = this.getRot();
    }

    resizeUpdate = (canvasWidth, canvasHeight) => {
        this.body = Bodies.rectangle(
            normToPx(this.positionBackup.x, canvasWidth),
            normToPx(this.positionBackup.y, canvasHeight),
            normToPx(this.sizeBackup.x, canvasWidth),
            normToPx(this.sizeBackup.y, canvasHeight)
        )
        this.canvasCache = {canvasWidth: canvasWidth, canvasHeight: canvasHeight};
        Matter.Body.rotate(this.body, this.angle);
        World.add(world, this.body);
    }



    show = () => {
        let pos = this.body.position;
        let rot = this.body.angle;

        push();
        rectMode(CENTER);
        textAlign(CENTER, CENTER)
        translate(pos.x, pos.y);
        rotate(rot);
        rect(0,0,
            normToPx(this.sizeBackup.x, this.canvasCache.canvasWidth),
            normToPx(this.sizeBackup.y, this.canvasCache.canvasWidth));
        textFont('Courier New', 20)
        text("Xelphyr", 0, 0, this.width, this.height)
        pop();
    }
}