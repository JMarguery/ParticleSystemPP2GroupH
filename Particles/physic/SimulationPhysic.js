class SimulationPhysic {
    static width;
    static height;
    static nb_particules = 300;
    static attenuationSpeed = 0.05;
    static radiusParticle = 3;
    static opacityParticle = 1;
    static ttlMin = 300;
    static ttlMax = 500;
    static speedFactor = 1;
    static bounce_coeff = 0.8;
    static gravity = 0.05;
    static pause;
    static pauseButton = false;



    static create() {
        const parent = document.getElementById("physic");
        this.width = parent.clientWidth;
        this.height = parent.clientHeight;

        var boundingBox = {
            "left":0,
            "right":parent.clientWidth,
            "down":parent.clientHeight,
            "up":0,
        }

        ParticlePhysicBounded.updateBoundingBox(boundingBox);

        console.log(ParticlePhysicBounded.boundingBox)

        CanvasManager.create(this.width, this.height,"white",parent);

        ParticleSystemPhysic.create(this.nb_particules,this.radiusParticle);

        SimulationPhysic.animate(performance.now());
    }

    static animate(time){
        requestAnimationFrame(SimulationPhysic.animate);
        if(SimulationPhysic.pauseButton || SimulationPhysic.pause){
            return;
        }

        ParticleSystemPhysic.pass();
    };

}