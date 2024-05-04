class ParticleSystemPhysic {

    static particles;
    static particlesType=ParticlePhysicBounded;
    static pastelColors = [
        'rgba(255,179,186,1)',
        'rgba(255,223,186,1)',
        'rgba(255,255,186,1)',
        'rgba(186,255,201,1)',
        'rgba(186,225,255,1)'

    ];


    static create(nb_particles){
        this.particles = [];
        for (let i = 0; i<nb_particles;i++){
            this.particles.push(new ParticlePhysicBounded(
                this.pastelColors.sample(),
                SimulationPhysic.radiusParticle,
                getRandomFloat(5, CanvasManager.canvas.width-5),
                getRandomFloat(0, CanvasManager.canvas.height-5),
                getRandomFloat(-2,2),
                getRandomFloat(-2,2),
                getRandomInt(SimulationPhysic.ttlMin,SimulationPhysic.ttlMax),
                SimulationPhysic.gravity,
                SimulationPhysic.bounce_coeff,
            ))
        }
    };

    static pass() {
        let i = 0;
        CanvasManager.context.fillStyle = 'rgba(255, 255, 255, 0.05)';
        CanvasManager.context.fillRect(0, 0, CanvasManager.canvas.width, CanvasManager.canvas.height);
        for (let particle of this.particles) {
            i++;
            if (particle instanceof this.particlesType) {
                if (!particle.tickttl()){
                    particle.recycleParticle(
                        this.pastelColors.sample(),
                        SimulationPhysic.radiusParticle,
                        getRandomFloat(5, CanvasManager.canvas.width-5),
                        getRandomFloat(0, CanvasManager.canvas.height-5),
                        getRandomFloat(-2,2),
                        getRandomFloat(-2,2),
                        getRandomInt(SimulationPhysic.ttlMin,SimulationPhysic.ttlMax),
                        0.05,
                        0.6
                    );

                }
                particle.draw();
            }
        }
    };

}