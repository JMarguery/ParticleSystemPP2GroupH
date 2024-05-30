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

        try{
            document.getElementById('nb_particules').addEventListener('change', function () {
                const nb_particules = parseInt(this.value, 10);
                simulation.updateParticleCount(nb_particules);
            });
        }catch(error){
            console.log(error);
            console.log("nb_particule");
        }
        try {
            document.getElementById('vitesseAttenuationTrace').addEventListener('change', function () {
                const vitesseAttenuationTrace = parseFloat(this.value);
                simulation.updateAttenuationSpeed(vitesseAttenuationTrace);
            });
        }catch(error){
            console.log(error);
            console.log("vitesseAttenuationTrace");
        }

        try {
            document.getElementById('radiusParticles').addEventListener('change', function () {
                const radiusParticles = parseFloat(this.value);
                simulation.updateParticleRadius(radiusParticles);
            });
        }catch(error){
            console.log(error);
            console.log("radiusParticle");
        }
        try {
            document.getElementById('dureeDeVieMini').addEventListener('change', function () {
                const dureeDeVieMini = parseInt(this.value, 10);
                simulation.updateParticleTtlMini(dureeDeVieMini);
            });
        }catch(error){
            console.log(error);
            console.log("dureeDeVieMini");
        }

        try {
            document.getElementById('dureeDeVieMaxi').addEventListener('change', function () {
                const dureeDeVieMaxi = parseInt(this.value, 10);
                simulation.updateParticleTtlMax(dureeDeVieMaxi);
            });
        }catch (e) {
            console.log(e);
            console.log("dureeDeVieMaxi")
        }

        const speedFactorElement = document.getElementById('speedFactor');
        if (speedFactorElement) {
            speedFactorElement.addEventListener('change', function () {
                const speedFactor = parseFloat(this.value);
                console.log(speedFactor);
                simulation.updateSpeedFactor(speedFactor);
            });
        }

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


    static pause(){
        const pauseButton = document.getElementById('pauseButton');
        this.simulation.pauseButton = !this.simulation.pauseButton;
        if(this.simulation.pauseButton){
            pauseButton.innerText="▶";
        }else{
            pauseButton.innerText="❙❙";
        }
    }


}

