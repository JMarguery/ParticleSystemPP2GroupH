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
    CanvasManager.context.fillStyle = 'rgba(255, 255, 255, 0.05)';
    CanvasManager.context.fillRect(0, 0, CanvasManager.canvas.width, CanvasManager.canvas.height);

    Passeur.pass();

    requestAnimationFrame(animate);
}


animate();


let spawnDir = {
    t: 100,
    fun: function() {
        for (let i = 0; i < 10; i++) {
            let spawnPointRandom = {
                x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
                y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
            };
            new ParticleWindMap(
                getRandomRGBA(),
                1,
                spawnPointRandom.x,
                spawnPointRandom.y,
                getRandomInt(50, 100),
                getRandomInt(1, 1),
            ).instantiate();
        }
    }
};
let spawnSpeed = setInterval(spawnDir.fun, spawnDir.t);

