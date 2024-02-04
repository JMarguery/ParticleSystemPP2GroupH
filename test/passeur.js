/* 
___________________________________________________________


Class Passeur :

Contient une liste de toutes les particules a mettre à jour et les supprime/met à jour selon 

___________________________________________________________

Champs :

 passArray : Array de Particle pour la mise à jour du canvas
___________________________________________________________

Constructeur :

Passeur(
    Array<Particle> passArray=[]
    )
___________________________________________________________
*/

class Passeur{

    passArray;

    constructor(passArray=[]){
        this.passArray = passArray;
    }


    //pushPassArray(Particle : instance)
    // Ajoute la particule à passArray
    pushPassArray(instance){
        this.passArray.push(instance);
    }  
    //removePassArray(Particle : instance)
    // Retire la particule de passArray
    removePassArray(instance){
        this.passArray.splice(this.passArray.indexOf(instance),1);
    }

    //pass()
    // Efface le canvas puis appelle tickttl() sur chaque particule dans passArray, si elle est toujours en vie on la dessine, sinon on la supprime de passArray et on la met à null.
    pass(){
        context.fillStyle = bgcolor;
        context.fillRect(0,0,canvas.width,canvas.height);
        let to_be_removed = []; 
        for(let j of this.passArray){
            let instance = j;  
            if (instance.tickttl()){
                instance.draw();
        }else{
            to_be_removed.push(instance);
        }
        }
        if (to_be_removed.length!=0){
            for (let k of to_be_removed){
                this.removePassArray(k);
            }
            to_be_removed = [];
        }
    }
    
}