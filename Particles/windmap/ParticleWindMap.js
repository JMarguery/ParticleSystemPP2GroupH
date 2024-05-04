class ParticleWindMap extends Particle {
    spawnX;
    spawnY;
    drawParticle;

    constructor(color, radius, posX, posY, maxttl) {
        super(color, radius, posX, posY, (maxttl*2));
        this.spawnX = posX;
        this.spawnY = posY;
        this.drawParticle = true;
    }

    draw() {
        this.move();
        if (this.drawParticle){
            super.draw()
        }
        this.drawParticle = true;
    }

    move() {
        this.goAlongVector();
    }

    goAlongVector() {
        if (this.position.x >= CanvasManager.visibleBottomRightCorner.x) {
            this.position.x = this.spawnX;
        } else if (this.position.x < CanvasManager.visibleTopLeftCorner.x) {
            this.position.x = this.spawnX;
        }

        if (this.position.y >= CanvasManager.visibleBottomRightCorner.y) {
            this.position.y = this.spawnY;
        } else if (this.position.y < CanvasManager.visibleTopLeftCorner.y) {
            this.position.y = this.spawnY;
        }

        let direction = VectorGrid.getVecteurWithInterpolation(this.position.x, this.position.y);
        this.limitSpeed(direction);

        if(Simulation.hideSlowParticles){
            if (Math.abs(direction.x*Simulation.speedFactor) < Simulation.minMovementToDraw && Math.abs(direction.y*Simulation.speedFactor) < Simulation.minMovementToDraw) {
                this.drawParticle = false;
            }
        }
        this.position.x += direction.x;
        this.position.y += direction.y;
    }

    limitSpeed(vector) {
        vector.x = (vector.x / VectorGrid.maxWindSpeed*Simulation.speedFactor);
        vector.y = (vector.y / VectorGrid.maxWindSpeed*Simulation.speedFactor);
    }

    setPositionToSpawn(){
        this.ttl = 0;
        this.isMovable = true;
        this.position.x = this.spawnX;
        this.position.y = this.spawnY;
    }
}
