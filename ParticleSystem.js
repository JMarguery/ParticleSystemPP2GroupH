class ParticleSystem {

    static particles;

    static create(nb_particles, radiusParticles, opacityParticles){
        this.particles = [];
        for (let i = 0; i < nb_particles; i++) {
            this.particles.push(new ParticleWindMap(
                `rgba(255,255,255,${opacityParticles})`,
                radiusParticles,
                getRandomFloat(0, CanvasManager.canvas.width),
                getRandomFloat(0, CanvasManager.canvas.height),
                getRandomInt(Simulation.ttlMin,Simulation.ttlMax),
            ));
        }

    }

    static pass() {
        for (let particle of this.particles) {
            if (particle instanceof ParticleWindMap) {
                if (!particle.tickttl()){
                    particle.setPositionToSpawn();
                }
                particle.draw();
            }
        }
    }




}