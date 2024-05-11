class ParticleFireworkOldTrail extends ParticleTrail{

    static trailLength = 10;
    splitammount;
    static particleSystem;
    constructor(color,radius,posX,posY,speedY,maxttl,splitammount,trailLength){
        super(color,radius,posX,posY,0,speedY,maxttl,0.01,trailLength);
        this.splitammount=splitammount;
    }


    split(){
        console.log("splitting");
        let dir = genererDirectionsSymetriques(this.splitammount,0,0);
        console.log(dir);
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
        console.log(dir);
        let part = new ParticleTrail(
            this.color,
            this.radius,
            this.position.x,
            this.position.y,
            dir.x,
            dir.y,
            this.maxttl,
            this.gravity*2,
            this.trailLength);
        ParticleFireworkOldTrail.particleSystem.addNewFirework(part);
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