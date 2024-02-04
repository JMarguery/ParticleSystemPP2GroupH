/* 
___________________________________________________________

Class ParticleTTL extends Particle :

Permet de créer une particule ronde qui change de couleur selon son TTL.
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
ParticleTTL (
    float>0 : radius,
    float : startPosX,
    float : startPosY,
    Passeur : passeur,
    int : maxTTL 
)
___________________________________________________________
*/

class ParticleTTL extends Particle {
    constructor(radius,posX,posY,passeur,maxTTL){
        super(ParticleTTL.colorFromTTL(0),radius,posX,posY,passeur,maxTTL);
        this.getColorFromTTL();
    }


    //static colorFromTTL(int : ttl)
    // Renvoie une couleur selon l'int donné 
    static colorFromTTL(ttl){
        var r,g,b;
        r=10*ttl;
        g=255-6*ttl;
        b=0;
        return("rgb("+r+","+g+","+b+")");
    }
    //getColorFromTTL()
    // Renvoie une couleur selon le TTL de la particule
    getColorFromTTL(){
        var r,g,b;
        r=5*this.ttl;
        g=255-2*this.ttl;
        b=0;
        return("rgb("+r+","+g+","+b+")");
    }
    // Change la couleur de la particule selon son TTL puis appelle Particule.draw()
    // Utilisé par le passeur
    draw(){
        this.color = this.getColorFromTTL();
        super.draw();
    }
}