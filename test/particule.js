
var context;
var canvas;
var bgcolor;
// Créer un canvas vide de largeur width, hauteur height, de couleur color et l'ajoute au body du document
function createEmptyCanvas(width=800,height=500,color="black"){
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    bgcolor = color;
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    context.fillStyle = bgcolor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Créer une particule ronde de couleur color à la position [posx,posy] et de rayon radius
/*
function createParticle(color = "blue",posx=canvas.width/2,posy=canvas.height/2,radius = 10){
    context.fillStyle = color;
    context.beginPath();
    context.arc(posx,posy,radius,0,Math.PI*2,true);
    context.closePath();
    context.fill();
}
*/