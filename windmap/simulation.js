class Simulation {
    static width;
    static height;
    static nb_particules = 5000;
    static vitesseAttenuationTrace = 0.05;
    static radiusParticles = 1;
    static opacityParticles = 1;
    static dureeDeVieMini = 30;
    static dureeDeVieMaxi = 50;
    static fps = 300;
    static lastTime = 0;
    static interval = 1000 / this.fps;
    static minMovementToDraw = 0.05;
    static pause;


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

    static animate(currentTime) {
        requestAnimationFrame(Simulation.animate);
        if (currentTime - Simulation.lastTime > Simulation.interval) {
            if(Simulation.pause){
                return;
            }
            CanvasManager.context.globalAlpha = CanvasManager.attenuationSpeed;
            const sourceX = -CanvasManager.offsetX / CanvasManager.zoomScale;
            const sourceY = -CanvasManager.offsetY / CanvasManager.zoomScale;
            const sourceWidth = CanvasManager.canvas.width / CanvasManager.zoomScale;
            const sourceHeight = CanvasManager.canvas.height / CanvasManager.zoomScale;
            CanvasManager.context.drawImage(
                BackgroundCanvas.offscreenCanvas,  // Image source
                sourceX, sourceY,                 // Coordonnées du coin supérieur gauche du sous-rectangle de la source
                sourceWidth, sourceHeight,        // Largeur et hauteur du sous-rectangle de la source
                0, 0,                             // Coordonnées du coin supérieur gauche de la destination
                CanvasManager.canvas.width, CanvasManager.canvas.height  // Largeur et hauteur de la destination
            );
            CanvasManager.context.globalAlpha = 1.0;

            ParticleSystem.pass();

            Simulation.lastTime = currentTime;

        }
    }

    static adjustAnimationRate(newFps) {
        this.fps = newFps;
        this.interval = 1000 / this.fps;

        requestAnimationFrame(this.animate);
    }
}