/*
___________________________________________________________

Class CanvasManager :

Permet de créer un canvaManager static pour pouvoir être utilisé partout.
___________________________________________________________

Champs :

___________________________________________________________

Static fields :

width : largeur du canvas
height : hauteur du canvas
color : couleur du fond du canvas
___________________________________________________________

Constructeur :
Particle (
    float : width,
    float : height,
    string : color,
)

___________________________________________________________

Methodes :

___________________________________________________________

Methodes static :

create() : constructeur static pour créer un canvasManager

___________________________________________________________
*/

class CanvasManager {
    static context;
    static canvas;
    static bgcolor;

    static create(width, height, color) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.bgcolor = color;
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.context.fillStyle = this.bgcolor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
