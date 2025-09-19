class Rope {
    /*
    options = {
        bodyA:
        bodyB:
        pointA:
        pointB:
        maxLength:
    }
     */
    constructor(options, canvas) {
        this.bodyA = options.bodyA;
        this.bodyB = options.bodyB;
        this.pointA = options.pointA;
        this.pointB = options.pointB;
        this.length = options.length;

        this.constraint = Constraint.create({
            bodyA: this.bodyA?.body,
            bodyB: this.bodyB?.body,
            pointA: (this.bodyA) ? {
                x: normToPx(this.pointA.x, normToPx(this.bodyA.sizeBackup.x/2, canvas.canvasWidth)),
                y: normToPx(this.pointA.y, normToPx(this.bodyA.sizeBackup.y/2, canvas.canvasHeight)),
            } : {
                x: normToPx(this.pointA.x, canvas.canvasWidth),
                y: normToPx(this.pointA.y, canvas.canvasHeight),
            },
            pointB: (this.bodyB) ? {
                x: normToPx(this.pointB.x, normToPx(this.bodyB.sizeBackup.x/2, canvas.canvasWidth)),
                y: normToPx(this.pointB.y, normToPx(this.bodyB.sizeBackup.y/2, canvas.canvasHeight))
            } : {
                x: normToPx(this.pointB.x, canvas.canvasWidth),
                y: normToPx(this.pointB.y, canvas.canvasHeight),
            },
            length: this.length,
            stiffness: 0.00001
        })

        this.constraint.sqrLength = this.length * this.length;

        World.add(world, this.constraint);
    }

    step = () => {
        this.constraint.stiffness = ((Matter.Constraint.currentLength(this.constraint) > this.constraint.length) ?  1 : 0.00001);
    }

    show = () => {
        let Ax, Ay, Bx, By;

        let currentPointA = this.constraint.pointA;
        Ax = currentPointA.x;
        Ay = currentPointA.y;

        let currentPointB = this.constraint.pointB;
        Bx = currentPointB.x;
        By = currentPointB.y;

        if (this.bodyA) {
            let bodyAPos = this.bodyA.body.position;
            Ax += bodyAPos.x;
            Ay += bodyAPos.y;
        }

        if (this.bodyB) {
            let bodyBPos = this.bodyB.body.position;
            Bx += bodyBPos.x;
            By += bodyBPos.y;
        }

        line(Ax, Ay, Bx, By);
    }
}