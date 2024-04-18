/* 
___________________________________________________________


Class Passeur :

Contient une liste de toutes les particules a mettre à jour et les supprime/met à jour selon 

___________________________________________________________

Champs :

 priorityArray : Array a dessiner en priorité (= dessous).
 passArray : Array de Particle pour la mise à jour du canvas
___________________________________________________________

Constructeur :

Passeur(
    Array<Particle> passArray=[]
    )
___________________________________________________________
*/

class ParticleSystem {

    static particles;
    static radiusParticles;
    static opacityParticles;
    static ttlMin;
    static ttlMax;
    static hideSlowParticles;
    static minMovementToDraw;

    static create(nb_particles, radiusParticles, opacityParticles, dureeDeVieMini, dureeDeVieMax, minSpeedToDraw ){
        this.particles = [];
        for (let i = 0; i < nb_particles; i++) {
            this.particles.push(new ParticleWindMap(
                `rgba(255,255,255,${opacityParticles})`,
                radiusParticles,
                getRandomFloat(0, CanvasManager.canvas.width),
                getRandomFloat(0, CanvasManager.canvas.height),
                getRandomInt(dureeDeVieMini,dureeDeVieMax),
            ));
        }
        this.radiusParticles = radiusParticles;
        this.opacityParticles = opacityParticles;
        this.ttlMin = dureeDeVieMini;
        this.ttlMax = dureeDeVieMax;
        this.hideSlowParticles = false;
        this.minMovementToDraw = minSpeedToDraw;
    }

    static cleanParticlesArray(){
        this.particles = [];
    }

    //pass()
    // Efface le canvas puis appelle tickttl() sur chaque particule dans passArray, si elle est toujours en vie on la dessine, sinon on la supprime de passArray et on la met à null.
    static pass() {
        for(let particle of this.particles){
            if (particle instanceof ParticleWindMap) {
                if (!particle.tickttl()){
                    particle.setPositionToSpawn();
                }
                particle.draw();
            } else {
                console.error('Incorrect particle type', particle);
                // Gérer ou ignorer les particules incorrectes
            }

        }
    }


    static updateParticleCount(nb_particules) {
        CanvasManager.resetBackground();
        if (nb_particules > ParticleSystem.particles.length) {
            for (let i = ParticleSystem.particles.length; i < nb_particules; i++) {
                this.particles.push(new ParticleWindMap(
                    `rgba(255,255,255,${this.opacityParticles})`,
                    this.radiusParticles,
                    getRandomFloat(0, CanvasManager.canvas.width),
                    getRandomFloat(0, CanvasManager.canvas.height),
                    getRandomInt(this.ttlMin, this.ttlMax)
                ));
            }
        }else if(nb_particules < this.particles.length){
            this.particles.length = nb_particules;
        }
    }

    static updateParticleTtlMax(dureeDeVieMaxi) {
        if(dureeDeVieMaxi >= this.ttlMin){
            CanvasManager.resetBackground();
            this.ttlMax = dureeDeVieMaxi;
            for(let particle of this.particles){
                particle.maxttl = getRandomInt(this.ttlMin, this.ttlMax);
            }
        }
    }

    static updateParticleTtlMini(dureeDeVieMini) {
        if(dureeDeVieMini <= this.ttlMax){
            CanvasManager.resetBackground();
            this.ttlMin = dureeDeVieMini;
            for(let particle of this.particles){
                particle.maxttl = getRandomInt(this.ttlMin, this.ttlMax);
            }
        }
    }

    static updateParticleOpacity(opacityParticles) {
        CanvasManager.resetBackground();
        this.opacityParticles = opacityParticles;
        for(let particle of this.particles){
            particle.color = `rgba(255,255,255,${this.opacityParticles})`;
        }
    }

    static updateParticleRadius(radiusParticles) {
        CanvasManager.resetBackground();
        this.radiusParticles = radiusParticles;
        for(let particle of this.particles){
            particle.radius = this.radiusParticles;
        }
    }

    static updateHideSlowParticles(cacherParticulesLentes) {
        this.hideSlowParticles = cacherParticulesLentes;
    }

    static updateMinMovementToDrawn(cacherParticulesLentes) {
        this.minMovementToDraw = cacherParticulesLentes;
    }

    static updateParticlePositions() {
        console.log(CanvasManager.offsetX);
        console.log(CanvasManager.offsetY);
        for (let particle of this.particles) {
            particle.posX = (particle.posX + CanvasManager.offsetX) / CanvasManager.zoomScale;
            particle.posY = (particle.posY + CanvasManager.offsetY) / CanvasManager.zoomScale;
            particle.spawnX = (particle.spawnX + CanvasManager.offsetX) / CanvasManager.zoomScale;
            particle.spawnY = (particle.spawnY + CanvasManager.offsetY) / CanvasManager.zoomScale;
        }
    }

}