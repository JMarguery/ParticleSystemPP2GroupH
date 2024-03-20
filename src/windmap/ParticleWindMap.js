// serait probablement préferable de faire une variable static a la class Particle mais pas trouvé et pas trop grave dans le cas d'application
let particleAll=[];

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

    maxSpeed;

    oldPositions;

    isMovable;

    trailLength

    constructor(color,radius,posX,posY,maxttl,maxSpeed, trailLength){

        super(color,radius,posX,posY,(maxttl+trailLength));
        
        this.maxSpeed = maxSpeed;

        this.oldPositions = [];

        this.oldPositions.push({x:posX,y:posY});

        this.isMovable = true;

        this.trailLength = trailLength;

    }

    
    draw(){
        this.move();
        super.draw();
    }

    move(){
        if(!this.isMovable){
            if (this.oldPositions.length > 0){
                this.oldPositions.pop();
                this.createTrail();
            }
        }else {
            if((this.position.x > CanvasManager.canvas.width || this.position.x < 0 || this.position.y > CanvasManager.canvas.height || this.position.y < 0 ) || this.ttl>=this.maxttl-this.trailLength){
                this.isMovable = false;
                this.createTrail();
            }
            else {
                this.goAlongVector();
            }
        }
    }


    tickTTL(){
        this.ttl+=1;
        return ((((this.ttl<this.maxttl) || this.oldPositions.length==0)));
    }

    limitSpeed(vector){
        const speed = Math.sqrt(vector.x ** 2 + vector.y ** 2);
        if (speed > this.maxSpeed) {
            vector.x = (vector.x / speed) * this.maxSpeed;
            vector.y = (vector.y / speed) * this.maxSpeed;
        }
    }

    goAlongVector() {
        let direction = VectorGrid.getVecteur(this.position.x, this.position.y);

        this.updateOldPositions();

        this.limitSpeed(direction);

        this.position.x += direction.x;
        this.position.y += direction.y;

        this.createTrail();
    }


    updateOldPositions(){
        if (this.oldPositions.length < this.trailLength){
            let x = this.position.x;
            let y = this.position.y;
            this.oldPositions.unshift({x, y});
        }else{
            let x = this.position.x;
            let y = this.position.y;
            this.oldPositions.unshift({x, y});
            this.oldPositions.pop(); // Supprime le dernier élément du tableau pour maintenir la longueur
        }
    }

    createTrail(){
        for (let i = 0; i < this.oldPositions.length; i++) {
            const size = 1 - (i + 1) / this.oldPositions.length; // change petit a petit la taille
            CanvasManager.context.fillStyle = this.color;
            CanvasManager.context.beginPath();
            CanvasManager.context.arc(this.oldPositions[i].x, this.oldPositions[i].y, this.radius * size, 0, Math.PI * 2, true);
            CanvasManager.context.closePath();
            CanvasManager.context.fill();
        }
    }



}