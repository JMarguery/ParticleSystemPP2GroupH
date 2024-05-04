class ParticleFirework extends ParticlePhysic{

    splitammount;

    constructor(color,radius,posX,posY,maxttl,splitammount){
        super(color,radius,posX,posY,0,-2,maxttl,0.01);
        this.splitammount=splitammount;
    }   


    split(){
        console.log("splitting");
            let dir = genererDirectionsSymetriques(this.splitammount,0,Math.PI/4);
        console.log(dir);
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
        console.log(dir);
        let part = new ParticlePhysic(
            this.color,
            this.radius,
            this.position.x,
            this.position.y,
            dir.x,
            dir.y,
            this.maxttl,
            this.gravity*2);
        ParticleSystemFirework.addToSystem(part);
    }


    tickttl(){
        if (this.maxttl===-1){
            return true
        }
        this.ttl+=1
        return ((this.ttl<=this.maxttl));
    }

}