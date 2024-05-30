class MenuFire extends Menu {


    static create (system,canvasManager,simulation){
        super.create(system,canvasManager,simulation);

        document.getElementById('spreadX').addEventListener('change', function() {
            const spreadX = parseFloat(this.value);
            simulation.updateSpreadX(spreadX);
        });

        document.getElementById('spreadY').addEventListener('change', function() {
            const spreadY = parseFloat(this.value);
            simulation.updateSpreadY(spreadY);
        });
    }

}