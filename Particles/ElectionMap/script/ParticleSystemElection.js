class ParticleSystemElection {

    static particles;
    static simulation;
    static canvasManager;

    static create(simulation,canvasManager){
        this.particles = [];
        this.simulation = simulation;
        this.canvasManager = canvasManager;
    }

    static addToSystem(particle){
        this.particles.push(particle);
    }

    static clearParticleSystem(){
        this.particles = [];
    }

    static pass(){
        for (const particle of this.particles) {
            particle.draw();
        }
    }

}