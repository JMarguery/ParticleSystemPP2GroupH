
var context;
var canvas;
var bgcolor;
// createEmptyCanvas(int: width,int :height, Color: color)
// Créer un canvas vide de largeur width, hauteur height, de couleur color et l'ajoute au body du document
function createEmptyCanvas(width=800,height=500,color="black"){
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    bgcolor = color;
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    context.fillStyle = bgcolor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

/* 
___________________________________________________________

Class Particle :

Permet de créer une particule ronde.
___________________________________________________________

Champs :

color : Couleur du cercle
Radius : Rayon du cercle
position : Dictionnaire {x,y} position de départ
passeur : Passeur pour le render
maxTTL : TTL maximum de la particule
ttl : nombre de cycle effectué
___________________________________________________________

Constructeur :
Particle (
    color : color,
    float>0 : radius,
    float : startPosX,
    float : startPosY,
    Passeur : passeur,
    int : maxTTL 
)
___________________________________________________________
*/

class Particle{

    color;
    radius;
    position = {
        x:0,
        y:0,
    };
    passeur;
    ttl;
    maxttl;

    constructor(color,radius,posX,posY,passeur,maxttl){
        this.radius = radius;
        this.color = color;
        this.position = {
            x:posX,
            y:posY
        };
        this.passeur = passeur;
        this.ttl=0;
        this.maxttl = maxttl;
    }


    //instantiate()
    // Envoie la particule au passeur

    instantiate(){
        this.passeur.pushPassArray(this);
    }

    // distance(Particle : p) 
    // distance jusqu'à la particule p.

    distance(p){
        return [this.position.x-p.position.x,this.position.y-p.position.y]
    }


    // draw() 
    // Dessine la particule.
    // Appelé par le passeur
    draw(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,true);
        context.closePath();
        context.fill();
    }

    // tickTTL() 
    // Augmente le champs ttl de 1 et renvoie vrai si ttl<maxTTL, faux sinon.
    // Si maxttl == -1, on retourne vrai sans incrémenter.

    tickttl(){
        if (this.maxttl==-1){
            return true
        }
        this.ttl+=1
        return ((this.ttl<this.maxttl));
    }

}