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
    static resolution;
    static cols;
    static rows;
    static vecteurs;
    static vecteurList;

    // Initialize the grid statically
    static create(resolution, width, height) {
        this.resolution = resolution;
        this.cols = Math.floor(width / resolution);
        this.rows = Math.floor(height / resolution);
        this.vecteurs = new Array(this.cols);
        this.vecteurList = [];
        for (let i = 0; i < this.cols; i++) {
            this.vecteurs[i] = new Array(this.rows);
        }


        let centerX = this.cols / 2;
        let centerY = this.rows / 2;

        /*
        //pattern pour faire spiral modifiable

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                const radius = Math.sqrt((i - centerX) ** 2 + (j - centerY) ** 2);
                const angleIncrement = 0.1; // Adjust as needed
                const spiralFactor = angleIncrement * radius;
                this.vecteurs[i][j] = {
                    x: Math.cos(spiralFactor),
                    y: Math.sin(spiralFactor),
                };
            }
        }


         */

        // créer un pattern ou les particules tournent autour du centre du tableau
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                // direction du centre vers la case actuelle
                let dirX = i - centerX;
                let dirY = j - centerY;

                // Calculate the angle and then the perpendicular to create a rotation
                const angle = Math.atan2(dirY, dirX) + Math.PI / 2; // Rotate by 90 degrees to get the perpendicular
                const vectorX = Math.cos(angle);
                const vectorY = Math.sin(angle);

                this.vecteurs[i][j] = {
                    x: vectorX,
                    y: vectorY,
                };
                this.vecteurList.push([i * this.resolution + this.resolution / 2,j * this.resolution + this.resolution / 2,this.vecteurs[i][j]])
            }
        }

    }

    static updateVectorList(){
        this.vecteurList = [];
        for (let i=0;i< this.cols;i++){
            for (let j=0;j<this.rows;j++){
            // Calcul des coordonnées du point de départ pour le vecteur
            let x = i * this.resolution + this.resolution / 2; // Centre du carré de la grille
            let y = j * this.resolution + this.resolution / 2; // Centre du carré de la grille
            let vecteur = this.vecteurs[i][j];
            this.vecteurList.push([x,y,vecteur]);
            // Dessin du vecteur à partir de cette position
            }
        }
    }

    static getVecteur(coordX, coordY) {
        const col = Math.floor(coordX / this.resolution);
        const row = Math.floor(coordY / this.resolution);
        return this.vecteurs[col][row];
    }


    static draw(){
        for (let ar of this.vecteurList){
            this.drawVector(ar[0],ar[1],ar[2]);
        }
    }


    static drawVector(x, y, vector) {
        CanvasManager.context.beginPath();
        CanvasManager.context.moveTo(x, y);
        const scaleFactor = this.resolution / 2;
        CanvasManager.context.lineTo(x + vector.x * scaleFactor, y + vector.y * scaleFactor);
        CanvasManager.context.stroke();
    }

}

