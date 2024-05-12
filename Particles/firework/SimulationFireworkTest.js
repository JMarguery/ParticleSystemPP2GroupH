class SimulationFirework extends SimulationBase {
    static width;
    static height;
    static nb_particules = 0;
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
    static lastFrameTime = 0;
    static trailLength = 20;
    static minSpeedY = -2;
    static maxSpeedY = -3;
    static oldTrailMode = false;

    static timeElapsed = 0;
    static frameNumber = 0;
    static animationFrame;


    static splitAmount = 12;
    static min_nb_particule = 0;
    static max_nb_particule = 5000;
    static step_nb_particule = 100;
    static measurement_amount = 5;
    static create(){
        super.create("activity",ParticleFirework,ParticleSystemFirework,CanvasManager);
        this.width = this.parent.clientWidth;
        this.height = this.parent.clientHeight;
        MenuFirework.create(this.systemType,this.canvasManager,this);
        this.canvasManager.create(this.width,this.height,"white",this.parent);
        this.systemType.create(this.nb_particules,this,this.particleType,this.canvasManager);
        ParticleFirework.setSystem(this.systemType);
        ParticleFireworkOldTrail.setSystem(this.systemType);

        Tester.create(
            0,
            5000,
            100,
            0,
            SimulationFirework.updateParticleCount,
            SimulationFirework.aa,
            5,
            this.animate
        )
        this.animate(performance.now());
        //Tester.startTest();

    }


    static animate(time){
        SimulationFirework.animationFrame = requestAnimationFrame(SimulationFirework.animate);
        if(SimulationFirework.pauseButton || SimulationFirework.pause){
            return;
        }
        const delta = time - SimulationFirework.lastFrameTime;
        SimulationFirework.lastFrameTime = time;
        SimulationFirework.timeElapsed+=delta;
        SimulationFirework.frameNumber+=1;
        if(SimulationFirework.timeElapsed>=1000){
            SimulationFirework.timeElapsed = 0;
            Tester.onesec(SimulationFirework.frameNumber);
            SimulationFirework.frameNumber = 0;
        }

        SimulationFirework.systemType.pass();
    }

    static restartSim(){
        SimulationFirework.canvasManager.resetBackground();
        SimulationFirework.systemType.create(this.nb_particules,this,this.particleType,this.canvasManager);
    }

    static createNew(){
        return new this.particleType(
            getRandomRGBA(),
            this.radiusParticle,
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
        SimulationFirework.restartSim();
    }

    static updateParticleCount(nb_particules){
        SimulationFirework.nb_particules = nb_particules;
        SimulationFirework.restartSim();
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

    static changeTraceModeTest(){
        this.particleType = ParticleFireworkOldTrail;

        Tester.create(
            0,
            5000,
            100,
            0,
            SimulationFirework.updateParticleCount,
            SimulationFirework.aa,
            5,
            this.animate
        )
        Tester.startTest();
        cancelAnimationFrame(SimulationFirework.animationFrame);
    }

    static aa(){

    }
}