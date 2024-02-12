class ParticlePhysicBounded extends ParticlePhysic{

    static boundingBox = {
        "left":0,
        "right":500,
        "down":500,
        "up":0,
    }

    constructor(
        color,
        radius,
        posX,
        posY,
        velX,
        velY,
        maxTTL,
        gravity,
        bounce_coeff){
        super(color,radius,posX,posY,velX,velY,maxTTL,gravity);
        this.bounce_coeff = bounce_coeff;
    }


    draw(){
        if (this.position.x-this.radius<ParticlePhysicBounded.boundingBox.left){
            this.position.x=ParticlePhysicBounded.boundingBox.left+this.radius;
            this.velocity.x*=-this.bounce_coeff;
        }else if(this.position.x+this.radius>ParticlePhysicBounded.boundingBox.right){
            this.position.x=ParticlePhysicBounded.boundingBox.right-this.radius;
            this.velocity.x*=-this.bounce_coeff;
        }
        if (this.position.y+this.radius>ParticlePhysicBounded.boundingBox.down){
            this.position.y=ParticlePhysicBounded.boundingBox.down-this.radius;
            //this.velocity.x*=-this.bounce_coeff;
            this.velocity.y*=-this.bounce_coeff;
        }else if(this.position.y-this.radius<ParticlePhysicBounded.boundingBox.up){
            this.position.y=ParticlePhysicBounded.boundingBox.up+this.radius;
            //this.velocity.x*=-this.bounce_coeff;
            this.velocity.y*=-this.bounce_coeff;
        }
        super.draw();
    }
}