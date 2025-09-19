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
        this._maxCooldown = 0.1;
        this._cooldown = 0.1;
        this._enabled = true;
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

        this._cooldown -= deltaTime/1000;
        if (this._cooldown < 0)
        {
            this._enabled = floor(random(10)) !== 0;
            this._cooldown = this._maxCooldown;
        }
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
        let signColor = (this._enabled) ? color(0, 255, 255) : color(40);

        push();
        rectMode(CENTER);
        textAlign(CENTER, CENTER)
        textFont('Courier New', 60)
        translate(pos.x, pos.y);
        rotate(rot);

        signColor.setAlpha(32);
        stroke(signColor);
        strokeWeight(30);
        noFill();
        rect(0,0,
            normToPx(this.sizeBackup.x, this.canvasCache.canvasWidth),
            normToPx(this.sizeBackup.y, this.canvasCache.canvasWidth), 20);
        fill(0, 255, 255);
        strokeWeight(10);
        text(this.text, 0, 0, this.width, this.height);

        signColor.setAlpha(64);
        stroke(signColor);
        strokeWeight(15);
        noFill();
        rect(0,0,
            normToPx(this.sizeBackup.x, this.canvasCache.canvasWidth),
            normToPx(this.sizeBackup.y, this.canvasCache.canvasWidth), 20);
        strokeWeight(5);
        text(this.text, 0, 0, this.width, this.height);

        signColor.setAlpha(256)
        stroke(signColor);
        strokeWeight(3);
        noFill();
        rect(0,0,
            normToPx(this.sizeBackup.x, this.canvasCache.canvasWidth),
            normToPx(this.sizeBackup.y, this.canvasCache.canvasWidth), 20);
        strokeWeight(2);
        text(this.text, 0, 0, this.width, this.height);

        pop();
    }
}