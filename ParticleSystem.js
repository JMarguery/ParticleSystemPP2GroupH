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

    static createFireParticles(nb_particles, radiusParticles, opacityParticles){
        this.particles = [];
        for (let i = 0; i < nb_particles; i++) {
            ParticleSystem.particles.push(new ParticleFire(
                `rgba(255,255,0,${opacityParticles})`,
                radiusParticles,
                getRandomFloat((CanvasManager.canvas.width/2)-50,(CanvasManager.canvas.width/2)+50),
                CanvasManager.canvas.height*3/4,
                getRandomInt(Simulation.ttlMin, Simulation.ttlMax),
                Simulation.speedFactor,
                Simulation.spreadX,
                Simulation.spreadY
            ));
        }
    }

    static createSmokeParticles(nb_particles, radiusParticles, opacityParticles){
        this.particles = [];
        for (let i = 0; i < nb_particles; i++) {
            ParticleSystem.particles.push(new ParticleSmoke(
                `rgba(255,255,255,${opacityParticles})`,
                radiusParticles,
                CanvasManager.canvas.width/2,
                CanvasManager.canvas.height*3/4,
                getRandomInt(Simulation.ttlMin, Simulation.ttlMax),
                Simulation.speedFactor,
                Simulation.spreadX,
                Simulation.spreadY
            ));
        }
    }

    static pass() {
        for (let particle of this.particles) {
            if (particle instanceof Particle) {
                if (!particle.tickttl()){
                    particle.setPositionToSpawn();
                }
                particle.draw();
            }
        }
    }




}