const color = [
    "red",
    "blue",
    "green",
    "magenta",
    "orange",
    "yellow"];

const width = 500;
const height = 500;
const resolution = 10;


//Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'grey');

//Initialise la grille de vecteurs
VectorGrid.create(resolution, width, height);

//Initialise le passeur
Passeur.create();

Passeur.pushPriorityArray(VectorGrid);
const spawnPointLimit = {
    x:{
        min:10,
        max:490,
    },
    y:{
        min:10,
        max:490,
    }
};


// On met a jour toutes les particules toute les 30ms
let intervalRendu = setInterval(function(){
    Passeur.pass();
},30);



// On fait spawn 1 particles toutes les 0.1 secondes

let spawnSpeed = setInterval(() => {
    let spawnPointRandom = {
        x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
        y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
    };

    //ParticleWindMap.constructor(     color,     radius,     posX,     posY,     maxttl,     maxSpeed,     trailLength)
    new ParticleWindMap(getRandomRGBA(),3,spawnPointRandom.x,spawnPointRandom.y,getRandomInt(100,100),getRandomInt(1,2),getRandomInt(50,100)).instantiate();
},30);
