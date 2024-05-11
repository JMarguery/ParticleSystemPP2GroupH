class SimulationBase {

    static width;
    static height;
    static nb_particules;
    static attenuationSpeed;
    static radiusParticle;
    static opacityParticle;
    static ttlMin;
    static ttlMax;
    static speedFactor;
//    static bounce_coeff;
//    static gravity;
    static pause;
    static pauseButton;

    static particleType;
    static systemType;
    static canvasManager;
    static parent;

    static create(divId,particleType,systemType,canvasManagerType){
        this.parent = document.getElementById(divId);
        this.particleType = particleType;
        this.systemType = systemType;
        this.canvasManager = canvasManagerType;
    }

// Windmap,Physic
    static updateSpeedFactor(speedFactor){
        if (speedFactor >=0){
            this.speedFactor = speedFactor;
        }
    }
// Windmap,Physic
    static updateParticleCount(nb_particules) {
        console.log(this.canvasManager);
        this.canvasManager.resetBackground();
        if (this.nb_particules > this.systemType.particles.length) {
            for (let i = this.systemType.particles.length; i < nb_particules; i++) {
                this.systemType.particles.push(this.createNew());
            }
        }else if(nb_particules < this.systemType.particles.length){
            this.systemType.particles.length = nb_particules;
        }
    }
// Windmap,Physic
    static updateParticleTtlMax(dureeDeVieMaxi) {
        if(dureeDeVieMaxi >= this.ttlMin){
            this.canvasManager.resetBackground();
            this.ttlMax = dureeDeVieMaxi;
            for(let particle of this.systemType.particles){
                particle.maxttl = getRandomInt(this.ttlMin, this.ttlMax);
            }
        }
    }
// Windmap,Physic
    static updateParticleTtlMini(dureeDeVieMini) {
        if(dureeDeVieMini <= this.ttlMax){
            this.canvasManager.resetBackground();
            this.ttlMin = dureeDeVieMini;
            for(let particle of this.systemType.particles){
                particle.maxttl = getRandomInt(this.ttlMin, this.ttlMax);
            }
        }
    }
// Windmap
    static updateParticleOpacity(opacityParticles) {
        this.canvasManager.resetBackground();
        this.opacityParticles = opacityParticles;
        const color = `rgba(255,255,255,${this.opacityParticles})`;
        for(let particle of this.systemType.particles){
            particle.color = color;
        }
    }
// Windmap,Physic
    static updateParticleRadius(radiusParticles) {
        this.canvasManager.resetBackground();
        this.radiusParticle = radiusParticles;
        for(let particle of this.systemType.particles){
            particle.radius = this.radiusParticle;
        }
    }
// Windmap
    static updateHideSlowParticles(cacherParticulesLentes) {
        this.hideSlowParticles = cacherParticulesLentes;
    }
// Windmap
    static updateMinMovementToDrawn(cacherParticulesLentes) {
        this.minMovementToDraw = cacherParticulesLentes;
    }
// Windmap,Physic
    static updateAttenuationSpeed(vitesseAttenuationTrace) {
        if (vitesseAttenuationTrace >= 0){
            this.attenuationSpeed = vitesseAttenuationTrace;
        }
    }
// Windmap
    static updateParticlePositions() {
        const topLeftCorner = this.canvasManager.visibleTopLeftCorner;
        const bottomRightCorner = this.canvasManager.visibleBottomRightCorner;

        for (let particle of this.systemType.particles) {
            let x = getRandomFloat(topLeftCorner.x, bottomRightCorner.x);
            let y = getRandomFloat(topLeftCorner.y, bottomRightCorner.y);

            particle.posX = x
            particle.posY = y
            particle.spawnX = x ;
            particle.spawnY = y ;
        }
    }

}