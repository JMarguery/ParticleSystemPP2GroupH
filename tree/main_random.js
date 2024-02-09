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
PasseurTree.create();

//Passeur.pushPriorityArray(VectorGrid);
const spawnPointLimit = {
    x:{
        min:0,
        max:800,
    },
    y:{
        min:10,
        max:490,
    }
};


let intervalDic = {};
intervalDic.t = PasseurTree.timerMaJ;
intervalDic.fun = function(){
    PasseurTree.pass();
}
// On met a jour toutes les particules toute les 30ms
let intervalRendu = setInterval(intervalDic.fun,intervalDic.t);

// On fait spawn 1 particles toutes les 0.1 secondes

new ParticleTreeRandom(
    "red",
    5,
    500,
    500,
    100,
    5,
    [0,-1],
    1,
    0,
    0.8
).instantiate();

setInterval(function(){
    let spawnPointRandom = {
        x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
        y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
    };
    //new ParticleFirework(getRandomRGBA(),5,spawnPointRandom.x,500,getRandomInt(50,200),15,20).instantiate();
},1000);
