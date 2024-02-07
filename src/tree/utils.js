
function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max-min)+min);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomRGBA(){
    let red = getRandomInt(0, 255);
    let green = getRandomInt(0, 255);
    let blue = getRandomInt(0, 255);
    let alpha = 1; // You specified alpha as 1, which means fully opaque

    return `rgba(${red},${green},${blue},${alpha})`;
}