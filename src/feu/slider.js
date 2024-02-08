const sliderUpdateSpeed = document.getElementById("updateSpeed");
const sliderSpawnSpeed = document.getElementById("spawnSpeed");

const sliderSpreadX = document.getElementById("SpreadX");
const sliderSpreadY = document.getElementById("SpreadY");

// Update the current slider value (each time you drag the slider handle)
sliderUpdateSpeed.oninput = function() {
    clearInterval(intervalRendu); // Clear the previous interval
    intervalRendu = setInterval(function(){
        Passeur.pass();
    }, this.value);
}

// Update the current slider value (each time you drag the slider handle)
sliderSpawnSpeed.oninput = function() {
    clearInterval(spawnSpeed); // Clear the previous interval
    spawnSpeed = setInterval(() => {
        let spawnPointRandom = {
            x: 200,
            y: 450
        };

        // ParticleFire.constructor(     color,     radius,     posX,     posY,     maxttl,     maxSpeed,     trailLength,     spreadX,     spreadY)
        new ParticleFire("rgba(255,255,0,1)",getRandomInt(4,6),spawnPointRandom.x,spawnPointRandom.y,getRandomInt(50,100),getRandomFloat(5,10),getRandomInt(100,200),sliderSpreadX.value,sliderSpreadY.value).instantiate();
    }, this.value);
}



