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
setInterval(function(){
    Passeur.pass();
},30);



// On fait spawn 1 particles toutes les 0.1 secondes

setInterval(function(){
    let spawnPointRandom = {
        x: 450,
        y: 450
    };
    new ParticleFire("rgba(255,0,0,1)",getRandomInt(4,6),spawnPointRandom.x,spawnPointRandom.y,getRandomInt(50,100),getRandomFloat(5,10),getRandomInt(100,200),20,10).instantiate();
},30);
