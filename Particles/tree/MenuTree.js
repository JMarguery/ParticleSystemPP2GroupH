class MenuTree extends Menu {

    static menu;
    static content;

    static system;
    static canvasManager;
    static simulation;

    static create (system,canvasManager,simulation){
        super.create(system,canvasManager,simulation);

        document.getElementById('maxBranch').addEventListener('change', function() {
            const maxBranch = parseInt(this.value, 10);
            simulation.updateMaxBranch(maxBranch);
        });

        document.getElementById('hauteur').addEventListener('change', function() {
            const hauteur = parseInt(this.value, 10);
            simulation.updateHauteur(hauteur);
        });

        document.getElementById('chance').addEventListener('change', function() {
            const chance = parseFloat(this.value, 10);
            simulation.updateChance(chance);
        });

        document.getElementById('treeMode').addEventListener('change', function() {
            const treeMode = this.checked;
            simulation.updateTreeMode(treeMode);
        });

        document.getElementById('timerMaj').addEventListener('change', function() {
            const treeMode = this.checked;
            simulation.updateTimerMaj(treeMode);
        });
    }

}