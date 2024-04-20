// serait probablement préferable de faire une variable static a la class Particle mais pas trouvé et pas trop grave dans le cas d'application
/*
___________________________________________________________

Class Particle :

Permet de créer une particule ronde.
___________________________________________________________

Champs :

color : Couleur du cercle
Radius : Rayon du cercle
position : Dictionnaire {x,y} de la position
maxTTL : TTL maximum de la particule
ttl : nombre de cycle effectué

oldPosition : Tableau des anciennes positions de la particule
maxSpeed : vitesse max d'une particule
isMovable : si la particule peut se déplacer
trailLength : taille de la trainée derrière la particule
___________________________________________________________

Static fields :

___________________________________________________________

Constructeur :
Particle (
    float : startPosX,
    float : startPosY,
    color : color,
    float>0 : radius,
    float : velX,
    float : velY,
    float : maxSpeed,
    int : maxttl,
    int : trailLength
)

___________________________________________________________

Méthodes :

move() = gère la logique pour le mouvement d'une particule :
Si la particule ne peut plus se déplacer, a chaque update on supprime le dernier element de "oldPosition"
sinon :
    Si la particule n'est plus dans le canvas (les coordonnées en dehors du canvas) :
         on lui dit de ne plus se déplacer et on continue d'afficher la traînée
    sinon :
        on appelle goAlongVector pour déplacer la particule

limitSpeed(vector) = si le vecteur direction est plus long que la vitesse max, on limite la vitesse

goAlongVector() = Récupère le vecteur direction dans la grille de vecteurs en fonction de la position x y actuel de la particule
On limite la "vitesse" si besoin, appel updateOldPositions, ensuite on déplace la particule enfin createTrail()

createTrail() = parcours la liste des anciennes positions de la particule et y dessine un rond.
Le rond est de plus en plus petit en fonction de son indice dans le tableau (la plus ancienne sera la plus petite).

updateOldPositions() = avant chaque déplacement, on met la position de la particule dans le tableau et
on supprime le dernier element si la taille du tableau est > à trailLength
___________________________________________________________

*/

class ParticleWindMap extends Particle {
    spawnX;
    spawnY;
    drawParticle;

    constructor(color, radius, posX, posY, maxttl) {
        super(color, radius, posX, posY, (maxttl*2));
        this.spawnX = posX;
        this.spawnY = posY;
        this.drawParticle = true;
    }

    draw() {
        this.move();
        if (this.drawParticle){
            super.draw();
        }
        this.drawParticle = true;
    }

    move() {
        this.goAlongVector();
    }

    goAlongVector() {
        //modifier pour prendre les coord visuelles ?
        if (this.position.x >= CanvasManager.canvas.width) {
            this.position.x = this.spawnX;
        } else if (this.position.x < 0) {
            this.position.x = this.spawnX;
        }

        if (this.position.y >= CanvasManager.canvas.height) {
            this.position.y = this.spawnY;
        } else if (this.position.y < 0) {
            this.position.y = this.spawnY;
        }

        let direction = VectorGrid.getVecteurWithInterpolation(this.position.x, this.position.y);
        this.limitSpeed(direction);

        if(ParticleSystem.hideSlowParticles){
            if (Math.abs(direction.x*Simulation.speedFactor) < ParticleSystem.minMovementToDraw && Math.abs(direction.y*Simulation.speedFactor) < ParticleSystem.minMovementToDraw) {
                this.drawParticle = false;
            }
        }
        this.position.x += direction.x;
        this.position.y += direction.y;
    }

    limitSpeed(vector) {
        vector.x = (vector.x / VectorGrid.maxWindSpeed*Simulation.speedFactor);
        vector.y = (vector.y / VectorGrid.maxWindSpeed*Simulation.speedFactor);
    }

    setPositionToSpawn(){
        this.ttl = 0;
        this.isMovable = true;
        this.position.x = this.spawnX;
        this.position.y = this.spawnY;
    }
}
