
class ParticleSpeed extends Particle{
    constructor(startPosX,startPosY,radius,velX,velY,maxTTL){
        super(startPosX,startPosY,ParticleSpeed.colorFromVel(velX,velY),radius,velX,velY,maxTTL);
        this.getColorFromVelocity();
    }

    static colorFromVel(velX,velY){
        var speed = Math.abs(velX)+Math.abs(velY);
        var r,g,b;
        r = 10*speed;
        g = 255-6*speed;
        b = 0;
        return("rgb("+r+","+g+","+b+")");
    }

    getColorFromVelocity(){
        var speed = Math.abs(this.velocity.x)+Math.abs(this.velocity.y);
        var r,g,b;
        r = 10*speed;
        g = 255-6*speed;
        b = 0;
        return("rgb("+r+","+g+","+b+")");
    }

    move(){
        super.move();
        this.color=this.getColorFromVelocity();
    }
}