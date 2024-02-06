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

//VectorGrid.create(resolution, width, height);

//Initialise le passeur.
passeur = new Passeur();

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
    passeur.pass();
},3);



// On fait spawn 1 particles toutes les 0.1 secondes

setInterval(function(){
    let spawnPointRandom = {
        x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
        y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
    };
    new ParticleFire("rgba(255,0,0,1)",getRandomInt(4,6),spawnPointRandom.x,spawnPointRandom.y,passeur,getRandomInt(50,100),getRandomFloat(5,10),getRandomInt(100,600)).instantiate();
},);
