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
/*
function colorBasedOnSpeed(vel){
    speed = 
}
*/
// On créer un canvas vide (ici on utilise les valeurs de base, 800x500 fond noir)
createEmptyCanvas();
var spawnPointLimit = {
    x:{
        min:-200,
        max:800,
    },
    y:{
        min:0,
        max:0
    }
    };
// On créer et instancie 2 particules
let p = new ParticleSpeed(100,100,10,1,0,100);
let p2 = new ParticleSpeed(200,200,10,1,0,100);
p.instantiate();
p2.instantiate();

// On met a jour toutes les particules toute les 30ms
setInterval(function(){
    Particle.update();
},30);
// On instancie une particule bleu à [100,100] toute les 3000ms
setInterval(function(){
    var spawnPointRandom = {
        x:getRandomInt(spawnPointLimit.x.min,spawnPointLimit.x.max),
        y:getRandomInt(spawnPointLimit.y.min,spawnPointLimit.y.max)};
    var randVel = {
        x: getRandomInt(-3,3),
        y:getRandomInt(-1,1),
    }
    new ParticleSpeed(spawnPointRandom.x,spawnPointRandom.y,5,randVel.x,randVel.y,100).instantiate();
},1);
