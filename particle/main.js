const width = 500;
const height = 500;

const particleType = Particle;

//Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'grey');

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

    new Particle(
        getRandomRGBA(),
        10,
        spawnPointRandom.x,
        spawnPointRandom.y,
        getRandomInt(50,200),
    ).instantiate();
    
};
spawnSpeed=setInterval(spawnDir.fun,spawnDir.t);