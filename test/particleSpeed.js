
/* 
___________________________________________________________

Class ParticleSpeed extends ParticulePhysic :

Permet de créer une particule ronde avec une vélocité et de la gravité qui change de couleur selon sa vitesse.
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

class ParticleSpeed extends ParticlePhysic{
    constructor(radius,posX,posY,passeur,velX,velY,maxTTL,gravity){
        super(ParticleSpeed.colorFromVel(velX,velY),radius,posX,posY,passeur,velX,velY,maxTTL,gravity);
        this.getColorFromVelocity();
    }


    // static colorFromVel(float : velX,float : velY)
    // Renvoie une couleur selon la vitesse
    static colorFromVel(velX,velY){
        var speed = Math.abs(velX)+Math.abs(velY);
        var r,g,b;
        r = 10*speed;
        g = 255-6*speed;
        b = 0;
        return("rgb("+r+","+g+","+b+")");
    }
    // getcolorFromVelocity()
    // Renvoie une couleur selon la vélocité de la particule.
    getColorFromVelocity(){
        var speed = Math.abs(this.velocity.x)+Math.abs(this.velocity.y);
        var r,g,b;
        r = 10*speed;
        g = 255-6*speed;
        b = 0;
        return("rgb("+r+","+g+","+b+")");
    }
    
    // draw()
    // Change la couleur selon la vélocité et appelle draw de ParticlePhysic
    draw(){
        this.color=this.getColorFromVelocity();
        super.draw();
    }
}