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


document.getElementById('nb_particules').addEventListener('change', function() {
    nb_particules = parseInt(this.value, 10);
    ParticleSystem.updateParticleCount(nb_particules);
});

document.getElementById('vitesseAttenuationTrace').addEventListener('change', function() {
    vitesseAttenuationTrace = parseFloat(this.value);
    CanvasManager.updateAttenuationSpeed(vitesseAttenuationTrace);
});

document.getElementById('radiusParticles').addEventListener('change', function() {
    radiusParticles = parseFloat(this.value);
    ParticleSystem.updateParticleRadius(radiusParticles);
});

document.getElementById('opacityParticles').addEventListener('change', function() {
    opacityParticles = parseFloat(this.value);
    ParticleSystem.updateParticleOpacity(opacityParticles);
});

document.getElementById('dureeDeVieMini').addEventListener('change', function() {
    dureeDeVieMini = parseInt(this.value, 10);
    ParticleSystem.updateParticleTtlMini(dureeDeVieMini);
});

document.getElementById('dureeDeVieMaxi').addEventListener('change', function() {
    dureeDeVieMaxi = parseInt(this.value, 10);
    ParticleSystem.updateParticleTtlMax(dureeDeVieMaxi);
});

document.getElementById('cacherParticulesLentes').addEventListener('change', function() {
    cacherParticulesLentes = this.checked;
    console.log(cacherParticulesLentes);
    ParticleSystem.updateHideSlowParticles(cacherParticulesLentes);
});




