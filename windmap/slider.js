var sliderSpawnSpeed = document.getElementById("spawnSpeed");


sliderSpawnSpeed.oninput = function() {
    clearInterval(spawnSpeed);
    spawnSpeed = setInterval(() => {
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
    }, this.value);
}