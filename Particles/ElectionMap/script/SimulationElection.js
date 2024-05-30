const courantPol95 = {"JOSPIN":"GAUCHE",
    "CHIRAC":"DROITE"}

const courantPol02 = {"LAGUILLER":"EXTREME GAUCHE",
    "BESANCENOT":"EXTREME GAUCHE",
    "GLUCKSTEIN":"EXTREME GAUCHE",
    "HUE":"GAUCHE RADICALE",
    "JOSPIN":"GAUCHE",
    "CHEVENEMENT":"GAUCHE",
    "TAUBIRA":"GAUCHE",
    "MAMERE":"ECOLOGISME",
    "LEPAGE":"ECOLOGISME",
    "BAYROU":"CENTRE",
    "CHIRAC":"DROITE",
    "MADELIN":"DROITE",
    "BOUTIN":"DROITE",
    "LEPEN":"EXTREME DROITE",
    "SAINT_JOSSE":"DIVERS",
    "MEGRET":"EXTREME DROITE"}

const courantPol07 = {"BESANCENOT":"EXTREME GAUCHE",
    "LAGUILLER":"EXTREME GAUCHE",
    "SCHIVARDI":"EXTREME GAUCHE",
    "BUFFET":"GAUCHE RADICALE",
    "BOVE":"GAUCHE RADICALE",
    "ROYAL":"GAUCHE",
    "VOYNET":"ECOLOGISME",
    "BAYROU":"CENTRE",
    "SARKOZY":"DROITE",
    "VILLIERS":"DROITE",
    "LEPEN":"EXTREME DROITE",
    "NIHOUS":"DIVERS"}

const courantPol12 = {"POUTOU":"EXTREME GAUCHE",
    "ARTHAUD":"EXTREME GAUCHE",
    "MELENCHON":"GAUCHE RADICALE",
    "HOLLANDE":"GAUCHE",
    "JOLY":"ECOLOGISME",
    "BAYROU":"CENTRE",
    "SARKOZY":"DROITE",
    "LEPEN":"EXTREME DROITE",
    "DUPONT_AIGNAN":"DROITE",
    "CHEMINADE":"DIVERS"}

const courantPol17 = {"POUTOU":"EXTREME GAUCHE",
    "ARTHAUD":"EXTREME GAUCHE",
    "MELENCHON":"GAUCHE RADICALE",
    "HAMON":"GAUCHE",
    "MACRON":"CENTRE",
    "FILLON":"DROITE",
    "DUPONT_AIGNAN":"DROITE",
    "LEPEN":"EXTREME DROITE",
    "LASSALLE":"DIVERS",
    "ASSELINEAU":"DIVERS",
    "CHEMINADE":"DIVERS"}

const courantPol22 = {"POUTOU":"EXTREME GAUCHE",
    "ARTHAUD":"EXTREME GAUCHE",
    "MELENCHON":"GAUCHE RADICALE",
    "ROUSSEL":"GAUCHE RADICALE",
    "LASSALLE" : "DIVERS",
    "HIDALGO":"GAUCHE",
    "JADOT":"ECOLOGISME",
    "MACRON":"CENTRE",
    "PECRESSE":"DROITE",
    "DUPONT_AIGNAN":"DROITE",
    "LEPEN":"EXTREME DROITE",
    "ZEMMOUR":"EXTREME DROITE"}

class SimulationElection {

    static particleType;
    static systemtype;
    static canvasManager;
    static parent;
    static menu;
    static nb_particules = 100;

    static dataset_path = "/voteData/";

    static datasets_url = [
        "1995_1_clean.csv", "1995_2_clean.csv",
        "2002_1_clean.csv", "2002_2_clean.csv",
        "2007_1_clean.csv", "2007_2_clean.csv",
        "2012_1_clean.csv", "2012_2_clean.csv",
        "2017_1_clean.csv", "2017_2_clean.csv",
        "2022_1_clean.csv", "2022_2_clean.csv"]

    static courantPol_list = [courantPol95, courantPol95, courantPol02, courantPol02, courantPol07, courantPol07, courantPol12, courantPol12, courantPol17, courantPol17, courantPol22, courantPol22];

    static bg;

    static dataSet;

    static current_year_id = 0;

    static insee_list;

    static step = 100;

    static count = 0;

    static count_cand = 0;
    static animation_id;

    static pause;

    static insee_list_current_data;

    static current_candidate_id = 0;

    static candidate_list;

    static pauseButton;

    static create() {
        this.particleType = Particle;
        this.canvasManager = CanvasManager;
        this.parent = document.getElementById("activity");
        this.width = 1920;
        this.height = 1080;

        this.canvasManager.create(this.width, this.height, "white", this.parent);
        this.bg = new MapElection("/img/france_scaled.png", (704 / 15.5), (623 / 9), 5.44, 51.28, 50.89);
        this.bg.getPointsFromCsvUrl('/electionData/cities.csv')

        this.systemtype = ParticleSystemElection;
        this.systemtype.create(this, this.canvasManager);
        this.dataSet = new DataSet(this.dataset_path + this.datasets_url[this.current_year_id], this.courantPol_list[this.current_year_id]);
        this.menu = MenuElection;
        this.menu.create(this.systemtype,this.canvasManager,this);

    }



    static animate() {

        SimulationElection.animation_id = requestAnimationFrame(SimulationElection.animate);
        if (SimulationElection.pause || SimulationElection.pauseButton) {
            return;
        }
        if (SimulationElection.count >= SimulationElection.insee_list_current_data.length) {
            SimulationElection.next_data();
            cancelAnimationFrame(SimulationElection.animation_id);
        }
        for (let i = 0; i <= SimulationElection.step; i++) {
            try {
                const insee = SimulationElection.insee_list_current_data[i + SimulationElection.count];
                const courantPolitiqueMajoritaire = SimulationElection.dataSet["data_clean"][insee]["candidats"]["MAX"];
                const maxVoix = SimulationElection.dataSet["data_clean"][insee]["candidats"][courantPolitiqueMajoritaire]["VOIX"];
                const posX = SimulationElection.bg.pos[insee][0];
                const posY = SimulationElection.bg.pos[insee][1];

                const part = new Particle(
                    matchCourantPolitiqueWithRGBA(courantPolitiqueMajoritaire),
                    Math.min(50, maxVoix * 0.001),
                    posX,
                    posY,
                    -1
                );

                ParticleSystemElection.addToSystem(part);
            } catch (error) {
            }
        }
        SimulationElection.systemtype.pass();
        SimulationElection.systemtype.clearParticleSystem();
        SimulationElection.count += SimulationElection.step;
    }

    static animateParCandidat(){
        SimulationElection.animation_id = requestAnimationFrame(SimulationElection.animateParCandidat);
        if (SimulationElection.pause ||SimulationElection.pauseButton) {
            return;
        }
        if (SimulationElection.count_cand >= SimulationElection.insee_list_current_data.length) {
            SimulationElection.count_cand = 0;
            SimulationElection.nextCandidate();
            cancelAnimationFrame(SimulationElection.animation_id);
        }
        for(let i = 0;i<=SimulationElection.step;i++){
            try{
                const insee = SimulationElection.insee_list_current_data[i + SimulationElection.count_cand];
                const candidatVoix = SimulationElection.dataSet["data_clean"][insee]["candidats"][SimulationElection.candidate_list[SimulationElection.current_candidate_id]]["VOIX"];
                const courantPolitique = SimulationElection.courantPol_list[SimulationElection.current_year_id][SimulationElection.candidate_list[SimulationElection.current_candidate_id]];
                const posX = SimulationElection.bg.pos[insee][0];
                const posY = SimulationElection.bg.pos[insee][1];
                const part = new Particle(
                    matchCourantPolitiqueWithRGBA(courantPolitique),
                    Math.min(50, candidatVoix * 0.001),
                    posX,
                    posY,
                    -1
                );

                ParticleSystemElection.addToSystem(part);
            }catch (error){
            }
        }
        SimulationElection.systemtype.pass();
        SimulationElection.systemtype.clearParticleSystem();
        SimulationElection.count_cand += SimulationElection.step;

    }

    static startSim() {
        this.insee_list_current_data = Object.keys(this.dataSet["data_clean"]);
        this.animate();
    }


    static afficherVilles() {
        //SimulationElection.pause = true;
        cancelAnimationFrame(SimulationElection.animation_id);
        this.bg.draw();
        this.insee_list = Object.keys(this.bg.pos);
        for (let i in this.insee_list) {
            this.afficherVille(this.insee_list[i], "red", 1);
        }
    }

    static afficherVille(insee, color, size) {
        try {
            const posX = this.bg.pos[insee][0];
            const posY = this.bg.pos[insee][1];
            new Particle(
                color,
                size,
                posX,
                posY,
                -1
            ).draw();
        } catch (error) {
        }
    }

    static next_data() {
        cancelAnimationFrame(SimulationElection.animation_id);
        this.current_year_id += 1;
        if (this.current_year_id == this.courantPol_list.length) {
            this.updateAffichage();
            return;
        }
        this.bg.draw();
        this.count = 0;
        this.updateAffichage(null,this.current_year_id);
        this.dataSet = new DataSet(this.dataset_path + this.datasets_url[this.current_year_id], this.courantPol_list[this.current_year_id]);
    }


    static resetData(){
        cancelAnimationFrame(SimulationElection.animation_id);
        this.count = 0;
        this.current_year_id = 0;
        this.updateAffichage(null,this.current_year_id);
        this.dataSet = new DataSet(this.dataset_path + this.datasets_url[this.current_year_id], this.courantPol_list[this.current_year_id]);
        this.bg.draw();
    }

    static startPerCandidateAnimation(yearId){
        this.count = 0;
        cancelAnimationFrame(SimulationElection.animation_id);
        this.bg.draw();
        this.current_candidate_id = 0;
        this.current_year_id = yearId;
        this.candidate_list = Object.keys(this.courantPol_list[this.current_year_id]);
        this.updateAffichage(this.candidate_list[this.current_candidate_id],this.current_year_id);
        this.dataSet = new DataSet(this.dataset_path + this.datasets_url[yearId],null);
    }

    static nextCandidate(){
        this.bg.draw();
        this.count = 0;
        this.current_candidate_id+=1;
        //this.current_year_id +=1;
        if(this.current_candidate_id==SimulationElection.candidate_list.length){
            this.current_candidate_id = 0;
            this.current_year_id +=1;
            if(this.current_year_id>parseInt(document.getElementById("year_perCandidate").value)+1){
                cancelAnimationFrame(SimulationElection.animation_id);
                this.updateAffichage();
                return;
            }
        }
        this.updateAffichage(this.candidate_list[this.current_candidate_id],this.current_year_id);
        this.dataSet = new DataSet(this.dataset_path + this.datasets_url[this.current_year_id],null)
    }

    static updateAffichage(name,year){
        const doc = document.getElementById("currendCandidate");
        let outputStr = "";
        if(name==null){
            if(year==null){
                outputStr="Terminé";
            }else{
                if (year % 2 === 0) {
                    outputStr += "Premier tour, ";
                } else {
                    outputStr += "Second tour, ";
                }
                ;
                switch (year) {
                    case 0:
                    case 1:
                        outputStr += "1995";
                        break;
                    case 2:
                    case 3:
                        outputStr += "2002";
                        break;
                    case 4:
                    case 5:
                        outputStr += "2007";
                        break;
                    case 6:
                    case 7:
                        outputStr += "2012";
                        break;
                    case 8:
                    case 9:
                        outputStr += "2017";
                        break;
                    case 10:
                    case 11:
                        outputStr += "2022";
                        break;
                }
            }
        }else {
            if (year % 2 === 0) {
                outputStr = "Candidat : " + name + ", premier tour";
            } else {
                outputStr = "Candidat : " + name + ", second tour";
            }
        }
        doc.innerText = outputStr;


    }

    static updateParticleCount(nb_particules){
     this.step = nb_particules;
    }

    static
}