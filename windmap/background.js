class BackgroundCanvas {
    static offscreenCanvas;
    static offscreenContext;
    static colorLookup = [];

    static create (width, height, gridVectors) {
        this.offscreenCanvas = new OffscreenCanvas(width, height);
        this.offscreenContext = this.offscreenCanvas.getContext("2d"); // utiliser webGl ?

        this.initializeColorLookup(VectorGrid.maxWindSpeed)
        this.drawBackgroundImage(gridVectors)
    }

    static initializeColorLookup(maxWindSpeed) {
        for (let i = 0; i <= 100; i++) {  // Assuming 100 steps for normalization
            const normalizedSpeed = (i / (100))*maxWindSpeed;
            const relativeSpeed = normalizedSpeed / maxWindSpeed;  // This is now always in [0, 1]
            const hue = 240 - (240 * relativeSpeed);
            this.colorLookup[i] = `hsl(${hue}, 100%, 30%)`;
        }
    }

    static drawBackgroundImage(gridVectors) {
        const scaleX = BackgroundCanvas.offscreenCanvas.width / gridVectors.length;
        const scaleY = BackgroundCanvas.offscreenCanvas.height / gridVectors[0].length;

        for (let x = 0; x < BackgroundCanvas.offscreenCanvas.width; x++) {
            for (let y = 0; y < BackgroundCanvas.offscreenCanvas.height; y++) {
                const vector = VectorGrid.getVecteurWithInterpolation(x,y);
                let speed = Math.sqrt(vector.x **2 + vector.y ** 2);

                const normalizedSpeed = Math.floor((speed / VectorGrid.maxWindSpeed) * 100);

                this.offscreenContext.fillStyle = this.colorLookup[normalizedSpeed];
                this.offscreenContext.fillRect(x, y, scaleX, scaleY);

            }
        }
    }


}




