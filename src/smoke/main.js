const width = 500;
const height = 500;

//Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'grey');

//Initialise le passeur.
Passeur.create();

//passeur.pushPriorityArray(VectorGrid);
const spawnPointLimit = {
    x:{
        min:250,
        max:250,
    },
    y:{
        min:450,
        max:450,
    }
};


// On met a jour toutes les particules toute les 30ms
let intervalRendu = setInterval(function(){
    Passeur.pass();
},30);


// On fait spawn 1 particles toutes les 0.3 seconde

let spawnSpeed = setInterval(function(){
    let spawnPointRandom = {
        x: 200,
        y: 450
    };

// ParticleFire.constructor(     color,     radius,     posX,     posY,     maxttl,     maxSpeed,     trailLength,     spreadX,     spreadY)
    new ParticleSmoke("rgba(128,128,128,0.55)",getRandomInt(4,6),spawnPointRandom.x,spawnPointRandom.y,getRandomInt(50,100),getRandomFloat(5,20),getRandomInt(100,200),20,10).instantiate();
},30);
