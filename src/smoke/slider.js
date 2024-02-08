const sliderUpdateSpeed = document.getElementById("updateSpeed");
const valueUpdateSpeed = document.getElementById("updateSpeedValue");
valueUpdateSpeed.innerText = sliderUpdateSpeed.value;

const sliderSpawnSpeed = document.getElementById("spawnSpeed");
const valueSpawnSpeed = document.getElementById("spawnSpeedValue");
valueSpawnSpeed.innerText = sliderSpawnSpeed.value;

const sliderWindForce= document.getElementById("windForce");
const valueWindForce = document.getElementById("windForceValue");
valueWindForce.innerText = sliderWindForce.value;


sliderUpdateSpeed.oninput = function() {
    clearInterval(intervalRendu); // Clear the previous interval
    intervalRendu = setInterval(function(){
        Passeur.pass();
    },parseInt(this.value));
    valueUpdateSpeed.innerText = this.value;
}

sliderWindForce.oninput = function() {
    ParticleSmoke.updateWindSpeed(parseInt(this.value));
    valueWindForce.innerText = this.value;
}

sliderSpawnSpeed.oninput = function() {
    clearInterval(spawnSpeed); // Clear the previous interval
    spawnSpeed = setInterval(() => {
        let spawnPointRandom = {
            x: getRandomInt(spawnPointLimit.x.min, spawnPointLimit.x.max),
            y: getRandomInt(spawnPointLimit.y.min, spawnPointLimit.y.max)
        };

        new ParticleSmoke("rgba(128,128,128,0.2)",getRandomInt(4,6),spawnPointRandom.x,spawnPointRandom.y,getRandomInt(50,100),getRandomFloat(5,20),getRandomInt(100,200),20,10).instantiate();
    }, parseInt(this.value));
    valueSpawnSpeed.innerText = this.value
}



