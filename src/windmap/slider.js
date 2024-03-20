const sliderUpdateSpeed = document.getElementById("updateSpeed");
const valueUpdateSpeed = document.getElementById("updateSpeedValue");
valueUpdateSpeed.innerText = sliderUpdateSpeed.value;

const sliderSpawnSpeed = document.getElementById("spawnSpeed");
const valueSpawnSpeed = document.getElementById("spawnSpeedValue");
valueSpawnSpeed.innerText = sliderSpawnSpeed.value;

sliderUpdateSpeed.oninput = function() {
    clearInterval(intervalRendu); // Clear the previous interval
    intervalRendu = setInterval(function(){
        Passeur.pass();
    }, parseInt(this.value));
    valueUpdateSpeed.innerText = this.value;
}


sliderSpawnSpeed.oninput = function() {
    clearInterval(spawnSpeed); // Clear the previous interval
    spawnSpeed = setInterval(() => {
        let spawnPointRandom = {
            x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
            y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
        };

        //ParticleWindMap.constructor(     color,     radius,     posX,     posY,     maxttl,     maxSpeed,     trailLength)
        new ParticleWindMap(getRandomRGBA(),3,spawnPointRandom.x,spawnPointRandom.y,getRandomInt(100,100),getRandomInt(1,2),getRandomInt(50,100)).instantiate();
    }, parseInt(this.value));
    valueSpawnSpeed.innerText = this.value
}

