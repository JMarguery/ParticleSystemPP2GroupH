class ParticleFire extends Particle {

    maxSpeed;

    oldPositions;

    isMovable;

    trailLength;

    constructor(color,radius,posX,posY,passeur,maxttl,maxSpeed, trailLength){

        super(color,radius,posX,posY,passeur,(maxttl+trailLength));

        this.maxSpeed = maxSpeed;

        this.oldPositions = [];

        this.oldPositions.push({x:posX,y:posY});

        this.isMovable = true;

        this.trailLength = trailLength;

    }


    draw(){
        this.move();
    }

    move(){
        if(!this.isMovable){
            if (this.oldPositions.length > 0){
                this.oldPositions.pop();
                this.createTrail();
            }
        }else {
            if((this.position.x > CanvasManager.canvas.width || this.position.x < 0 || this.position.y > CanvasManager.canvas.height || this.position.y < 0 ) || this.ttl>=this.maxttl-this.trailLength){
                this.isMovable = false;
                this.createTrail();
            }
            else {
                this.goUpwards();
            }
        }
    }


    tickTTL(){
        this.ttl+=1;
        return ((((this.ttl<this.maxttl) || this.oldPositions.length===0)));
    }

    limitSpeed(vector){
        const speed = Math.sqrt(vector.x ** 2 + vector.y ** 2);
        if (speed > this.maxSpeed) {
            vector.x = (vector.x / speed) * this.maxSpeed;
            vector.y = (vector.y / speed) * this.maxSpeed;
        }
    }

    goUpwards() {
        let direction = {
            x:getRandomFloat(-40,40),
            y:getRandomFloat(0,-30),
        };

        this.updateOldPositions();

        this.limitSpeed(direction);

        this.position.x += direction.x;
        this.position.y += direction.y;

        this.createTrail();
    }


    updateOldPositions(){
        if (this.oldPositions.length < this.trailLength){
            let x = this.position.x;
            let y = this.position.y;
            this.oldPositions.unshift({x, y});
        }else{
            let x = this.position.x;
            let y = this.position.y;
            this.oldPositions.unshift({x, y});
            this.oldPositions.pop(); // Supprime le dernier élément du tableau pour maintenir la longueur
        }
    }

    createTrail(){
        for (let i = 0; i < this.oldPositions.length; i++) {
            let size = (i + 1) / this.oldPositions.length; // change petit a petit la taille
            let rgbaMatch = this.color.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);

            let redValue = parseInt(rgbaMatch[1]);
            let greenValue = parseInt(rgbaMatch[2]);
            let blueValue = parseInt(rgbaMatch[3]);
            let alphaValue = parseFloat(rgbaMatch[4]);

            // Calculate the new alpha value, making sure it stays within [0, 1]
            alphaValue = (i + 1) / this.oldPositions.length;

            CanvasManager.context.fillStyle = `rgba(${redValue},${greenValue},${blueValue},${alphaValue})`;
            CanvasManager.context.beginPath();
            CanvasManager.context.arc(this.oldPositions[i].x, this.oldPositions[i].y, this.radius * size, 0, Math.PI * 2, true);
            CanvasManager.context.closePath();
            CanvasManager.context.fill();
        }
    }

}