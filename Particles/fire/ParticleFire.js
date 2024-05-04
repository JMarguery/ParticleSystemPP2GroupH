/*
___________________________________________________________

Class ParticleFire :

Permet de créer une particule ronde.
___________________________________________________________

Champs :

color : Couleur du cercle
Radius : Rayon du cercle
position : Dictionnaire {x,y} position de départ
maxTTL : TTL maximum de la particule
ttl : nombre de cycle effectué

oldPosition : Tableau des anciennes positions de la particule
maxSpeed : vitesse max d'une particule
isMovable : si la particule peut se déplacer
trailLength : taille de la trainée derrière la particule
spreadX, spreadY : définissent la largeur et hauteur du feu
startPosX, startPosY : Dictionnaire {x,y} de la position de départ


___________________________________________________________

Static fields :

___________________________________________________________

Constructeur :

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

goUpwards() = on définit un vecteur direction avec :
- x entre "-this.spreadX/2" et "this.spreadX/2"
- y entre "0" et "-this.spreadY"

ensuite appel à updateOldPositions(),
appel à limitSpeed(vector),
déplace la particule sur x et y avec le vecteur direction,
appel à createTrail();

createTrail() = parcours la liste des anciennes positions de la particule pour dessiner la traînée.
Plus l'indice est grand plus le rond est gros, de plus la couleur de base RGB étant 255,255,0 (jaune)
on enlève à G la différence entre la position de départ et la position actuel du rond à dessiner
=> plus la particule est éloignée de la position de départ, plus on se rapproche du rouge.

updateOldPositions() = avant chaque déplacement, on met la position de la particule dans le tableau et
on supprime le dernier element si la taille du tableau est > à trailLength


    createTrail(){
        for (let i = 0; i < this.oldPositions.length; i++) {
            let size = (i + 1) / this.oldPositions.length; // change petit a petit la taille
            let rgbaMatch = this.color.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);

            let redValue = parseInt(rgbaMatch[1]);
            let greenValue = parseInt(rgbaMatch[2])+255-Math.abs(this.oldPositions[i].y - this.startPosY);
            let blueValue = parseInt(rgbaMatch[3]);
            let alphaValue = parseFloat(rgbaMatch[4]);

            // Calculate the new alpha value, making sure it stays within [0, 1]
            alphaValue = (i + 1) / this.oldPositions.length;

            CanvasManager.context.fillStyle = `rgba(${redValue},${greenValue},${blueValue},${alphaValue})`;
            CanvasManager.context.beginPath();
            CanvasManager.context.arc(this.oldPositions[i].x, this.oldPositions[i].y, this.radius * size, 0, Math.PI * 2, true);
            CanvasManager.context.closePath();
            CanvasManager.context.fill();
        }
    }
___________________________________________________________

*/

class ParticleFire extends Particle {

    maxSpeed;

    oldPositions;

    isMovable;

    trailLength;

    spreadX;

    spreadY;

    startPosX;

    startPosY;

    constructor(color,radius,posX,posY,maxttl,maxSpeed, trailLength, spreadX, spreadY){

        super(color,radius,posX,posY,(maxttl+trailLength));

        this.maxSpeed = maxSpeed;

        this.oldPositions = [];

        this.oldPositions.push({x:posX,y:posY});

        this.isMovable = true;

        this.trailLength = trailLength;

        this.spreadX = spreadX;

        this.spreadY = spreadY;

        this.startPosX = posX;

        this.startPosY = posY;

    }


    draw(){
        this.move();
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
                this.goUpwards();
            }
        }
    }


    tickTTL(){
        this.ttl+=1;
        return ((((this.ttl<this.maxttl) || this.oldPositions.length===0)));
    }

    limitSpeed(vector){
        const speed = Math.sqrt(vector.x ** 2 + vector.y ** 2);
        if (speed > this.maxSpeed) {
            vector.x = (vector.x / speed) * this.maxSpeed;
            vector.y = (vector.y / speed) * this.maxSpeed;
        }
    }

    goUpwards() {
        let direction = {
            x:getRandomFloat(-this.spreadX/2,this.spreadX/2),
            y:getRandomFloat(0,-this.spreadY),
        };

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
            let size = (i + 1) / (this.trailLength/2); // change petit a petit la taille
            let rgbaMatch = this.color.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);

            let redValue = parseInt(rgbaMatch[1]);
            let greenValue = parseInt(rgbaMatch[2])-Math.abs(this.oldPositions[i].y - this.startPosY);
            let blueValue = parseInt(rgbaMatch[3]);
            let alphaValue = parseFloat(rgbaMatch[4]);

            // Calculate the new alpha value, making sure it stays within [0, 1]
            alphaValue = (i + 1) / this.oldPositions.length;

            CanvasManager.context.fillStyle = `rgba(${redValue},${greenValue},${blueValue},${alphaValue})`;
            CanvasManager.context.beginPath();
            CanvasManager.context.arc(this.oldPositions[i].x, this.oldPositions[i].y, this.radius * size, 0, Math.PI * 2, true);
            CanvasManager.context.closePath();
            CanvasManager.context.fill();
        }
    }

}