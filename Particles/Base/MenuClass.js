class Menu {

    static menu;
    static content;

    static system;
    static canvasManager;
    static simulation;

    static create(system, canvasManager, simulation) {
        this.system = system;
        this.canvasManager = canvasManager;
        this.simulation = simulation;


        document.getElementById('nb_particules').addEventListener('change', function() {
            const nb_particules = parseInt(this.value, 10);
            simulation.updateParticleCount(nb_particules);
        });

        document.getElementById('vitesseAttenuationTrace').addEventListener('change', function() {
            const vitesseAttenuationTrace = parseFloat(this.value);
            simulation.updateAttenuationSpeed(vitesseAttenuationTrace);
        });

        document.getElementById('radiusParticles').addEventListener('change', function() {
            const radiusParticles = parseFloat(this.value);
            simulation.updateParticleRadius(radiusParticles);
        });

        document.getElementById('dureeDeVieMini').addEventListener('change', function() {
            const dureeDeVieMini = parseInt(this.value, 10);
            simulation.updateParticleTtlMini(dureeDeVieMini);
        });

        document.getElementById('dureeDeVieMaxi').addEventListener('change', function() {
            const dureeDeVieMaxi = parseInt(this.value, 10);
            simulation.updateParticleTtlMax(dureeDeVieMaxi);
        });



        document.getElementById('speedFactor').addEventListener('change', function() {
            const speedFactor = parseFloat(this.value);
            console.log(speedFactor);
            simulation.updateSpeedFactor(speedFactor);
        });

    }

    static updateInputNbParticles(value) {
        const nbParticles = document.getElementById('nb_particules');
        nbParticles.value = value;
    };

    static toggleMenu() {
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
}

