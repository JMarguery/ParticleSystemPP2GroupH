
function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max-min)+min);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function updateWindSpeed(){
    var windValue = document.getElementById("WindSpeed").value;
    ParticleSmoke.updateWindSpeed(parseInt(windValue));
    console.log(ParticleSmoke.windSpeed);
}

function updateIntervalUpdate(){
    var updateValue = parseInt(document.getElementById("updateInterval").value);
    Passeur.updateUpdateInterval(updateValue);
    
}