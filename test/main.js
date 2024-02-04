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

//Initialise le passeur.
passeur = new Passeur();

passeur.pushPriorityArray(VectorGrid);
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
setInterval(function(){
    passeur.pass();
},30);



// On fait spawn 1 particles toutes les 0.1 secondes

setInterval(function(){
    let spawnPointRandom = {
        x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
        y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
    };
    //new Particle(spawnPointRandom.x,spawnPointRandom.y, color[getRandomInt(0,5)], 3, getRandomInt(50,100), getRandomInt(1,2), getRandomInt(20,60)).instantiate();
    //new Particle(color[getRandomInt(0,5)],3,spawnPointRandom.x,spawnPointRandom.y,passeur,100).instantiate();
    new ParticleWindMap(color[getRandomInt(0,5)],3,spawnPointRandom.x,spawnPointRandom.y,passeur,getRandomInt(50,100),getRandomInt(1,2),getRandomInt(20,60)).instantiate();
},100);
