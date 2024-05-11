class ParticleFirework extends ParticlePhysic{

    splitammount;
    static particleSystem;
    constructor(color,radius,posX,posY,speedY,maxttl,splitammount){
        super(color,radius,posX,posY,0,speedY,maxttl,0.01);
        this.splitammount=splitammount;
    }   


    split(){
            let dir = genererDirectionsSymetriques(this.splitammount,0,Math.PI/4);
        let childrens = []
            for(let d of dir){
                childrens.push(this.instantiateFireworkChild(d));
            }
        return childrens;
    }

    draw(){
        if(this.ttl==this.maxttl){
            this.split();
        }else{
            super.draw();
        }
    }

    instantiateFireworkChild(dir){
        let part = new ParticlePhysic(
            this.color,
            this.radius,
            this.position.x,
            this.position.y,
            dir.x,
            dir.y,
            this.maxttl,
            this.gravity*2);
        ParticleFirework.particleSystem.addNewFirework(part);
    }


    tickttl(){
        if (this.maxttl===-1){
            return true
        }
        this.ttl+=1
        return ((this.ttl<=this.maxttl));
    }

    static setSystem(system){
        this.particleSystem = system;
    }

}