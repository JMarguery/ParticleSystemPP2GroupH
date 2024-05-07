class ParticleSystemBase {

    static particles;
    static particlesType;
    static simulation;
    static canvasManager;

    static create(nb_particles,simulation,particlesType,canvasManager){
        this.particles = [];
        this.simulation = simulation;
        this.particlesType = particlesType;
        this.canvasManager = canvasManager;
        for (let i = 0; i<nb_particles;i++){
            this.particles.push(this.simulation.createNew());
        }
    }

}