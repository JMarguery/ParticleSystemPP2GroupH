function toggleMenu() {
    const menu = document.getElementById('burgerMenu');
    const content = document.getElementById('menuContent');

    if (menu.classList.contains('collapsed')) {
        menu.classList.remove('collapsed');
        content.style.display = 'block';
    } else {
        menu.classList.add('collapsed');
        content.style.display = 'none';
    }
}

function unzoom() {
    CanvasManager.zoomScale = 1;
    CanvasManager.offsetX = 0;
    CanvasManager.offsetY = 0;
    CanvasManager.resetBackground();
    ParticleSystem.updateParticlePositions();
}

function pause(){
    const pauseButton = document.getElementById('pauseButton');
    Simulation.pauseButton = !Simulation.pauseButton;
    if(Simulation.pauseButton){
        pauseButton.innerText="|>";
    }else{
        pauseButton.innerText="||";
    }
}


document.getElementById('nb_particules').addEventListener('change', function() {
    const nb_particules = parseInt(this.value, 10);
    ParticleSystem.updateParticleCount(nb_particules);
});

document.getElementById('vitesseAttenuationTrace').addEventListener('change', function() {
    const vitesseAttenuationTrace = parseFloat(this.value);
    CanvasManager.updateAttenuationSpeed(vitesseAttenuationTrace);
});

document.getElementById('radiusParticles').addEventListener('change', function() {
    const radiusParticles = parseFloat(this.value);
    ParticleSystem.updateParticleRadius(radiusParticles);
});

document.getElementById('opacityParticles').addEventListener('change', function() {
    const opacityParticles = parseFloat(this.value);
    ParticleSystem.updateParticleOpacity(opacityParticles);
});

document.getElementById('dureeDeVieMini').addEventListener('change', function() {
    const dureeDeVieMini = parseInt(this.value, 10);
    ParticleSystem.updateParticleTtlMini(dureeDeVieMini);
});

document.getElementById('dureeDeVieMaxi').addEventListener('change', function() {
    const dureeDeVieMaxi = parseInt(this.value, 10);
    ParticleSystem.updateParticleTtlMax(dureeDeVieMaxi);
});

document.getElementById('fps').addEventListener('change', function() {
    const fps = parseInt(this.value, 10);
    Simulation.adjustAnimationRate(fps);
});

document.getElementById('cacherParticulesLentes').addEventListener('change', function() {
    const cacherParticulesLentes = this.checked;
    ParticleSystem.updateHideSlowParticles(cacherParticulesLentes);
});

document.getElementById('deplacementMinimumPourAfficher').addEventListener('change', function() {
    const minMovementToDraw = parseFloat(this.value);
    console.log(minMovementToDraw);
    ParticleSystem.updateMinMovementToDrawn(minMovementToDraw);
});


