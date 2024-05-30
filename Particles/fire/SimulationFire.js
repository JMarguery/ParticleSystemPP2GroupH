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
    static minX;
    static maxX ;
    static minY ;
    static maxY ;



    static create(divId) {
        super.create(divId,ParticleFire,ParticleSystemFire,CanvasManager);
        this.width = this.parent.clientWidth;
        this.height = this.parent.clientHeight;

        MenuFire.create(this.systemType,this.canvasManager,SimulationFire);

        this.canvasManager.create(this.width, this.height,"white",this.parent);

        this.minX = this.width/2;
        this.maxX = this.width/2;
        this.minY = 6*this.height/7;
        this.maxY = 6*this.height/7;

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
            getRandomFloat(this.minX, this.maxX),
            getRandomFloat(this.minY, this.maxY),
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
        this.minX = Math.min(startX, endX);
        this.maxX = Math.max(startX, endX);
        this.minY = Math.min(startY, endY);
        this.maxY = Math.max(startY, endY);


        for (let particle of ParticleSystemFire.particles) {
            if (particle instanceof ParticleSystemFire.particlesType) {
                const randomX = getRandomFloat(this.minX, this.maxX);
                const randomY = getRandomFloat(this.minY, this.maxY);
                particle.posX = randomX;
                particle.posY = randomY;
                particle.spawnX = randomX;
                particle.spawnY = randomY;
                particle.ttl = 0;
            }
        }
    }

    static updateParticleCount(nb_particules){
        if (nb_particules > ParticleSystemFire.particles.length) {
            for (let i = ParticleSystemFire.particles.length; i < nb_particules; i++) {
                ParticleSystemFire.particles.push(SimulationFire.createNew());
            }
        }else if(nb_particules < ParticleSystemFire.particles.length){
            ParticleSystemFire.particles.length = nb_particules;
        }
    }


}