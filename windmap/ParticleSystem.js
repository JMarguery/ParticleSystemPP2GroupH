class ParticleSystem {

    static particles;
    static radiusParticles;
    static opacityParticles;
    static ttlMin;
    static ttlMax;
    static hideSlowParticles;
    static minMovementToDraw;

    static create(nb_particles, radiusParticles, opacityParticles, dureeDeVieMini, dureeDeVieMax, minSpeedToDraw ){
        this.particles = [];
        for (let i = 0; i < nb_particles; i++) {
            this.particles.push(new ParticleWindMap(
                `rgba(255,255,255,${opacityParticles})`,
                radiusParticles,
                getRandomFloat(0, CanvasManager.canvas.width),
                getRandomFloat(0, CanvasManager.canvas.height),
                getRandomInt(dureeDeVieMini,dureeDeVieMax),
            ));
        }
        this.radiusParticles = radiusParticles;
        this.opacityParticles = opacityParticles;
        this.ttlMin = dureeDeVieMini;
        this.ttlMax = dureeDeVieMax;
        this.hideSlowParticles = false;
        this.minMovementToDraw = minSpeedToDraw;
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

    static updateParticleCount(nb_particules) {
        CanvasManager.resetBackground();
        if (nb_particules > ParticleSystem.particles.length) {
            for (let i = ParticleSystem.particles.length; i < nb_particules; i++) {
                this.particles.push(new ParticleWindMap(
                    `rgba(255,255,255,${this.opacityParticles})`,
                    this.radiusParticles,
                    getRandomFloat(0, CanvasManager.canvas.width),
                    getRandomFloat(0, CanvasManager.canvas.height),
                    getRandomInt(this.ttlMin, this.ttlMax)
                ));
            }
        }else if(nb_particules < this.particles.length){
            this.particles.length = nb_particules;
        }
    }

    static updateParticleTtlMax(dureeDeVieMaxi) {
        if(dureeDeVieMaxi >= this.ttlMin){
            CanvasManager.resetBackground();
            this.ttlMax = dureeDeVieMaxi;
            for(let particle of this.particles){
                particle.maxttl = getRandomInt(this.ttlMin, this.ttlMax);
            }
        }
    }

    static updateParticleTtlMini(dureeDeVieMini) {
        if(dureeDeVieMini <= this.ttlMax){
            CanvasManager.resetBackground();
            this.ttlMin = dureeDeVieMini;
            for(let particle of this.particles){
                particle.maxttl = getRandomInt(this.ttlMin, this.ttlMax);
            }
        }
    }

    static updateParticleOpacity(opacityParticles) {
        CanvasManager.resetBackground();
        this.opacityParticles = opacityParticles;
        for(let particle of this.particles){
            particle.color = `rgba(255,255,255,${this.opacityParticles})`;
        }
    }

    static updateParticleRadius(radiusParticles) {
        CanvasManager.resetBackground();
        this.radiusParticles = radiusParticles;
        for(let particle of this.particles){
            particle.radius = this.radiusParticles;
        }
    }

    static updateHideSlowParticles(cacherParticulesLentes) {
        this.hideSlowParticles = cacherParticulesLentes;
    }

    static updateMinMovementToDrawn(cacherParticulesLentes) {
        this.minMovementToDraw = cacherParticulesLentes;
    }

    static updateParticlePositions() {
        const topLeftCorner = CanvasManager.visibleTopLeftCorner;
        const bottomRightCorner = CanvasManager.visibleBottomRightCorner;

        for (let particle of this.particles) {
            let x = getRandomFloat(topLeftCorner.x, bottomRightCorner.x);
            let y = getRandomFloat(topLeftCorner.y, bottomRightCorner.y);

            particle.posX = x
            particle.posY = y
            particle.spawnX = x ;
            particle.spawnY = y ;
        }
    }

}