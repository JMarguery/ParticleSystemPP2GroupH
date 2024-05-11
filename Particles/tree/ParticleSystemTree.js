class ParticleSystemTree extends ParticleSystemBase{


    static pass() {
        /*
        this.particles = this.particles.filter(function(particle) {
            return particle.tickttl();
        });
        this.particles.foreach(function(particle) {
            particle.draw();
        })
        }
        */
        for(let i =0;i<this.particles.length;i++){
        if(!this.particles[i].tickttl()){
            this.particles.splice(i,1);
            i--;
        }else{
            this.particles[i].draw();
        }
        }
    }

    static addNewBranch(branch){
        this.particles.push(branch);
    }
}