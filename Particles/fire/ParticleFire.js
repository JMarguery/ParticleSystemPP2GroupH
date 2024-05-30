class ParticleFire extends Particle {

    maxSpeed;

    spawnX;

    spawnY;


    constructor(color,radius,posX,posY,maxttl,maxSpeed){

        super(color,radius,posX,posY,maxttl);

        this.maxSpeed = maxSpeed;

        this.spawnX = posX;

        this.spawnY = posY;

    }


    draw(){
        this.move();
        this.drawFireParticle();
    }

    move(){
        this.goUpwards();
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
            x:getRandomFloat(-SimulationFire.spreadX,SimulationFire.spreadX),
            y:getRandomFloat(0,-SimulationFire.spreadY),
        };

        this.limitSpeed(direction);

        this.position.x += direction.x;
        this.position.y += direction.y;
    }


    drawFireParticle() {
        let maxSize = this.radius;
        let size = maxSize * (1 - Math.pow(this.ttl / this.maxttl, 2));

        let rgbaMatch = this.color.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
        let redValue = parseInt(rgbaMatch[1]);
        let greenValue = parseInt(rgbaMatch[2])-Math.abs(this.position.y - this.spawnY);
        let blueValue = parseInt(rgbaMatch[3]);
        let initialAlpha = parseFloat(rgbaMatch[4]);

        let alphaValue = initialAlpha * (1 - Math.pow(this.ttl / this.maxttl, 3));

        CanvasManager.context.fillStyle = `rgba(${redValue},${greenValue},${blueValue},${alphaValue})`;
        CanvasManager.context.beginPath();
        CanvasManager.context.arc(this.position.x, this.position.y, size, 0, Math.PI * 2, true);
        CanvasManager.context.closePath();
        CanvasManager.context.fill();
    }


    setPositionToSpawn(){
        this.ttl = 0;
        this.position.x = this.spawnX;
        this.position.y = this.spawnY;
    }





}