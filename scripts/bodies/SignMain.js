function SignMain () {
    this.body = Bodies.rectangle(300, 0, 200, 40);
    this.width = 200;
    this.height = 40;
    World.add(world, this.body);

    this.getRot = () => {
        return this.body.angle;
    }

    this.getPos = () => {
        return this.body.position;
    }



    this.show = () => {
        let pos = this.body.position;
        let rot = this.body.angle;

        push();
        rectMode(CENTER);
        textAlign(CENTER, CENTER)
        translate(pos.x, pos.y);
        rotate(rot);
        rect(0,0,this.width, this.height);
        textFont('Courier New', 20)
        text("Xelphyr", 0, 0, this.width, this.height)
        pop();
    }
}