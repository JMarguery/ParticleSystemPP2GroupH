const width = 500;
const height = 500;

//Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'grey');

//Initialise le passeur.
Passeur.create();

//passeur.pushPriorityArray(VectorGrid);
const spawnPointLimit = {
    x:{
        min:100,
        max:400,
    },
    y:{
        min:10,
        max:200,
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
    new ParticlePhysicBounded(
        getRandomRGBA(),
        5,
        spawnPointRandom.x,
        spawnPointRandom.y,
        getRandomInt(-10,10),
        getRandomInt(0,5),
        getRandomInt(100,500),
        1,
        0.9,
    ).instantiate();

};
let spawnSpeed = setInterval(spawnDir.fun,spawnDir.t);
