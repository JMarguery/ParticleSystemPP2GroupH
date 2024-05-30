class MenuFirework extends Menu {

    static menu;
    static content;
    static system;
    static canvasManager;
    static simulation;

    static create(system,canvasManager,simulation){
        super.create(system,canvasManager,simulation);

        document.getElementById('minSpeedY').addEventListener('change',function(){
            const minSpeedY = parseFloat(this.value);
            simulation.updateMinSpeedY(minSpeedY);
        });

        document.getElementById('maxSpeedY').addEventListener('change',function(){
            const maxSpeedY = parseFloat(this.value);
            simulation.updateMaxSpeedY(maxSpeedY);
        });

        document.getElementById('splitAmmount').addEventListener('change',function(){
            const splitAmount = parseInt(this.value);
            simulation.updateSplitAmount(splitAmount);
        });

        document.getElementById('traceMode').addEventListener('change',function(){
            const traceMode = this.checked;
            simulation.updateOldTraceMode(traceMode);
        });
    }
    }



