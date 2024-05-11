class SimulationFirework extends SimulationBase {
    static width;
    static height;
    static nb_particules = 10;
    static attenuationSpeed = 0.1;
    static radiusParticle = 5;
    static opacityParticle = 1;
    static ttlMin = 100;
    static ttlMax = 300;
    static speedFactor = 1;
    static pause;
    static pauseButton;

    static particleType;
    static systemType;
    static canvasManager;
    static parent;

    static splitAmount = 12;
    static trailLength = 20;
    static minSpeedY = -2;
    static maxSpeedY = -3;

    static oldTrailMode = false;
    static create(){
        super.create("activity",ParticleFirework,ParticleSystemFirework,CanvasManager);
            this.width = this.parent.clientWidth;
            this.height = this.parent.clientHeight;
            MenuFirework.create(this.systemType,this.canvasManager,this);
            this.canvasManager.create(this.width,this.height,"white",this.parent);
            this.systemType.create(this.nb_particules,this,this.particleType,this.canvasManager);
            ParticleFirework.setSystem(this.systemType);
            ParticleFireworkOldTrail.setSystem(this.systemType);
            this.animate(performance.now());

        }


    static animate(time){
        requestAnimationFrame(SimulationFirework.animate);
        if(SimulationFirework.pauseButton || SimulationFirework.pause){
            return;
        }
        //  CanvasManager.resetBackground();
        SimulationFirework.systemType.pass();
    }

    static restartSim(){
        this.canvasManager.resetBackground();
        this.systemType.create(this.nb_particules,this,this.particleType,this.canvasManager);
    }

    static createNew(){
        return new this.particleType(
            getRandomRGBA(),
            this.radiusParticle,
            //this.width/2,
            getRandomFloat(0,this.width),
            this.height,
            getRandomFloat(this.minSpeedY,this.maxSpeedY),
            getRandomInt(this.ttlMin,this.ttlMax),
            this.splitAmount,
            this.trailLength
        );
    }

    static updateSplitAmount(splitAmount){
        this.splitAmount = splitAmount;
        this.restartSim();
    }

    static updateTrailLength(trailLength){
        this.trailLength = trailLength;
        this.restartSim();
    }

    static updateParticleCount(nb_particules){
        this.nb_particules = nb_particules;
        this.restartSim();
    }

    static updateMinSpeedY(minSpeedY){
        this.minSpeedY = minSpeedY;
        this.restartSim();
    }


    static updateMaxSpeedY(maxSpeedY){
        this.maxSpeedY = maxSpeedY;
        this.restartSim();
    }

    static updateOldTraceMode(is_oldTrailMode){
        this.oldTrailMode = is_oldTrailMode;
        if (this.oldTrailMode){
            this.particleType = ParticleFireworkOldTrail;
        }else{
            this.particleType = ParticleFirework;
        }
        this.restartSim();
    }
}