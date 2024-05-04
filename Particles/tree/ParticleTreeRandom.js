/*

___________________________________________________________

Class ParticleTree :

Permet de créer une un arbre de particule.
___________________________________________________________

Champs :

color : Couleur du cercle
Radius : Rayon du cercle
position : Dictionnaire {x,y} position de départ
maxTTL : TTL maximum de la particule
hauteur : hauteur dans l'arbre
maxhauteur : hauteur maximum de l'arbre
directionArray : Array d'un vecteur [x,y] normalisé
chance : Chance qu'une ou plusieurs branches se forme a chaque seconde
maxbranches : maximum de branche qu'une branche peut créer par seconde
spreadX : offset possible lors du déplacement

ttl : nombre de cycle effectué
___________________________________________________________

Constructeur :
Particle (
    color : color,
    float>0 : radius,
    float : startPosX,
    float : startPosY,
    int : maxTTL,
    int: maxhauteur,
    array: directionArray,
    int: maxbranches,
    int: hauteur,
    float<=1 : chance
)
___________________________________________________________
FONCTIONS : 

    //getNewDirectionForChildren(int:i)
    // Selon i, on donne un nouveau vecteur [x,y] normalisé pour instantié une nouvelle branche.
    
    //instantiateNewBranch([x,y] : dir)
    //Créer une nouvelle branch selon le directionArray donné avec un maxTTL entre 0.8 et 1 fois le maxTTL de cette particule.

    //split()
    // Si la hauteur n'est pas à la hauteur max, alors on essaie de créer maxbranches branches.
___________________________________________________________

*/

class ParticleTreeRandom extends ParticleTree{

    spreadX = 2;
    cptNextBranchAttemp = 0;
    timerMaj = PasseurTree.updateInterval;
    constructor(
        color,
        radius,
        posX,
        posY,
        maxttl,
        maxhauteur,
        directionArray,
        maxbranches,
        hauteur,
        chance){

        super(color,radius,posX,posY,maxttl,maxhauteur,directionArray,maxbranches,hauteur,chance)
    }


move(){
    this.position.x+=this.direction.x+getRandomFloat(-this.spreadX/2,this.spreadX/2);
    this.position.y+=this.direction.y;
}

draw(){
    this.move();
    this.cptNextBranchAttemp++;
    if(this.cptNextBranchAttemp>=this.timerMaj){
        this.cptNextBranchAttemp=0;

        for(let j=0;j<this.maxbranches;j++){
            if(getRandomFloat(0,1)<=this.chance){
                this.instantiateNewBranch([getRandomFloat(-1,1),getRandomFloat(0,-1)]);
            }
        }

    }
        CanvasManager.context.fillStyle = this.color;
        CanvasManager.context.beginPath();
        CanvasManager.context.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,true);
        CanvasManager.context.closePath();
        CanvasManager.context.fill();
}

instantiateNewBranch(dir){
    new ParticleTreeRandom(
        getRandomRGBA(),
        this.radius,
        this.position.x,
        this.position.y,
        getRandomInt(this.maxttl*0.8,this.maxttl),
        this.maxhauteur,
        dir,
        this.maxbranches,
        this.hauteur+1,
        this.chance
        ).instantiate();
}

}