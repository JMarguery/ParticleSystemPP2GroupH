
class PasseurTree extends Passeur{

    static pass(){
        let to_be_removed = [];
        for(let j of this.priorityArray){
            j.draw();
        }
        for(let j of this.passArray){
            let instance = j;
            if (instance.tickttl()){
                instance.draw();
            }else{
                to_be_removed.push(instance);
            }
        }
        if (to_be_removed.length!==0){
            for (let k of to_be_removed){
                this.removePassArray(k);
            }
            to_be_removed = [];
        }
    }

}