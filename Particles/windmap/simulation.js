class Simulation {
    static width;
    static height;
    static nb_particules = 5000;
    static attenuationSpeed = 0.05;
    static radiusParticles = 0.5;
    static opacityParticles = 0.2;
    static ttlMin = 30;
    static ttlMax = 50;
    static minMovementToDraw = 0.05;
    static pause;
    static pauseButton =false;
    static speedFactor = 1;
    static lastFrameTime = 0;
    static fpsMin = 10;
    static lowFpsCount = 0;
    static maxLowFps = 30;
    static hideSlowParticles = false;


    static create(data) {
        const parent = document.getElementById("map");
        this.width = parent.clientWidth;
        //this.height = parent.clientHeight;

        //this.width = window.innerWidth-200;
        this.height = this.width*0.5;
        if(this.width < 360){
            this.width = 360;
        }
        if(this.height < 180){
            this.height = 180;
        }

        this.pause = true;

        CanvasManager.create(this.width, this.height, 'white',parent);

        VectorGrid.create(data);

        BackgroundCanvas.create(this.width, this.height,VectorGrid.vecteurs);

        CanvasManager.context.drawImage(BackgroundCanvas.offscreenCanvas, 0, 0);

        ParticleSystem.create(this.nb_particules, this.radiusParticles, this.opacityParticles);

        this.pause = false;
        Simulation.animate(performance.now());
    }

    static animate(time) {
        requestAnimationFrame(Simulation.animate);
        if(Simulation.pauseButton || Simulation.pause){
            return;
        }

        const delta = time - Simulation.lastFrameTime;
        Simulation.lastFrameTime = time;
        const fps = 1000 / delta;

        if (fps < Simulation.fpsMin) {
            Simulation.lowFpsCount++;
            if (Simulation.lowFpsCount >= Simulation.maxLowFps) {
                Simulation.nb_particules = Math.max(1000, Math.floor(ParticleSystem.particles.length / 1.25));
                Simulation.updateParticleCountWindMap(Simulation.nb_particules);
                updateInputNbParticles(Simulation.nb_particules);
                Simulation.lowFpsCount = 0;
            }
        } else {
            Simulation.lowFpsCount = 0;
        }

        CanvasManager.drawAttenuatedBackground();

        ParticleSystem.pass();
    }

    static updateSpeedFactor(speedFactor) {
        if (speedFactor >= 0){
            this.speedFactor = speedFactor;
        }
    }

    static updateParticleCountWindMap(nb_particules) {
        CanvasManager.resetBackground();
        if (nb_particules > ParticleSystem.particles.length) {
            for (let i = ParticleSystem.particles.length; i < nb_particules; i++) {
                ParticleSystem.particles.push(new ParticleWindMap(
                    `rgba(255,255,255,${this.opacityParticles})`,
                    this.radiusParticles,
                    getRandomFloat(CanvasManager.visibleTopLeftCorner.x, CanvasManager.visibleBottomRightCorner.x),
                    getRandomFloat(CanvasManager.visibleTopLeftCorner.y, CanvasManager.visibleBottomRightCorner.y),
                    getRandomInt(this.ttlMin, this.ttlMax)
                ));
            }
        }else if(nb_particules < ParticleSystem.particles.length){
            ParticleSystem.particles.length = nb_particules;
        }
    }

    static updateParticleTtlMax(dureeDeVieMaxi) {
        if(dureeDeVieMaxi >= this.ttlMin){
            CanvasManager.resetBackground();
            this.ttlMax = dureeDeVieMaxi;
            for(let particle of ParticleSystem.particles){
                particle.maxttl = getRandomInt(this.ttlMin, this.ttlMax);
            }
        }
    }

    static updateParticleTtlMini(dureeDeVieMini) {
        if(dureeDeVieMini <= this.ttlMax){
            CanvasManager.resetBackground();
            this.ttlMin = dureeDeVieMini;
            for(let particle of ParticleSystem.particles){
                particle.maxttl = getRandomInt(this.ttlMin, this.ttlMax);
            }
        }
    }

    static updateParticleOpacity(opacityParticles) {
        CanvasManager.resetBackground();
        this.opacityParticles = opacityParticles;
        const color = `rgba(255,255,255,${this.opacityParticles})`;
        for(let particle of ParticleSystem.particles){
            particle.color = color;
        }
    }

    static updateParticleRadius(radiusParticles) {
        CanvasManager.resetBackground();
        this.radiusParticles = radiusParticles;
        for(let particle of ParticleSystem.particles){
            particle.radius = this.radiusParticles;
        }
    }

    static updateHideSlowParticles(cacherParticulesLentes) {
        this.hideSlowParticles = cacherParticulesLentes;
    }

    static updateMinMovementToDrawn(cacherParticulesLentes) {
        this.minMovementToDraw = cacherParticulesLentes;
    }

    static updateAttenuationSpeed(vitesseAttenuationTrace) {
        if (vitesseAttenuationTrace >= 0){
            this.attenuationSpeed = vitesseAttenuationTrace;
        }
    }

    static updateParticlePositions() {
        const topLeftCorner = CanvasManager.visibleTopLeftCorner;
        const bottomRightCorner = CanvasManager.visibleBottomRightCorner;

        for (let particle of ParticleSystem.particles) {
            let x = getRandomFloat(topLeftCorner.x, bottomRightCorner.x);
            let y = getRandomFloat(topLeftCorner.y, bottomRightCorner.y);

            particle.posX = x
            particle.posY = y
            particle.spawnX = x ;
            particle.spawnY = y ;
        }
    }

}