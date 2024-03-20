const width = 500;
const height = 500;

//Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'white');

//Initialise le passeur.
Passeur.create();

//passeur.pushPriorityArray(VectorGrid);
const spawnPointLimit = {
    x:{
        min:200,
        max:300,
    },
    y:{
        min:450,
        max:490,
    }
};


// On met a jour toutes les particules toute les 30ms
let intervalRendu = setInterval(function(){
    Passeur.pass();
},30);


// On fait spawn 1 particles toutes les 0.3 seconde

let spawnSpeed = setInterval(function(){
    let spawnPointRandom = {
        x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
        y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
    };

    new ParticleSmoke("rgba(128,128,128,0.25)",getRandomInt(4,6),spawnPointRandom.x,spawnPointRandom.y,getRandomInt(50,100),getRandomFloat(5,20),getRandomInt(100,200),20,10).instantiate();
},30);
