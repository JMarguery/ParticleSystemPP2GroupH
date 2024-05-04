class ParticleTrail extends ParticlePhysic{

    constructor(color,radius,posX,posY,velX,velY,maxttl,gravity,trailLength){
        super(
            color,
            radius,
            posX,
            posY,
            velX,
            velY,
            maxttl+trailLength,
            gravity);
        this.trailLength = trailLength;

        this.isMovable = true;

        this.oldPositions = [];

        this.oldPositions.push({x:posX,y:posY});
    }

    draw(){
        this.move();
        super.draw();
    }

    move(){
        if(!this.isMovable){
            console.log(this);
            if (this.oldPositions.length > 0){
                this.updateOldPositions();
                this.oldPositions.pop();
                this.createTrail();
            }
        }else {
            if((this.position.x > CanvasManager.canvas.width || this.position.x < 0 || this.position.y > CanvasManager.canvas.height || this.position.y < 0 ) || this.ttl>=this.maxttl-this.trailLength){
                console.log("aa");
                this.isMovable = false;
                this.updateOldPositions();
                this.createTrail();
            }
            else {
                this.updateOldPositions();
                this.createTrail();
            }
        }
    }

    tickTTL(){
        this.ttl+=1;
        return ((((this.ttl<this.maxttl) || this.oldPositions.length==0)));
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
                const size = 1 - (i + 1) / this.oldPositions.length; // change petit a petit la taille
                CanvasManager.context.fillStyle = this.color;
                CanvasManager.context.beginPath();
                CanvasManager.context.arc(this.oldPositions[i].x, this.oldPositions[i].y, this.radius * size, 0, Math.PI * 2, true);
                CanvasManager.context.closePath();
                CanvasManager.context.fill();
            }
    }
}