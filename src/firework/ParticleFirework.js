class ParticleFirework extends ParticleTrail{

    splitammount;

    constructor(color,radius,posX,posY,maxttl,splitammount,trailLength){
        super(color,radius,posX,posY,0,-2,maxttl,0.01,trailLength);
        this.splitammount=splitammount;
    }   


    split(){
        console.log("splitting");
            let dir = genererDirectionsSymetriques(this.splitammount,0,Math.PI/4);
            for(let d of dir){
                this.instantiateFireworkChild(d);
            }
    }

    draw(){
        if(this.ttl==this.maxttl){
            this.split();
        }else{
            super.draw();
        }
    }

    instantiateFireworkChild(dir){
        new ParticleTrail(
            this.color,
            this.radius,
            this.position.x,
            this.position.y,
            dir.x,
            dir.y,
            this.maxttl,
            this.gravity*2,
            this.trailLength).instantiate();
    }

}