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

function zoomOutButton() {
    CanvasManager.zoomScale = 1;
    CanvasManager.offsetX = 0;
    CanvasManager.offsetY = 0;
    CanvasManager.applyTransformations();
}

function pause(){
    const pauseButton = document.getElementById('pauseButton');
    Simulation.pauseButton = !Simulation.pauseButton;
    if(Simulation.pauseButton){
        pauseButton.innerText="▶";
    }else{
        pauseButton.innerText="❙❙";
    }
}

function updateInputNbParticles(value){
    const nbParticles = document.getElementById('nb_particules');
    nbParticles.value = value;
}

function displaySpeedOnScale(speed){
    const scaleElement = document.getElementById('colorScale');
    const maxSpeed = VectorGrid.maxWindSpeed;
    const scaleWidth = scaleElement.offsetWidth;
    const position = (speed / maxSpeed) * scaleWidth;

    const marker = document.getElementById('colorScaleMarker');
    const speedText = document.getElementById('colorScaleMarkerText');
    marker.style.left = `${position}px`;
    speedText.textContent = `${speed.toFixed(2)}  `;
}

document.getElementById('nb_particules').addEventListener('change', function() {
    const nb_particules = parseInt(this.value, 10);
    Simulation.updateParticleCountWindMap(nb_particules);
});

document.getElementById('vitesseAttenuationTrace').addEventListener('change', function() {
    const vitesseAttenuationTrace = parseFloat(this.value);
    Simulation.updateAttenuationSpeed(vitesseAttenuationTrace);
});

document.getElementById('radiusParticles').addEventListener('change', function() {
    const radiusParticles = parseFloat(this.value);
    Simulation.updateParticleRadius(radiusParticles);
});

document.getElementById('opacityParticles').addEventListener('change', function() {
    const opacityParticles = parseFloat(this.value);
    Simulation.updateParticleOpacity(opacityParticles);
});

document.getElementById('dureeDeVieMini').addEventListener('change', function() {
    const dureeDeVieMini = parseInt(this.value, 10);
    Simulation.updateParticleTtlMini(dureeDeVieMini);
});

document.getElementById('dureeDeVieMaxi').addEventListener('change', function() {
    const dureeDeVieMaxi = parseInt(this.value, 10);
    Simulation.updateParticleTtlMax(dureeDeVieMaxi);
});


document.getElementById('cacherParticulesLentes').addEventListener('change', function() {
    const cacherParticulesLentes = this.checked;
    Simulation.updateHideSlowParticles(cacherParticulesLentes);
});

document.getElementById('deplacementMinimumPourAfficher').addEventListener('change', function() {
    const minMovementToDraw = parseFloat(this.value);
    Simulation.updateMinMovementToDrawn(minMovementToDraw);
});

document.getElementById('speedFactor').addEventListener('change', function() {
    const speedFactor = parseFloat(this.value);
    console.log(speedFactor);
    Simulation.updateSpeedFactor(speedFactor);
});


