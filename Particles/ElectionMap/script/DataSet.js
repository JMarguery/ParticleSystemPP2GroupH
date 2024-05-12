class DataSet {

    data_clean

    constructor(url,politicCompass){
        this.getDataFromCsv(url,politicCompass);
    }


    changeDataPerPolitic(politicCompass){
        for (let ville in this.data_clean){
            let newcandidatlist = {"EXTREME GAUCHE":{VOIX:0},
            "GAUCHE RADICALE":{VOIX:0},
            "GAUCHE":{VOIX:0},
            "ECOLOGISME":{VOIX:0},
            "CENTRE":{VOIX:0},
            "DROITE":{VOIX:0},
            "EXTREME DROITE":{VOIX:0},
            "DIVERS":{VOIX:0},
            "MAX":""
            }
            let maxvoix = {VOIX:0,NOM:""};
            for (let cand in this.data_clean[ville].candidats){
                try {
                    let voixcand = parseInt(this.data_clean[ville].candidats[cand].VOIX);
                    newcandidatlist[politicCompass[cand]].VOIX += voixcand
                    if (newcandidatlist[politicCompass[cand]].VOIX > maxvoix.VOIX) {
                        maxvoix.VOIX = newcandidatlist[politicCompass[cand]].VOIX;
                        maxvoix.NOM = politicCompass[cand];
                    }
                }catch(error){
                    console.log(error);
                    console.log(politicCompass);
                    console.log(cand);
                }
            }
            newcandidatlist["MAX"]=maxvoix.NOM
            this.data_clean[ville].candidats = newcandidatlist;
            }
        SimulationElection.startSim();

    }

    getDataFromCsv(url,politicCompass){
        fetch(url)
            .then(response=>response.text())
            .then(csvi => {
                var lines = csvi.split('\n');
                var data = {};
                var set = {
                    INSEE:null,
                    INSCRIT:null,
                    ABSTENTION:null,
                    VOTANT:null,
                    BLANCS_ET_NUL:null,
                    candidats:null
                }
                var candidat = {
                    nom:null,
                    prenom:null,
                    voix:null
                }
                lines.forEach(function(line) {
                    var values = line.split(',');
                    var insee=('0'.repeat(2-(values[0].toString().length)).concat([values[0].toString()]));
                    insee=insee.concat(['0'.repeat(3-(values[2].toString().length))+values[2].toString()]);
                    data[insee]={
                        INSCRIT:values[4],
                        ABSTENTION:values[5],
                        VOTANT:values[7],
                        BLANCS_ET_NUL:values[9],
                        candidats:{}
                    }
                    let j = 16;
                    while (j<values.length){
                        data[insee].candidats[values[j]]={
                            PRENOM:values[j+1],
                            VOIX:values[j+2]
                        }
                        j+=6
                    }
                });
                this.data_clean = data
                if(politicCompass!=null) {
                    this.changeDataPerPolitic(politicCompass);
                }else {
                    SimulationElection.animateParCandidat();
                }
            })

    }

}



