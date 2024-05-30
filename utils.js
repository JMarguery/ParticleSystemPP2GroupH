
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

function getRandomRGBA(){
    let red = getRandomInt(0, 255);
    let green = getRandomInt(0, 255);
    let blue = getRandomInt(0, 255);
    let alpha = 1;

    return `rgba(${red},${green},${blue},${alpha})`;
}

function matchCourantPolitiqueWithRGBA(str){
    switch (str){
        case "EXTREME GAUCHE":
            return "#bb0000"
        case "GAUCHE RADICALE":
            return "#dd0000"
        case "GAUCHE":
            return "#ff8080"
        case "ECOLOGISME":
            return "#00c000"
        case "CENTRE":
            return "#00ffff"
        case "DROITE":
            return "#0066cc"
        case "EXTREME DROITE":
            return "#0d378a"
        case "DIVERS":
            return "#eeeeee"
    }
}

// Fonction pour générer des directions symétriques autour de la direction initiale
function genererDirectionsSymetriques(nombreParticules, angleDirectionInitiale, angleDispersion) {
    let directions = [];
    const anglePas = (2 * Math.PI) / nombreParticules;
    for (let i = 0; i < nombreParticules; i++) {
        const angle = angleDirectionInitiale + anglePas * i;
        const directionX = Math.cos(angle) * Math.cos(angleDispersion) - Math.sin(angle) * Math.sin(angleDispersion);
        const directionY = Math.sin(angle) * Math.cos(angleDispersion) + Math.cos(angle) * Math.sin(angleDispersion);
        directions.push({ x: directionX, y: directionY });
    }
    return directions;
}

Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}


/*
function getActivity(name){
    var script = document.createElement('script');
    switch (name) {
        case "windmap":
            script.src =
        case "fire":
            return
        case "firework":
            return
        case "tree":
            return
    }
}
*/
