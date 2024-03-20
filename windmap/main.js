const color = [
    "red",
    "blue",
    "green",
    "magenta",
    "orange",
    "yellow"
];

const width = 500;
const height = 500;
const resolution = 10;

// Initialise le canvas avec CanvasManager
CanvasManager.create(width, height, 'grey');

// Initialise la grille de vecteurs
VectorGrid.create(resolution, width, height);

// Initialise le passeur
Passeur.create();


const spawnPointLimit = {
    x: {
        min: 10,
        max: 490,
    },
    y: {
        min: 10,
        max: 490,
    }
};


function animate() {
    CanvasManager.context.fillStyle = 'rgba(255, 255, 255, 0.001)'; // Example for a noticeable trail
    CanvasManager.context.fillRect(0, 0, CanvasManager.canvas.width, CanvasManager.canvas.height);

    Passeur.pass();

    requestAnimationFrame(animate);
}


animate();


/*

// On met a jour toutes les particules toute les 30ms
let intervalDic = {
    t: 30,
    fun: function() {
        Passeur.pass();
    }
};
let intervalRendu = setInterval(intervalDic.fun, intervalDic.t);
 */
// On fait spawn 1 particles toutes les 0.1 secondes
let spawnDir = {
    t: 100,
    fun: function() {
        let spawnPointRandom = {
            x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
            y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
        };
        new ParticleWindMap(
            getRandomRGBA(),
            3,
            spawnPointRandom.x,
            spawnPointRandom.y,
            getRandomInt(50, 100),
            getRandomInt(1, 2),
        ).instantiate();
    }
};
let spawnSpeed = setInterval(spawnDir.fun, spawnDir.t);

