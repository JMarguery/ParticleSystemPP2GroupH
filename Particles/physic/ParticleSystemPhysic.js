class ParticleSystemPhysic extends ParticleSystemBase{

    static particles;
    static particlesType;
    static simulation;
    static canvasManager;

    static create(nb_particles,simulation){
        super.create(nb_particles,simulation,ParticlePhysicBounded,CanvasManager);
    };

    static pass() {
        let i = 0;
        this.canvasManager.context.fillStyle = 'rgba(255, 255, 255,'+ this.simulation.attenuationSpeed+')';
        this.canvasManager.context.fillRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);
        for (let particle of this.particles) {
            i++;
            if (particle instanceof this.particlesType) {
                if (!particle.tickttl()){
                    particle.recycleParticle(
                        this.simulation.pastelColors.sample(),
                        this.simulation.radiusParticle,
                        getRandomFloat(5, this.canvasManager.canvas.width-5),
                        getRandomFloat(0, this.canvasManager.canvas.height-5),
                        getRandomFloat(-2,2),
                        getRandomFloat(-2,2),
                        getRandomInt(this.simulation.ttlMin,this.simulation.ttlMax),
                        this.simulation.gravity,
                        this.simulation.bounce_coeff
                    );

                }
                particle.draw();
            }
        }
    };

}