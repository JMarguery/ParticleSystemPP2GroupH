// serait probablement préferable de faire une variable static a la class Particle mais pas trouvé et pas trop grave dans le cas d'application
let particleAll=[];

/*
___________________________________________________________

Class Particle :

Permet de créer une particule ronde.
___________________________________________________________

Champs :

startPos : Dictionnaire {x,y} position de départ
position : Dictionnaire {x,y} position actuelle
color : Couleur du cercle
Radius : Rayon du cercle
Velocity : Dictionnaire {x,y}, vélocité de la particule
maxSpeed : vitesse max d'une particule
maxttl : TTL maximum de la particule
ttl : nombre de cycle effectué
isMovable : si la particule peut se deplacer
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

Methodes :

distance(Particle : p) = distance jusqu'à la particule p.

instantiate() = Envoie la particule au passeur

tickTTL() = Augmente le champs ttl de 1 et renvoie vrai si ttl<maxttl OU this.oldPosition.length==0, faux sinon.

move() =
Si la particule ne peut plus se déplacer, a chaque update on suprimme le dernier element de oldPosition
sinon :
    Si la particule n'est plus dans le canvas (les coordonées sur x ou y son < 0 ou > width / height du canvas) : on lui dit de ne plus se déplacé

    sinon : on appelle goAlongVector pour déplacer la particule

limitSpeed(vector) = vérifie si pour x ou y d'un vecteur si la vitesse est > a maxSpeed ou < -maxSpeed

goAlongVector() = Recupère le vecteur direction de la grille de vecteurs en fonction de la position actuel de la particule
+ limite la vitesse si elle est supérieur à maxSpeed puis deplace la particule dans la direction du vecteur

createTrail() = parcours la liste des anciennes positions de la particules et y dessine un rond, le rond est de plus en plus petit en fonction de son indice dans le tableau (la plus ancienne sera la plus petite)

updateOldPositions() = avant chaque déplacement, on met la position de la particule dans le tableau et on supprime la dernier element si la taille est > à trailLength
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