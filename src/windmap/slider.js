var sliderUpdateSpeed = document.getElementById("updateSpeed");

// Update the current slider value (each time you drag the slider handle)
sliderUpdateSpeed.oninput = function() {
    clearInterval(intervalRendu); // Clear the previous interval
    intervalRendu = setInterval(function(){
        Passeur.pass();
    }, this.value);
}

var sliderSpawnSpeed = document.getElementById("spawnSpeed");

// Update the current slider value (each time you drag the slider handle)
sliderSpawnSpeed.oninput = function() {
    clearInterval(spawnSpeed); // Clear the previous interval
    spawnSpeed = setInterval(() => {
        let spawnPointRandom = {
            x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
            y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
        };

        //ParticleWindMap.constructor(     color,     radius,     posX,     posY,     maxttl,     maxSpeed,     trailLength)
        new ParticleWindMap(getRandomRGBA(),3,spawnPointRandom.x,spawnPointRandom.y,getRandomInt(100,100),getRandomInt(1,2),getRandomInt(50,100)).instantiate();
    }, this.value);
}



