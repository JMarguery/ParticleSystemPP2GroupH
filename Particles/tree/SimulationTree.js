class SimulationTree extends SimulationBase {

    static maxbranches = 2;
    static hauteur = 3;
    static chance = 1;
    static directionArray = [0,-1];
    static timerMaj = 100;
    static treeMode = true;
    static nb_particules = 1;
    static radiusParticle = 5;
    static opacityParticle = 1;
    static ttlMin = 200;
    static ttlMax = 300;
    static speedFactor = 1;
    static spreadX;
    static spreadY;
    static pause;
    static pauseButton;
    //static percentLengthOfNewBranch;
    static create(){
        super.create("activity",ParticleTreeRandom,ParticleSystemTree,CanvasManagerTree);
        this.width = this.parent.clientWidth;
        this.height = this.parent.clientHeight;

        MenuTree.create(this.systemType,this.canvasManager,this);
        //this.particleType.updateBoundingBox(boundingBox);

        this.canvasManager.create(this.width, this.height, "white", this.parent);
        this.systemType.create(this.nb_particules,this);
        this.animate(performance.now());
        ParticleTreeRandom.setParticleSystem(this.systemType);
        ParticleTreeRandom.setBranchAttempTimer(this.timerMaj);
    }

    static animate(time){
        requestAnimationFrame(SimulationTree.animate);
        if(SimulationTree.pauseButton ||SimulationTree.pause){
            return;
        }
        SimulationTree.systemType.pass();
    }

    static restartSim(){
        //this.canvasManager.create(this.width, this.height, "white", this.parent);
        this.canvasManager.resetBackground();
        this.systemType.create(this.nb_particules,this);
    }

    static createNew(){
        console.log("createNew");
        let color;
        if(this.treeMode){
            color = 'rgba(165,42,42,1)'
        }else{
            color = getRandomRGBA();
        }
        return new ParticleTreeRandom(
            color,
            this.radiusParticle,
            1920 / 2,
            this.height,
            this.ttlMax,
            this.hauteur,
            this.directionArray,
            this.maxbranches,
            0,
            this.chance);
    }

    static updateParticleCount(nb_particules){
        super.updateParticleCount(nb_particules);
        this.restartSim();
    }

    static updateMaxBranch(maxBranch){
        this.maxbranches = maxBranch;
        this.restartSim();
    }

    static updateHauteur(hauteur){
        this.hauteur = hauteur;
        this.restartSim();
    }

    static updateChance(chance){
        this.chance = chance;
        this.restartSim();
    }

    static updateTreeMode(mode){
        this.treeMode = mode;
        ParticleTreeRandom.setTreeMode(mode);
        this.restartSim();
    }

    static updateTimerMaj(timer){
        this.timerMaj = timer;
        ParticleTreeRandom.setBranchAttempTimer(timer);
        this.restartSim();
    }
}