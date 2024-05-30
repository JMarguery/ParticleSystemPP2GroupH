
/*
___________________________________________________________

Class ParticlePhysicBounded extends Particule :

Permet de créer une particule ronde avec une vélocité et de la gravité qui rebondit sur les murs, le plafond et le sol.
___________________________________________________________

Champs :

position : Dictionnaire {x,y} position
color : Couleur du cercle
radius : Rayon du cercle
Velocity : Dictionnaire {x,y}, vélocité de la particule
maxTTL : TTL maximum de la particule
ttl : nombre de cycle effectué
gravity : Gravité a appliqué a la particule, on ajoute la valeur a velocity.y à chaque cycle
bounce_coeff : Coefficient a appliqué quand la particule doit rebondir.

___________________________________________________________

CHAMPS STATIC :
boundingBox : Dictionnaire contenant les limites du canvas.

___________________________________________________________

FONCTIONS :

// draw()
// On vérifie si la particule dépasse du canvas.
// Si elle dépasse, on la remet dans le canvas et on multiplie sa vélocité dans l'axe où elle a dépassé par -coeff_bounce
// Puis, on met a jour la vélocité.y selon la gravité, on met a jour la position puis on dessine la particule

___________________________________________________________

Constructeur :
ParticlePhysicBounded (
    color : color,
    float>0 : radius,
    float : posX,
    float : posY,
    float : velX,
    float : velY,
    int : maxTTL,
    float : gravity,
    float<1 : bounce_coeff
)

___________________________________________________________
*/
class ParticlePhysicBounded extends ParticlePhysic{

    static boundingBox = {
        "left":0,
        "right":500,
        "down":500,
        "up":0,
    }

    constructor(
        color,
        radius,
        posX,
        posY,
        velX,
        velY,
        maxTTL,
        gravity,
        bounce_coeff){
        super(color,radius,posX,posY,velX,velY,maxTTL,gravity);
        this.bounce_coeff = bounce_coeff;
    }


// draw()
// On vérifie si la particule dépasse du canvas.
// Si elle dépasse, on la remet dans le canvas et on multiplie sa vélocité dans l'axe où elle a dépassé par -coeff_bounce
// Puis, on met a jour la vélocité.y selon la gravité, on met a jour la position puis on dessine la particule

    draw(){
        if (this.position.x-this.radius<ParticlePhysicBounded.boundingBox.left){
            this.position.x=ParticlePhysicBounded.boundingBox.left+this.radius;
            this.velocity.x*=-this.bounce_coeff;
        }else if(this.position.x+this.radius>ParticlePhysicBounded.boundingBox.right){
            this.position.x=ParticlePhysicBounded.boundingBox.right-this.radius;
            this.velocity.x*=-this.bounce_coeff;
        }
        if (this.position.y+this.radius>ParticlePhysicBounded.boundingBox.down){
            this.position.y=ParticlePhysicBounded.boundingBox.down-this.radius;
            //this.velocity.x*=-this.bounce_coeff;
            this.velocity.y*=-this.bounce_coeff;
        }else if(this.position.y-this.radius<ParticlePhysicBounded.boundingBox.up){
            this.position.y=ParticlePhysicBounded.boundingBox.up+this.radius;
            this.velocity.y*=-this.bounce_coeff;
        }
        super.draw();
    }

    static updateBoundingBox(box){
        ParticlePhysicBounded.boundingBox = box;
    }

    recycleParticle(color,
                    radius,
                    posX,
                    posY,
                    velX,
                    velY,
                    maxTTL,
                    gravity,
                    bounce_coeff){
        this.color = color;
        this.radius = radius;
        this.position.x =posX;
        this.position.y = posY;
        this.velocity.x = velX;
        this.velocity.y = velY;
        this.maxTTL = maxTTL;
        this.gravity = gravity;
        this.bounce_coeff = bounce_coeff;
        this.ttl = 0;
    };

    static createNew(){

    }

}