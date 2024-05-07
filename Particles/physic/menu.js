class MenuPhysic extends Menu {


    static create (system,canvasManager,simulation){
        super.create(system,canvasManager,simulation);

        document.getElementById('gravityParticle').addEventListener('change', function() {
            const gravityParticle = parseFloat(this.value);
            console.log(gravityParticle);
            simulation.updateGravity(gravityParticle);
        });

        document.getElementById('bounceCoeff').addEventListener('change', function() {
            const bounceCoeff = parseFloat(this.value);
            simulation.updateBounce(bounceCoeff);
        });

    }
}