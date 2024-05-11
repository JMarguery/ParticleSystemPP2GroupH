class ParticleSystemFireworkTrail extends ParticleSystemFirework {

    static pass() {
        this.canvasManager.context.fillStyle = 'rgba(255, 255, 255,0)';
        this.canvasManager.context.fillRect(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);
        for(let i =0;i<this.particles.length;i++){
            if(!this.particles[i].tickttl()){
                this.particles.splice(i,1);
                i--;
            }else{
                this.particles[i].draw();
            }
        }
    }



}