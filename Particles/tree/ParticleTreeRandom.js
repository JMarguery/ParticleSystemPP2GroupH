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
    static particleSystem;
    spreadX = 2;
    cptNextBranchAttemp = 0;
    static timerMaj;
    static treeMode = true;
    static canvasManager;

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

static setParticleSystem(type){
        this.particleSystem = type;
}

static setTreeMode(mode){
        this.treeMode = mode;
}

static setBranchAttempTimer(timer){
        this.timerMaj = timer;
}

move(){
    this.position.x+=this.direction.x+getRandomFloat(-this.spreadX/2,this.spreadX/2);
    this.position.y+=this.direction.y;
}

draw(){
    this.move();

        CanvasManagerTree.context.fillStyle = this.color;
        CanvasManagerTree.context.beginPath();
        CanvasManagerTree.context.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,true);
        CanvasManagerTree.context.closePath();
        CanvasManagerTree.context.fill();

    this.cptNextBranchAttemp++;
    if (this.hauteur==this.maxhauteur){
        return;
    }
    if(this.cptNextBranchAttemp>=ParticleTreeRandom.timerMaj){
        this.cptNextBranchAttemp=0;

        for(let j=0;j<this.maxbranches;j++){
            if(getRandomFloat(0,1)<=this.chance){
                this.instantiateNewBranch([getRandomFloat(-1,1),getRandomFloat(0,-1)]);
            }
        }
    }
}

instantiateNewBranch(dir){
        let color;
        if (ParticleTreeRandom.treeMode){
            if (this.hauteur==this.maxhauteur-1){
                let green = getRandomInt(100,255);
                color = 'rgba(0,'+green+',0,1)'
            }else{
                color = 'rgba(165,42,42,1)'
            }
        }else{
            color = getRandomRGBA()
        }
        let newBranch = new ParticleTreeRandom(
        color,
        this.radius,
        this.position.x,
        this.position.y,
        getRandomInt(this.maxttl*0.8,this.maxttl),
        this.maxhauteur,
        dir,
        this.maxbranches,
        this.hauteur+1,
        this.chance
        );
    ParticleTreeRandom.particleSystem.addNewBranch(newBranch);

}

}