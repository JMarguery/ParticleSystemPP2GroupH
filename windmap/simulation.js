class Simulation {
    static width;
    static height;
    static nb_particules = 5000;
    static vitesseAttenuationTrace = 0.05;
    static radiusParticles = 0.5;
    static opacityParticles = 0.2;
    static dureeDeVieMini = 30;
    static dureeDeVieMaxi = 50;
    static minMovementToDraw = 0.05;
    static pause;
    static pauseButton =false;
    static speedFactor = 1;
    static lastFrameTime = 0;
    static fpsMin = 10;
    static lowFpsCount = 0;
    static maxLowFps = 30;


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
        CanvasManager.create(this.width, this.height, 'blue', this.vitesseAttenuationTrace,parent);

        VectorGrid.create(data);

        BackgroundCanvas.create(this.width, this.height,VectorGrid.vecteurs);

        CanvasManager.context.drawImage(BackgroundCanvas.offscreenCanvas, 0, 0);

        ParticleSystem.create(this.nb_particules, this.radiusParticles, this.opacityParticles, this.dureeDeVieMini, this.dureeDeVieMaxi , this.minMovementToDraw);

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
                /*
                console.log(`Fps en dessous de ${Simulation.fpsMin} pendant ${Simulation.lowFpsCount} frames`);
                console.log(`Le nombre de particules a été divisé par 1/4`);
                 */
                Simulation.nb_particules = Math.max(1000, Math.floor(ParticleSystem.particles.length / 1.25));
                ParticleSystem.updateParticleCount(Simulation.nb_particules);
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



}