/*
___________________________________________________________

Class VectorGrid :

Permet de créer un tableau de tableau, chaque case contenant un vecteur direction pour déplacer les particules, static pour être utilisé partout et on a 1 grille pour l'application
___________________________________________________________

Champs :

___________________________________________________________

Static fields :

resolution : + la resolution est petite plus il y aura de vecteurs dans 1 ligne exemple : taille 500 avec resolution à 10 => 50 vecteurs par lignes si résolution à 1 = 500
cols : nb de colonnes dans la grille
rows : nb de lignes dans la grille
vecteurs : grille de vecteurs
vecteurList : Liste [x,y,vecteurs[i,j]] utilisé pour le draw
___________________________________________________________

Constructeur :
VectorGrid (
    float : résolution,
    float : width,
    float : height,
)

___________________________________________________________

Methodes :

___________________________________________________________

Methodes static :

create() : constructeur static pour créer un VectorGrid avec un pattern ou les vecteurs forment des cercles avec comme centre le centre du tableau

getVecteur(coordX, coordY) : retourne le vecteur correspondant à la position x y passé en argument

static drawVector(x, y, vector) : Dessiner un vecteur à partir d'un point (x, y) dans une direction spécifique (vecteur)

static draw() : Dessine tous les vecteurs

static updateVectorList() : Update la liste des vecteurs
___________________________________________________________
*/

class VectorGrid {
    static cols;
    static rows;
    static vecteurs;
    static maxWindSpeed;


    static create(data) {
        this.cols = data[0].header.nx;
        this.rows = data[0].header.ny;


        this.vecteurs = new Array(this.cols);

        let max = Math.sqrt(data[0].data[0] **2 + data[1].data[1]** 2);

        for (let i = 0; i < this.cols; i++) {
            this.vecteurs[i] = new Array(this.rows);
        }

        for (let i = 0; i < this.cols * this.rows; i++) {

            let columnIndex = i % this.cols;
            let rowIndex = Math.floor(i / this.cols);

            const u = data[0].data[i]; //  (est-ouest)
            const v = data[1].data[i]; //  (nord-sud)

            let maxCourant = Math.sqrt(u**2 + v** 2);

            if (maxCourant > max){
                max = maxCourant;
            }

            this.vecteurs[columnIndex][rowIndex] = {x: u, y: v};
        }
        this.maxWindSpeed = max;

    }


    static getVecteur(coordX, coordY) {

        let long = Math.floor((coordX / CanvasManager.canvas.width )* this.cols);
        let lat = Math.floor((coordY / CanvasManager.canvas.height )*  this.rows);


        return this.vecteurs[long][lat];
    }


    static getVecteurWithInterpolation(coordX, coordY) {
        const centerX = this.cols / 2;

        const x = ((coordX / CanvasManager.canvas.width) * this.cols + centerX) % this.cols;
        const y = (coordY / CanvasManager.canvas.height) * this.rows;

        const x0 = Math.floor(x);
        const x1 = (x0 + 1) % this.cols;
        const y0 = Math.floor(y);
        const y1 = Math.min(y0 + 1, this.rows - 1);

        const vectorBottomLeft = this.vecteurs[x0][y0];
        const vectorBottomRight = this.vecteurs[x1][y0];
        const vectorTopLeft = this.vecteurs[x0][y1];
        const vectorTopRight = this.vecteurs[x1][y1];

        const fx1 = x - x0;
        const fx0 = 1 - fx1;
        const fy1 = y - y0;
        const fy0 = 1 - fy1;

        const interpolatedX = vectorBottomLeft.x * fx0 * fy0 + vectorBottomRight.x * fx1 * fy0 +
            vectorTopLeft.x * fx0 * fy1 + vectorTopRight.x * fx1 * fy1;

        const interpolatedY = vectorBottomLeft.y * fx0 * fy0 + vectorBottomRight.y * fx1 * fy0 +
            vectorTopLeft.y * fx0 * fy1 + vectorTopRight.y * fx1 * fy1;

        return { x: interpolatedX, y: interpolatedY };
    }


}

