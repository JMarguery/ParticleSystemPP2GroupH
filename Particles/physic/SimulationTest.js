class SimulationPhysic extends SimulationBase{
    static width;
    static height;
    static nb_particules = 0;
    static attenuationSpeed = 0.1;
    static radiusParticle = 5;
    static opacityParticle = 1;
    static ttlMin = 300;
    static ttlMax = 500;
    static speedFactor = 1;
    static bounce_coeff = 0.8;
    static gravity = 0.05;
    static pause;
    static pauseButton = false;
    static dd = 0;
    static delta_add = 0;
    static fps_add = 0;
    static lastFrameTime = 0;
    static pastelColors = [
        'rgba(255,179,186,1)',
        'rgba(255,223,186,1)',
        'rgba(255,255,186,1)',
        'rgba(186,255,201,1)',
        'rgba(186,225,255,1)'

    ];


    static create(divId) {
        super.create(divId,ParticlePhysicBounded,ParticleSystemPhysic,CanvasManager);
        this.width = this.parent.clientWidth;
        this.height = this.parent.clientHeight;
        var boundingBox = {
            "left":0,
            "right":this.parent.clientWidth,
            "down":this.parent.clientHeight,
            "up":0,
        }
        MenuPhysic.create(this.systemType,this.canvasManager,SimulationPhysic);
        this.particleType.updateBoundingBox(boundingBox);

        this.canvasManager.create(this.width, this.height,"white",this.parent);

        this.systemType.create(this.nb_particules,this);

        Tester.create(0,
            50000,
            500,
            5,
            SimulationPhysic.updateParticleCount,
            this.a,
            10,
            SimulationPhysic.animate
        )

        //Tester.startTest();
        this.pause = false;
        this.animate(performance.now());
    }

    static animate(time){
        requestAnimationFrame(SimulationPhysic.animate);
        if(SimulationPhysic.pauseButton || SimulationPhysic.pause){
            return;
        }
        const delta = time - SimulationPhysic.lastFrameTime;
        SimulationPhysic.lastFrameTime = time;
        SimulationPhysic.delta_add +=delta;
        SimulationPhysic.fps_add+=1;
        if(SimulationPhysic.delta_add>=1000){
            Tester.onesec(SimulationPhysic.fps_add);
            SimulationPhysic.delta_add = 0;
            SimulationPhysic.fps_add = 0;
        }

        SimulationPhysic.systemType.pass();
    }

    static updateParticleCount(ammount){
        console.log("Next step, nb_particules = "+ammount);
        SimulationPhysic.nb_particules = ammount;
        SimulationPhysic.systemType.create(SimulationPhysic.nb_particules,SimulationPhysic);
    }

    static createNew(){
        const part = new ParticlePhysicBounded(
            this.pastelColors.sample(),
            this.radiusParticle,
            getRandomFloat(this.radiusParticle, this.canvasManager.canvas.width-this.radiusParticle),
            getRandomFloat(this.radiusParticle, this.canvasManager.canvas.height-this.radiusParticle),
            getRandomFloat(-2,2),
            getRandomFloat(-2,2),
            getRandomInt(this.ttlMin,this.ttlMax),
            this.gravity,
            this.bounce_coeff,
        )

        return part;
    }

    static updateGravity(gravity){
        this.gravity = gravity;
        for(let particle of this.systemType.particles){
            particle.gravity = gravity;
        }
    }

    static updateBounce(bounce_coeff){
        this.bounce_coeff = bounce_coeff;
        for(let particle of this.systemType.particles){
            particle.bounce_coeff = bounce_coeff;
        }
    }

    static a(){
        return;
    }

}