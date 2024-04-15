class BackgroundCanvas {
    static offscreenCanvas;
    static offscreenContext;
    static colorLookup = [];

    static create(width, height) {
        this.offscreenCanvas = new OffscreenCanvas(width, height);
        this.offscreenContext = this.offscreenCanvas.getContext("2d");

        this.initializeColorLookup(VectorGrid.maxWindSpeed);
        this.drawBackgroundImage();
    }

    static initializeColorLookup(maxWindSpeed) {
        for (let i = 0; i <= 100; i++) {
            const normalizedSpeed = (i / 100) * maxWindSpeed;
            const hue = 240 - (240 * (normalizedSpeed / maxWindSpeed));
            this.colorLookup[i] = `hsl(${hue}, 100%, 30%)`;
        }
    }

    static drawBackgroundImage() {
        const width = this.offscreenCanvas.width;
        const height = this.offscreenCanvas.height;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const vector = VectorGrid.getVecteurWithInterpolation(x, y);
                let speed = Math.sqrt(vector.x **2 + vector.y **2);
                const normalizedSpeed = Math.min(Math.floor((speed / VectorGrid.maxWindSpeed) * 100), 100);

                this.offscreenContext.fillStyle = this.colorLookup[normalizedSpeed];
                this.offscreenContext.fillRect(x, y, 1 , 1);
            }
        }
    }
}
