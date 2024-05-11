class ParticleSystemFirework extends ParticleSystemBase {


    static pass() {
        this.canvasManager.context.fillStyle = 'rgba(255, 255, 255,'+ this.simulation.attenuationSpeed+')';
        this.canvasManager.context.fillRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);
        for(let i =0;i<this.particles.length;i++){
            if(!this.particles[i].tickttl()){
                if (this.particles[i] instanceof ParticleFirework || this.particles[i] instanceof  ParticleFireworkOldTrail){
                    this.particles[i]=this.simulation.createNew();
                }else {
                    this.particles.splice(i, 1);
                }
                i--;
            }else{
                this.particles[i].draw();
            }
        }

    }

    static addNewFirework(firework){
        this.particles.push(firework);
    }

}