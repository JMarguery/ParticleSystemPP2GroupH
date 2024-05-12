import LatLonSpherical from "./lib/geodesy-master/latlon-spherical.js";
import LatLonEllipsoidal from "./lib/geodesy-master/latlon-ellipsoidal.js";

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
"SAINT_JOSSE":"DIVERS"}

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
"HIDALGO":"GAUCHE",
"JADOT":"ECOLOGISME",
"MACRON":"CENTRE",
"PECRESSE":"DROITE",
"DUPONT_AIGNAN":"DROITE",
"LEPEN":"EXTREME DROITE",
"ZEMMOUR":"EXTREME DROITE"}





const width = 2120;
const height = 1756 ;
const particleType = Particle;
const dataset_path = "./data/test/"
const datasets_url = ["1995_1/1995_1_clean.csv","1995_2/1995_2_clean.csv",
                      "2002_1/2002_1_clean.csv","2002_2/2002_2_clean.csv",
                      "2007_1/2007_1_clean.csv","2007_2/2007_2_clean.csv",
                      "2012_1/2012_1_clean.csv","2012_2/2012_2_clean.csv",
                      "2017_1/2017_1_clean.csv","2017_2/2017_2_clean.csv",
                      "2022_1/2022_1_clean.csv","2022_2/2022_2_clean.csv"]
const courantPol_list = [courantPol95,courantPol95,courantPol02,courantPol02,courantPol07,courantPol07,courantPol12,courantPol12,courantPol17,courantPol17,courantPol22,courantPol22]
let bg = new Map("../img/france_scaled.png",(704/15.5),(623/9),5.3737,51.2301)
bg.getPointsFromCsvUrl('./data/cities.csv')//set bg.pos to an array of x,y



let dataSet = new DataSet();

let current_year_id = 0;

dataSet.getDataFromCsv(dataset_path+datasets_url[current_year_id]);
dataSet.changeDataPerPolitic(courantPol_list[current_year_id]);

CanvasManager.create(width, height, 'grey');
dataSet.changeDataPerPolitic(courantPol_list[current_year_id]);
async function maina() {
    console.log("starting main !")
console.log(bg.pos) // return undefined

//let insee = Object.keys(bg.pos);
let i = 0;
let insee;



let intervalId = setInterval(function() {
    insee = Object.keys(bg.pos);
    clearInterval(intervalId);
    dataSet.changeDataPerPolitic(courantPol_list[current_year_id]);
},100)

/*
Pour faire apparaître ville par ville
*/

/*
setInterval(function(){
    i+=1;
    
    var ville12 = dataSet12.data_clean[insee[i]];

    console.log(ville12.candidats);
    new Particle(
        matchCourantPolitiqueWithRGBA(ville12.candidats["MAX"]),
        Math.min(10,ville12.INSCRIT*0.001),
        bg.pos[insee[i]][0],
        bg.pos[insee[i]][1],
        -1,
    ).instantiate();
    if (ville12.candidats["MAX"]==undefined){
        dataSet12.changeDataPerPolitic(courantPol12);
    }
    //console.log("drawing at "+bg.pos[insee[i]][0]+","+bg.pos[insee[i]][1]+" i = "+i) // fonctionne bien
},1)
*/

/*

Pour faire apparaître 100 ville par 100 ville
*/

setInterval(function(){
    i+=100;
    let j=0
    try{
        if (i>=insee.length-100){
            Passeur.cleanPassArray();
            current_year_id+=1;
            dataSet.getDataFromCsv(dataset_path+datasets_url[current_year_id]);
            dataSet.changeDataPerPolitic(courantPol_list[current_year_id]);
            i=0
        }
    }catch(error){
        console.error(error);
        console.log("probably not loaded");
        i=0;
    }
    for (j;j<=100;j++){
        
        var ville = dataSet.data_clean[insee[i+j]];
        var color;
        try{
            color = matchCourantPolitiqueWithRGBA(ville.candidats["MAX"])
        } catch(error){
            console.log(error);
            console.log("On i = "+(i).toString()+" j = "+(j).toString());
            console.log("insee = "+insee[i+j].toString())
            console.log(dataSet.data_clean);
            console.log(dataSet.data_clean[insee[i+j]]);
            color = "purple";
        }
        new Particle(
            color,
            Math.min(10,ville.INSCRIT*0.001),
            bg.pos[insee[i+j]][0],
            bg.pos[insee[i+j]][1],
            -1,
        ).instantiate();
    }
    if (ville.candidats["MAX"]==undefined){
        dataSet.changeDataPerPolitic(courantPol_list[current_year_id])
    }
    
    //console.log("drawing at "+bg.pos[insee[i]][0]+","+bg.pos[insee[i]][1]+" i = "+i) // fonctionne bien
},1)


/*
setInterval(function(){
    for(let insee in bg.pos){
        new Particle(
            getRandomRGBA(),
            3,
            bg.pos[insee][0],
            bg.pos[insee][1],
            1000,
        ).instantiate();
    }
},10000)
*/
//Initialise le passeur.
Passeur.create();
Passeur.pushPriorityArray(bg);
console.log(bg)
//passeur.pushPriorityArray(VectorGrid);
const spawnPointLimit = {
    x:{
        min:0,
        max:500,
    },
    y:{
        min:0,
        max:500,
    }
};


// On met a jour toutes les particules toute les 30ms
let intervalDic = {};
intervalDic.t = 30;
intervalDic.fun = function(){
    Passeur.pass();
};
let intervalRendu = setInterval(intervalDic.fun,intervalDic.t);



// On fait spawn 1 particles toutes les 0.3 seconde
let spawnDir = {};
spawnDir.t = 30;
spawnDir.fun = function(){
    let spawnPointRandom = {
        x: getRandomInt(spawnPointLimit.x.min,spawnPointLimit.x.max),
        y: getRandomInt(spawnPointLimit.y.min,spawnPointLimit.y.max),
    };
/*
    new Particle(
        getRandomRGBA(),
        10,
        spawnPointRandom.x,
        spawnPointRandom.y,
        getRandomInt(50,200),
    ).instantiate();
 */   
};
spawnSpeed=setInterval(spawnDir.fun,spawnDir.t);
}


window.onload = function(){
    maina();
}

