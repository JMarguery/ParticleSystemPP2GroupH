import LatLonSpherical from "./lib/geodesy-master/latlon-spherical.js";
import LatLonEllipsoidal from "./lib/geodesy-master/latlon-ellipsoidal.js";

const width = 2120;
const height = 1756 ;
const particleType = Particle;
//Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'grey');

let bg = new Map("../img/france_scaled.png",(704/15.5),(623/9),5.3737,51.2301)

bg.getPointsFromCsvUrl('./data/cities.csv')//set bg.pos to an array of x,y

console.log(bg.pos) // return undefined

let i=0
/*

Pour faire apparaître ville par ville

setInterval(function(){
    new Particle(
        getRandomRGBA(),
        3,
        bg.pos[i][0],
        bg.pos[i][1],
        -1,
    ).instantiate();
    i+=1;
    console.log("drawing at "+bg.pos[i][0]+","+bg.pos[i][1]+" i = "+i) // fonctionne bien
},1)
*/

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

//Initialise le passeur.
Passeur.create();
Passeur.pushPriorityArray(bg);

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
