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


    static create(data) {
        this.width = window.innerWidth-75;
        this.height = this.width*0.5;
        if(this.width < 360){
            this.width = 360;
        }
        if(this.height < 181){
            this.height = 181;
        }

        this.pause = false;
        CanvasManager.create(this.width, this.height, 'blue', this.vitesseAttenuationTrace);

        VectorGrid.create(data);

        BackgroundCanvas.create(this.width, this.height,VectorGrid.vecteurs);

        CanvasManager.context.drawImage(BackgroundCanvas.offscreenCanvas, 0, 0);

        ParticleSystem.create(this.nb_particules, this.radiusParticles, this.opacityParticles, this.dureeDeVieMini, this.dureeDeVieMaxi , this.minMovementToDraw);

        Simulation.animate(performance.now());
    }

    static animate(time) {
        requestAnimationFrame(Simulation.animate);
        if(Simulation.pauseButton){
            return;
        }
        if(Simulation.pause){
            return;
        }
        CanvasManager.drawAttenuatedBackground();

        ParticleSystem.pass();
        }

    static updateSpeedFactor(speedFactor) {
        this.speedFactor = speedFactor;
    }



}