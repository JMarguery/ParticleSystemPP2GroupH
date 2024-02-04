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
    Particle.update();
    // Parcours de chaque cellule de la grille pour dessiner les vecteurs
    for (let i = 0; i < VectorGrid.cols; i++) {
        for (let j = 0; j < VectorGrid.rows; j++) {
            // Calcul des coordonnées du point de départ pour le vecteur
            let x = i * VectorGrid.resolution + VectorGrid.resolution / 2; // Centre du carré de la grille
            let y = j * VectorGrid.resolution + VectorGrid.resolution / 2; // Centre du carré de la grille
            // Dessin du vecteur à partir de cette position
            VectorGrid.drawVector(x, y, VectorGrid.vecteurs[i][j]);
        }
    }
},30);



// On fait spawn 1 particles toutes les 0.1 secondes
setInterval(function(){
    let spawnPointRandom = {
        x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
        y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
    };
    new Particle(spawnPointRandom.x,spawnPointRandom.y, color[getRandomInt(0,5)], 3, getRandomInt(50,50), getRandomInt(1,2), getRandomInt(100,200)).instantiate();

},100);




