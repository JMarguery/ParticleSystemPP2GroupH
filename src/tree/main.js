const color = [
    "red",
    "blue",
    "green",
    "magenta",
    "orange",
    "yellow"];

const width = 1000;
const height = 500;
const resolution = 10;


//Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'grey');

//Initialise la grille de vecteurs
//VectorGrid.create(resolution, width, height);

//Initialise le passeur
Passeur.create();

//Passeur.pushPriorityArray(VectorGrid);
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
    PasseurTree.pass();
},PasseurTree.timerMaJ);
//new Particle("red",20,250,250,-1).instantiate();
//new ParticlePhysic("blue",10,spawnPointRandom.x,spawnPointRandom.y,getRandomInt(1,5),getRandomInt(-1,1),getRandomint(50,100),1);
//new ParticleTree("brown",5,500,500,50,4,[0,-1],3,0,0.8).instantiate();
//new ParticleTree("brown",3,500,500,100,10,[0,-1],5,0,0.7)
new ParticleTreeRandom("red",3,500,500,100,6,[0,-1],0,1,0.8).instantiate();
// On fait spawn 1 particles toutes les 0.1 secondes

setInterval(function(){
    let spawnPointRandom = {
        x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
        y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
    };
    //new ParticlePhysic("blue",10,spawnPointRandom.x,spawnPointRandom.y,getRandomInt(1,5),getRandomInt(-1,1),getRandomInt(50,100),1).instantiate();
    //new Particle(spawnPointRandom.x,spawnPointRandom.y, color[getRandomInt(0,5)], 3, getRandomInt(50,100), getRandomInt(1,2), getRandomInt(20,60)).instantiate();
    //new Particle(color[getRandomInt(0,5)],3,spawnPointRandom.x,spawnPointRandom.y,passeur,100).instantiate();
    //new ParticleWindMap(getRandomRGBA(),3,spawnPointRandom.x,spawnPointRandom.y,getRandomInt(50,100),getRandomInt(1,2),getRandomInt(20,60)).instantiate();
},100);
