const sliderUpdateSpeed = document.getElementById("updateSpeed");
const valueUpdateSpeed = document.getElementById("updateSpeedValue");
valueUpdateSpeed.innerText = sliderUpdateSpeed.value;

const sliderSpawnSpeed = document.getElementById("spawnSpeed");
const valueSpawnSpeed = document.getElementById("spawnSpeedValue");
valueSpawnSpeed.innerText = sliderSpawnSpeed.value;

const sliderSpreadX = document.getElementById("SpreadX");
const valueSliderSpreadX = document.getElementById("spreadXValue");
valueSliderSpreadX.innerText = sliderSpawnSpeed.value;

const sliderSpreadY = document.getElementById("SpreadY");
const valueSliderSpreadY = document.getElementById("spreadYValue");
valueSliderSpreadY.innerText = sliderSpawnSpeed.value;


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
            x: 200,
            y: 450
        };

        // ParticleFire.constructor(     color,     radius,     posX,     posY,     maxttl,     maxSpeed,     trailLength,     spreadX,     spreadY)
        new ParticleFire("rgba(255,255,0,1)",getRandomInt(4,6),spawnPointRandom.x,spawnPointRandom.y,getRandomInt(50,100),getRandomFloat(5,10),getRandomInt(100,200),sliderSpreadX.value,sliderSpreadY.value).instantiate();
    }, parseInt(this.value));
    valueSpawnSpeed.innerText = this.value
}

sliderSpreadX.oninput = function() {
    valueSliderSpreadX.innerText = this.value;
}

sliderSpreadY.oninput = function() {
    valueSliderSpreadY.innerText = this.value;
}



