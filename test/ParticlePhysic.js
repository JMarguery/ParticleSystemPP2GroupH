
/* 
___________________________________________________________

Class ParticlePhysic extends Particule :

Permet de créer une particule ronde avec une vélocité et de la gravité.
___________________________________________________________

Champs :

position : Dictionnaire {x,y} position
color : Couleur du cercle
radius : Rayon du cercle
passeur : Passeur pour le render
Velocity : Dictionnaire {x,y}, vélocité de la particule
maxTTL : TTL maximum de la particule
ttl : nombre de cycle effectué
gravity : Gravité a appliqué a la particule, on ajoute la valeur a velocity.y à chaque cycle

___________________________________________________________


___________________________________________________________

Constructeur :
Particle (
    color : color,
    float>0 : radius,
    float : posX,
    float : posY,
    Passeur : passeur
    float : velX,
    float : velY,
    int : maxTTL,
    float : gravity, 
)

___________________________________________________________
*/

class ParticlePhysic extends Particle{

    velocity = {
        x:null,
        y:null,
    };
    gravity = 0.5;

    constructor(color,radius,posX,posY,passeur,velX,velY,maxttl,gravity){

        super(color,radius,posX,posY,passeur,maxttl);

        this.velocity = {
            x:velX,
            y:velY,
        };
        this.gravity = gravity;
    }

// draw()
// On met a jour la vélocité.y selon la gravité, on met a jour la position puis on dessine la particule
// Appelé par le passeur
    draw(){
        this.velocity.y+=this.gravity;
        this.position={
            x:this.position.x+this.velocity.x,
            y:this.position.y+this.velocity.y
        };
        super.draw();
    }

}