class ParticleSystemFirework {

    static color = [
        "red",
        "blue",
        "green",
        "magenta",
        "orange",
        "yellow"];

    static particles;

    static create(nb_particles, radiusParticles, opacityParticles){
        this.particles = [];
        for (let i = 0; i < nb_particles; i++) {
            this.particles.push(new ParticleFirework(
                getRandomRGBA(),
                radiusParticles,
                getRandomFloat(0, CanvasManager.canvas.width),
                CanvasManager.canvas.height,
                getRandomInt(Simulation.ttlMin,Simulation.ttlMax),
                5
            ));
        }

    }

    static pass() {
        let i = -1;
        for (let particle of this.particles) {
            i++;
            if (particle instanceof ParticleFirework) {
                if (!particle.tickttl()){
                    delete this.particles[i];
                    //particle.setPositionToSpawn();
                }
                particle.draw();
            }
        }
    }


    static addToSystem(particle){
        this.particles.push(particle);
    }

}