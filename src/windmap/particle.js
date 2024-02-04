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
maxTTL : TTL maximum de la particule
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
    int : maxTTL,
    int : trailLength
)

___________________________________________________________

Methodes :

distance(Particle : p) = distance jusqu'à la particule p.

instantiate() = Créer la particule selon sa position de base

tickTTL() = Augmente le champs ttl de 1 et renvoie vrai si ttl<maxTTL, faux sinon.

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

Methodes static :

update() : On efface le canvas puis on execute move() sur toutes les particules en vie.

___________________________________________________________
*/

class Particle {

    startPos = {
        x:null,
        y:null,
    };

    position = {
        x:null,
        y:null,
    };

    velocity = {
        x:null,
        y:null,
    };

    color;

    radius;

    maxSpeed;

    ttl = 0;

    maxTTL;

    oldPositions;

    isMovable;

    trailLength

    constructor(startPosX,startPosY,color,radius,maxTTL, maxSpeed, trailLength){

        this.startPos = {
            x:startPosX,
            y:startPosY,
        }

        this.position = {
            x:startPosX,
            y:startPosY,
        };

        this.velocity = {
            x:0,
            y:0,
        };

        this.color = color;

        this.radius = radius;

        this.maxTTL = maxTTL;

        this.maxSpeed = maxSpeed;

        this.oldPositions = [];

        this.oldPositions.push({x:startPosX,y:startPosY});

        this.isMovable = true;

        this.trailLength = trailLength;

        particleAll.push(this);


    }

    instantiate(){
        CanvasManager.context.fillStyle = this.color;
        CanvasManager.context.beginPath();
        CanvasManager.context.arc(this.startPos.x,this.startPos.y,this.radius,0,Math.PI*2,true);
        CanvasManager.context.closePath();
        CanvasManager.context.fill();
    }

    drawParticle(){
        CanvasManager.context.fillStyle = this.color;
        CanvasManager.context.beginPath();
        CanvasManager.context.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,true);
        CanvasManager.context.closePath();
        CanvasManager.context.fill();
    }

    move(){
        if(!this.isMovable){
            if (this.oldPositions.length > 0){
                this.oldPositions.pop();
                this.createTrail();
            }else {
                particleAll.splice(particleAll.indexOf(this), 1);
            }
        }else {
            if((this.position.x > CanvasManager.canvas.width || this.position.x < 0 || this.position.y > CanvasManager.canvas.height || this.position.y < 0 ) || !this.tickTTL()){
                this.isMovable = false;
            }
            else {
                this.goAlongVector();

                this.drawParticle();

            }
        }
    }

    static update(){
        CanvasManager.context.fillStyle = CanvasManager.bgcolor;
        CanvasManager.context.fillRect(0,0,CanvasManager.canvas.width,CanvasManager.canvas.height);
        particleAll.forEach(p=>p.move());
    }

    tickTTL(){
        this.ttl+=1;
        return this.ttl<this.maxTTL;
    }

    limitSpeed(vector){
        if (vector.x > this.maxSpeed){
            vector.x = this.maxSpeed;
        }
        if (vector.y > this.maxSpeed){
            vector.y = this.maxSpeed;
        }
        if (vector.x < -this.maxSpeed){
            vector.x = -this.maxSpeed;
        }
        if (vector.y < -this.maxSpeed){
            vector.y = -this.maxSpeed;
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