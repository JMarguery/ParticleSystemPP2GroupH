
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
    let alpha = 1; // You specified alpha as 1, which means fully opaque

    return `rgba(${red},${green},${blue},${alpha})`;
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