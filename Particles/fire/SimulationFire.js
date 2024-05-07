class SimulationFire extends SimulationBase{
    static width;
    static height;
    static nb_particules = 300;
    static attenuationSpeed = 0.15;
    static radiusParticle = 5;
    static opacityParticle = 1;
    static ttlMin = 100;
    static ttlMax = 200;
    static speedFactor = 0.1;
    static spreadX = 3;
    static spreadY = 6;
    static pause;
    static pauseButton = false;



    static create(divId) {
        super.create(divId,ParticleFire,ParticleSystemFire,CanvasManager);
        this.width = this.parent.clientWidth;
        this.height = this.parent.clientHeight;

        MenuFire.create(this.systemType,this.canvasManager,SimulationFire);

        this.canvasManager.create(this.width, this.height,"white",this.parent);

        this.systemType.create(this.nb_particules,this);

        this.animate(performance.now());
    }

    static animate(time){
        requestAnimationFrame(SimulationFire.animate);
        if(SimulationFire.pauseButton || SimulationFire.pause){
            return;
        }
        SimulationFire.systemType.pass();
    }

    static createNew(){
        const part = new ParticleFire(
            "rgba(255,255,0,1)",
            this.radiusParticle,
            this.width / 2,
            6 * this.height / 7,
            getRandomInt(this.ttlMin, this.ttlMax),
            getRandomFloat(10, 10),
        );
        return part;
    }

    static updateSpreadX(spreadX){
       if (spreadX > 0){
           this.spreadX = spreadX;
       }
    }

    static updateSpreadY(spreadY){
        if (spreadY > 0){
            this.spreadY = spreadY;
        }
    }

    static updateParticlesPosition(startX, startY, endX, endY){
        const minX = Math.min(startX, endX);
        const maxX = Math.max(startX, endX);
        const minY = Math.min(startY, endY);
        const maxY = Math.max(startY, endY);

        console.log("mini X : "+minX);
        console.log("max X : "+maxX);
        console.log(minY);
        console.log(maxY);

        for (let particle of ParticleSystemFire.particles) {
            if (particle instanceof ParticleSystemFire.particlesType) {
                const randomX = getRandomFloat(minX, maxX);
                const randomY = getRandomFloat(minY, maxY);
                particle.posX = randomX;
                particle.posY = randomY;
                particle.spawnX = randomX;
                particle.spawnY = randomY;
                particle.ttl = 0;
            }
        }
    }

}