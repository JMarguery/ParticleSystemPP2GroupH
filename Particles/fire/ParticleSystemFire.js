class ParticleSystemFire extends ParticleSystemBase{

    static particles;
    static particlesType;
    static simulation;
    static canvasManager;

    static create(nb_particles,simulation){
        super.create(nb_particles,simulation,ParticleFire,CanvasManager);
    };

    static pass() {
        this.canvasManager.context.fillStyle = 'rgba(255, 255, 255,'+ this.simulation.attenuationSpeed+')';
        this.canvasManager.context.fillRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);
        for (let particle of this.particles) {
            if (particle instanceof this.particlesType) {
                if (!particle.tickttl()){
                    particle.setPositionToSpawn()
                }
                particle.draw();
            }
        }
    };

}