class VectorGrid {
    static cols;
    static rows;
    static vecteurs;
    static maxWindSpeed;
    static minWindSpeed;

    static index(x, y) {
        return x + y * this.cols;
    }

    static create(data) {
        this.cols = data[0].header.nx;
        this.rows = data[0].header.ny;

        this.vecteurs = new Array(this.cols * this.rows);

        let max = 0;
        let min = 100;

        for (let i = 0; i < this.cols * this.rows; i++) {
            const u = data[0].data[i];
            const v = data[1].data[i];

            let speed = Math.sqrt(u**2 + v**2);
            if (speed > max) {
                max = speed;
            }
            if (speed < min){
                min = speed;
            }
            this.vecteurs[i] = { x: u, y: v };
        }

        this.maxWindSpeed = max;
        this.minWindSpeed = min;
    }

    static getVecteurWithInterpolation(coordX, coordY) {
        const centerX = this.cols / 2;

        const coordXToCoordInVectorGrid = (coordX - CanvasManager.offsetX) / CanvasManager.zoomScale;
        const coordYToCoordInVectorGrid = (coordY - CanvasManager.offsetY) / CanvasManager.zoomScale;

        let x = ((coordXToCoordInVectorGrid/ CanvasManager.canvas.width) * this.cols + centerX) % this.cols;
        let y = (coordYToCoordInVectorGrid / CanvasManager.canvas.height) * this.rows;

        x = (x + this.cols) % this.cols;
        y = Math.max(0, Math.min(this.rows - 1, y));

        const x0 = Math.floor(x);
        const x1 = (x0 + 1) % this.cols;
        const y0 = Math.floor(y);
        const y1 = Math.min(y0 + 1, this.rows - 1);

        const vectorBottomLeft = this.vecteurs[this.index(x0, y0)];
        const vectorBottomRight = this.vecteurs[this.index(x1, y0)];
        const vectorTopLeft = this.vecteurs[this.index(x0, y1)];
        const vectorTopRight = this.vecteurs[this.index(x1, y1)];

        const fx1 = x - x0;
        const fx0 = 1 - fx1;
        const fy1 = y - y0;
        const fy0 = 1 - fy1;

        const interpolatedX = vectorBottomLeft.x * fx0 * fy0 + vectorBottomRight.x * fx1 * fy0 +
            vectorTopLeft.x * fx0 * fy1 + vectorTopRight.x * fx1 * fy1;
        const interpolatedY = vectorBottomLeft.y * fx0 * fy0 + vectorBottomRight.y * fx1 * fy0 +
            vectorTopLeft.y * fx0 * fy1 + vectorTopRight.y * fx1 * fy1;

        return { x: interpolatedX, y: interpolatedY};
    }




}
