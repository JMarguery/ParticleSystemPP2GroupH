class Simulation {
    static width;
    static height;
    static nb_particules = 1;
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

    static tt = 0;
    static ii = 0;
    static create(data) {
        const parent = document.getElementById("map");
        this.width = parent.clientWidth;
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

        Tester.create(0,
            50000,
            100,
            0,
            Simulation.updateParticleCountWindMap,
            this.aa,
            10,
            this.animate
        )

        this.pause = false;
        Tester.startTest();


    }

    static animate(time) {
        requestAnimationFrame(Simulation.animate);
        if(Simulation.pauseButton || Simulation.pause){
            return;
        }

        const delta = time - Simulation.lastFrameTime;
        Simulation.lastFrameTime = time;
        const fps = 1000 / delta;
        Simulation.tt+=delta;
        Simulation.ii+=1;
        if (Simulation.tt >= 1000){
            Tester.onesec(Simulation.ii);
            Simulation.ii = 0;
            Simulation.tt = 0;
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
        nb_particules = parseInt(nb_particules);
        this.nb_particules = nb_particules;
        CanvasManager.resetBackground();
        if (nb_particules > ParticleSystem.particles.length) {
            for (let i = ParticleSystem.particles.length; i < nb_particules; i++) {
                let p = new ParticleWindMap(
                    `rgba(255,255,255,${Simulation.opacityParticles})`,
                    Simulation.radiusParticles,
                    getRandomFloat(CanvasManager.visibleTopLeftCorner.x, CanvasManager.visibleBottomRightCorner.x),
                    getRandomFloat(CanvasManager.visibleTopLeftCorner.y, CanvasManager.visibleBottomRightCorner.y),
                    getRandomInt(Simulation.ttlMin, Simulation.ttlMax)
                );
                ParticleSystem.particles.push(p);
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


    static aa(){
        //ParticleSystem.create(this.nb_particules, this.radiusParticles, this.opacityParticles);
    }
}