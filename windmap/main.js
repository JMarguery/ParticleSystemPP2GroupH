let width = window.innerWidth*0.90;
let height = width/2;

//let height = window.innerHeight;


if(width < 360){
    width = 360;
}
if(height < 181){
    height = 181;
}

let nb_particules = 5000;
let vitesseAttenuationTrace = 0.05;
let radiusParticles = 0.5;
let opacityParticles = 0.2;
let dureeDeVieMini = 30;
let dureeDeVieMaxi = 50;
let fps = 30;

// Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'blue', vitesseAttenuationTrace);


import jsonData from './data/test.json' with { type: 'json' };
export const data = jsonData;
VectorGrid.create(data);

BackgroundCanvas.create(width, height,VectorGrid.vecteurs);

CanvasManager.context.drawImage(BackgroundCanvas.offscreenCanvas, 0, 0);

ParticleSystem.create(nb_particules, radiusParticles, opacityParticles, dureeDeVieMini, dureeDeVieMaxi );


let lastTime = 0;
let interval = 1000 / fps;

function animate(currentTime) {
    requestAnimationFrame(animate);
    if (currentTime - lastTime > interval) {

        CanvasManager.context.globalAlpha = CanvasManager.speedAttenuationSpeed;
        CanvasManager.context.drawImage(BackgroundCanvas.offscreenCanvas, 0, 0, CanvasManager.canvas.width, CanvasManager.canvas.height);
        CanvasManager.context.globalAlpha = 1.0;

        ParticleSystem.pass();

        lastTime = currentTime;

    }
}

animate(performance.now());

document.getElementById('fps').addEventListener('change', function() {
    fps = parseInt(this.value, 10);
    adjustAnimationRate(fps);
});

function adjustAnimationRate(newFps) {
    fps = newFps;
    interval = 1000 / fps;

    requestAnimationFrame(animate);
}