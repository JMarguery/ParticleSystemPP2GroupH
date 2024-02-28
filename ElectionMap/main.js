import LatLonSpherical from "./lib/geodesy-master/latlon-spherical.js";
import LatLonEllipsoidal from "./lib/geodesy-master/latlon-ellipsoidal.js";

const width = 2120;
const height = 1756 ;
const particleType = Particle;
//Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'grey');

let bg = new Map("../img/france_scaled.png",(704/15.5),(623/9),5.3737,51.2301)

bg.getArrayPointsFromCsvUrl('./data/cities.csv')


let i=0

setInterval(function(){
    new Particle(
        getRandomRGBA(),
        3,
        bg.pos[i][0],
        bg.pos[i][1],
        -1,
    ).instantiate();
    i+=1;
    console.log("drawing at "+bg.pos[i][0]+","+bg.pos[i][1]+" i = "+i)
},1)

function instantiateParticle(x,y){
    new Particle(
        getRandomRGBA(),
        10,
        x,
        y,
        getRandomInt(50,200),
    ).instantiate();
}

//Initialise le passeur.
Passeur.create();

proj4.defs("EPSG:3857", 
'+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m \+nadgrids=@null \+no_defs');

let topLeft = {
    lat:51.2301,
    long:-5.3737,
    x:0,
    y:0}

let botRight = {
    lat:41.8719,
    long:10.0537,
    x:704,
    y:623}

let middle = {
    lat:45.8354,
    long:1.2645,
    x:352,
    y:311.5}

let toulouse = {
    lat:43.6045,
    long:1.4442,
    x:0,
    y:0}

let marseille = {
    lat:43.2959,
    long:5.3697,
    x:0,
    y:0}

let pTopLeft = new LatLonSpherical(topLeft.lat,topLeft.long)
let pBotRight = new LatLonSpherical(botRight.lat,botRight.long)

let x=(marseille.long +5.3737) * (704/15.5) // Longitude to pixel.X
let y=(51.2301-marseille.lat)* (623/9) // Lattitude to pixel.Y

//let botx=(10.0537-middle.long) * (704/15.5)
//let boty=(middle.lat-41.8719)* (623/9.4)
console.log("x = "+x+"px , y = "+y+"px")
//console.log("x = "+botx+"px , y = "+boty+"px")
//console.log(x+((botx-x)/2))
//console.log(y+((boty-y)/2))
/*
let point1 = new LatLonSpherical(topLeft[0],topLeft[1])
let point2 = new LatLonSpherical(botRight[0],botRight[1])

let distanceMeters = point1.distanceTo(point2);
let distancePixel = (distanceMeters/1000)
let degree = point1.initialBearingTo(point2);
let rad = degree*Math.PI/180;
let point = [
    -distancePixel * Math.cos(rad),
    distancePixel * Math.sin(rad)
]
console.log("distance metre : "+distanceMeters);
console.log("y = "+(point[0]*0.6))
console.log("x = "+point[1]*0.6)



console.log(degree+"°")
console.log((distancePixel));
*/
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
