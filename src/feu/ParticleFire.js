class ParticleFire extends Particle {

    maxSpeed;

    oldPositions;

    isMovable;

    trailLength;

    spreadX;

    spreadY;

    startPosX;

    startPosY;

    constructor(color,radius,posX,posY,maxttl,maxSpeed, trailLength, spreadX, spreadY){

        super(color,radius,posX,posY,(maxttl+trailLength));

        this.maxSpeed = maxSpeed;

        this.oldPositions = [];

        this.oldPositions.push({x:posX,y:posY});

        this.isMovable = true;

        this.trailLength = trailLength;

        this.spreadX = spreadX;

        this.spreadY = spreadY;

        this.startPosX = posX;

        this.startPosY = posY;

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
            x:getRandomFloat(-this.spreadX/2,this.spreadX/2),
            y:getRandomFloat(0,-this.spreadY),
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
            let size = (i + 1) / (this.trailLength/2); // change petit a petit la taille
            let rgbaMatch = this.color.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);

            let redValue = parseInt(rgbaMatch[1]);
            let greenValue = parseInt(rgbaMatch[2])+255-Math.abs(this.oldPositions[i].y - this.startPosY);
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