// On créer un canvas vide (ici on utilise les valeurs de base, 800x500 fond noir)
createEmptyCanvas();
// On créer et instancie 2 particule, une bleue à [100,100] et une rouge à [200,200]
let p = new Particle(100,100,"blue",10,1,0,100);
let p2 = new Particle(200,200,"red",10,1,0,100);
p.instantiate();
p2.instantiate();

// On met a jour toutes les particules toute les 30ms
setInterval(function(){
    Particle.update();
},30);
// On instancie une particule bleu à [100,100] toute les 3000ms
setInterval(function(){
    new Particle(100,100,"blue",10,1,0,100).instantiate();
},3000);
