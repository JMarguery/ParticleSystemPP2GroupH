var color = [
"red",
"blue",
"green",
"magenta",
"orange",
"yellow"];

function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max-min)+min);
  }
// On créer un canvas vide (ici on utilise les valeurs de base, 800x500 fond noir)
createEmptyCanvas(1920,1080);
var spawnPointLimit = {
    x:{
        min:600,
        max:1000,
    },
    y:{
        min:0,
        max:500
    }
    };

var passeur = new Passeur([]);
// On créer et instancie 2 particules
let p = new Particle("red",10,100,100,passeur,-1);
let p2 = new Particle("blue",20,300,400,passeur,-1);

let p3 = new ParticlePhysic("green",10,300,0,passeur,5,5,100,0.5);

p3.instantiate();

// On met a jour toutes les particules toute les 30ms
setInterval(function(){
    passeur.pass();
},0.5);
// On instancie une particule bleu à [100,100] toute les 3000ms
setInterval(function(){
    var spawnPointRandom = {
        x:getRandomInt(spawnPointLimit.x.min,spawnPointLimit.x.max),
        y:getRandomInt(spawnPointLimit.y.min,spawnPointLimit.y.max)};
    var randVel = {
        x: getRandomInt(-3,3),
        y:getRandomInt(-1,1),
    }
    let pa = new ParticlePhysic(color[getRandomInt(0,color.length)],10,spawnPointRandom.x,spawnPointRandom.y,passeur,randVel.x,randVel.y,100,0.5);
    new ParticleSpeed(10,500,0,passeur,randVel.x,randVel.y,100,0.5).instantiate();
    new ParticleTTL(10,spawnPointRandom.x,spawnPointRandom.y,passeur,100).instantiate();


},1000);
