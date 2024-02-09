class ParticleSmoke extends ParticleFire{

    static windSpeed = 0;

    constructor(color,radius,posX,posY,maxttl,maxSpeed, trailLength, spreadX, spreadY){
        super(
            color,
            radius,
            posX,
            posY,
            maxttl,
            maxSpeed,
            trailLength, 
            spreadX, 
            spreadY)
        }

    createTrail(){
        for (let i = 0; i < this.oldPositions.length; i++) {
            let size = (i + 1) / this.trailLength; // change petit a petit la taille
            /*
            let rgbaMatch = this.color.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);


            let redValue = parseInt(rgbaMatch[1])+255-Math.abs(this.oldPositions[i].y - this.startPosY);
            let greenValue = parseInt(rgbaMatch[2])+255-Math.abs(this.oldPositions[i].y - this.startPosY);
            let blueValue = parseInt(rgbaMatch[3])+255-Math.abs(this.oldPositions[i].y - this.startPosY);
            let alphaValue = parseFloat(rgbaMatch[4]);
            // Calculate the new alpha value, making sure it stays within [0, 1]
            alphaValue = (i + 1) / this.oldPositions.length;

            CanvasManager.context.fillStyle = `rgba(${redValue},${greenValue},${blueValue},${alphaValue})`;
             */
            CanvasManager.context.fillStyle = this.color;
            CanvasManager.context.beginPath();
            CanvasManager.context.arc(this.oldPositions[i].x, this.oldPositions[i].y, this.radius * size, 0, Math.PI * 2, true);
            CanvasManager.context.closePath();
            CanvasManager.context.fill();
        }
    }

    goUpwards(){
        this.position.x+=ParticleSmoke.windSpeed;
        super.goUpwards();
    }

    static updateWindSpeed(speed){
        ParticleSmoke.windSpeed=speed;
    }

}