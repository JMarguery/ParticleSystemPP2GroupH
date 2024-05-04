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
    
    //instantiateNewBranch([x,y]: directionArray)
    //Créer une nouvelle branch selon le directionArray donné.

    //split()
    // Si la hauteur n'est pas à la hauteur max, alors on essaie de créer maxbranches branches.
___________________________________________________________

*/
class ParticleTree extends Particle{

    hauteur;
    maxhauteur;
    direction = {
        x:null,
        y:null,
    }
    chance;
    spreadX = 1;
    constructor(color,radius,posX,posY,maxttl,maxhauteur,directionArray,maxbranches,hauteur,chance){
        super(color,radius,posX,posY,maxttl);
        if(hauteur == undefined){
            this.hauteur = 0;
        }else{
            this.hauteur = hauteur;
        }
        this.maxhauteur = maxhauteur;
        this.direction.x = directionArray[0];
        this.direction.y = directionArray[1];
        this.maxbranches = maxbranches;
        this.chance = chance;
    }

    move(){
        this.position.x+=this.direction.x;
        this.position.y+=this.direction.y;
    }

    instantiate(){
        PasseurTree.pushPassArray(this);
    }

    draw(){
        this.move();
        if(this.maxttl==this.ttl){
            this.split();
        }
        super.draw();
    }
    //instantiateNewBranch([x,y]: directionArray)
    //Créer une nouvelle branch selon le directionArray donné.
    instantiateNewBranch(directionArray){
        new ParticleTree(
            this.color,
            this.radius,
            this.position.x,
            this.position.y,
            this.maxttl,
            this.maxhauteur,
            directionArray,
            this.maxbranches,
            this.hauteur+1,
            this.chance
            ).instantiate();
    }

    //split()
    // Si la hauteur n'est pas à la hauteur max, alors on essaie de créer maxbranches branches.
    //Appelé par passeurTree
    split(){
        if (this.hauteur!=this.maxhauteur){
            for (let i=1;i<=Math.floor(this.maxbranches/2);i++){
                console.log("i = "+i);
                //left
                if(getRandomFloat(0,1)<=this.chance){
                    this.instantiateNewBranch(this.getNewDirectionForChild(i));
                }
                if(getRandomFloat(0,1)<=this.chance){
                    this.instantiateNewBranch(this.getNewDirectionForChild(-i));
                }
            }
            if (this.maxbranches%2!=0 && getRandomFloat(0,1)<=this.chance){
                this.instantiateNewBranch([0,-1]);
            }

        }

    }


    //getNewDirectionForChildren(int:i)
    // Selon i, on donne un nouveau vecteur [x,y] normalisé pour instantié une nouvelle branche.
    getNewDirectionForChild(i){
        let x=i;
        if (i%2==0){
            x = (i);
        }
        let y = -1;
        let t = this.maxbranches;
        let lengthdir = Math.sqrt(((x**2)+(y**2)));
        let normalx = Math.round((x/lengthdir)*100)/100;
        let normaly = Math.round((y/lengthdir)*100)/100;
        return [normalx*getRandomFloat(1,1.5),normaly];
    }



    tickttl(){
        if (this.maxttl===-1){
            return true
        }
        this.ttl+=1
        return ((this.ttl<=this.maxttl));
    }
    /*
        for (let i=0;i<Math.floor(this.maxbranches/2);i++){
            if(getRandomFloat(0,1)<=this.chance){
                //left
                let dirleft = [(i/Math.floor(this.maxbranches/2))-1,this.direction.y];

                let pleft = new ParticleTree(this.color,this.radius,this.position.x,this.position.y,this.maxttl,this.maxhauteur,dirleft,this.maxbranches,this.hauteur+1,this.chance);
                pleft.instantiate();
            }
            if(getRandomFloat(0,1)<=this.chance){
                //right    
                let dirright = [(i+1)/(Math.floor(this.maxbranches/2)),this.direction.y];
                let pright = new ParticleTree(this.color,this.radius,this.position.x,this.position.y,this.maxttl,this.maxhauteur,dirright,this.maxbranches,this.hauteur+1,this.chance);
                pright.instantiate();
            }
            
        }
        if ((this.maxbranches)%2!=0 && getRandomFloat(0,1)<=this.chance){
            let pmid = new ParticleTree(this.color,this.radius,this.position.x,this.position.y,this.maxttl,this.maxhauteur,[this.direction.x,this.direction.y],this.maxbranches,this.hauteur+1,this.chance);
            pmid.instantiate();
        }
    */


}