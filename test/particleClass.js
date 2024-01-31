// serait probablement préferable de faire une variable static a la class Particle mais pas trouvé et pas trop grave dans le cas d'application
var particleAll=[];

/* 
___________________________________________________________

Class Particle :

Permet de créer une particule ronde.
___________________________________________________________

Champs :

startPos : Dictionnaire {x,y} position de départ
color : Couleur du cercle
Radius : Rayon du cercle
Velocity : Dictionnaire {x,y}, vélocité de la particule
maxTTL : TTL maximum de la particule
ttl : nombre de cycle effectué
___________________________________________________________

Static fields : 

gravity : Gravité a appliqué a toutes les particules, on ajoute la valeur a velocity.y à chaque cycle
particleAll : Liste de toutes les particules, utilisé pour la mise à jour des particules à chaque cycle

___________________________________________________________

Constructeur :
Particle (
    float : startPosX,
    float : startPosY,
    color : color,
    float>0 : radius,
    float : velX,
    float : velY,
    int : maxTTL 
)

___________________________________________________________

Methodes :

distance(Particle : p) = distance jusqu'à la particule p.

instantiate() = Créer la particule selon sa position de base

tickTTL() = Augmente le champs ttl de 1 et renvoie vrai si ttl<maxTTL, faux sinon.

move() = Si tickTTL() est vrai, on met a jour la vélocité et on déplace la particule, sinon on la supprime de particleAll[]

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

    color;

    radius;

    position = {
        x:null,
        y:null,
    };

    velocity = {
        x:null,
        y:null,
    };

    static gravity = 0.5;

    maxTTL;

    ttl = 0;

    constructor(startPosX,startPosY,color,radius,velX,velY,maxTTL){

        this.startPos = {
            x:startPosX,
            y:startPosY,
        }

        this.color = color;

        this.radius = radius;

        this.position = {
            x:startPosX,
            y:startPosY,
        };
        
        this.velocity = {
            x:velX,
            y:velY,
        };

        this.maxTTL = maxTTL;

        particleAll.push(this);
    }


    distance(p){
        return [this.position.x-p.position.x,this.position.y-p.position.y]
    }

    instantiate(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.startPos.x,this.startPos.y,this.radius,0,Math.PI*2,true);
        context.closePath();
        context.fill();
    }

    move(){
        if (this.tickTTL()){
        this.velocity.y+=Particle.gravity;
        this.position={
            x:this.position.x+this.velocity.x,
            y:this.position.y+this.velocity.y
        }
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,true);
        context.closePath();
        context.fill();
    }else{
        particleAll.splice(particleAll.indexOf(this),particleAll.indexOf(this));
        delete this;
    }
    }

    static update(){
        context.fillStyle = bgcolor;
        context.fillRect(0,0,canvas.width,canvas.height);
        particleAll.forEach(p=>p.move());
        
    }

    tickTTL(){
        this.ttl+=1;
        return this.ttl<this.maxTTL;
    }
}