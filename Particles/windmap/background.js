class BackgroundCanvas {
    static offscreenCanvas;
    static offscreenContext;
    static colorLookup = [];

    static create(width, height) {
        this.offscreenCanvas = new OffscreenCanvas(width, height);
        this.offscreenContext = this.offscreenCanvas.getContext("2d");

        this.initializeColorLookup(VectorGrid.maxWindSpeed);
        this.drawBackgroundImage();
        this.drawCountryBorders();
        this.drawColorScale();
    }

    static initializeColorLookup(maxWindSpeed) {
        for (let i = 0; i <= 100; i++) {
            const normalizedSpeed = (i / 100) * maxWindSpeed;
            const hue = 240 - (240 * (normalizedSpeed / maxWindSpeed));
            this.colorLookup[i] = `hsl(${hue}, 100%, 30%)`;
        }
    }

    static drawBackgroundImage() {
        for (let x = 0; x < this.offscreenCanvas.width; x++) {
            for (let y = 0; y < this.offscreenCanvas.height; y++) {
                const vector = VectorGrid.getVecteurWithInterpolation(x, y);
                let speed = Math.sqrt(vector.x ** 2 + vector.y ** 2);
                const normalizedSpeed = Math.min(Math.floor((speed / VectorGrid.maxWindSpeed) * 100), 100);

                this.offscreenContext.fillStyle = this.colorLookup[normalizedSpeed];
                this.offscreenContext.fillRect(x, y, 1, 1);
            }
        }
        this.offscreenContext.drawImage(this.offscreenCanvas, 0, 0, CanvasManager.canvas.width, CanvasManager.canvas.height);
    }


    static drawCountryBorders() {
        const scale = this.offscreenCanvas.width / (2 * Math.PI);

        // Define a geographical projection
        const projection = d3.geoEquirectangular().translate([this.offscreenCanvas.width / 2, this.offscreenCanvas.height / 2]).scale(scale);

        // Define a generator for the paths using the canvas context
        const pathGenerator = d3.geoPath().projection(projection).context(this.offscreenContext);

        // Load GeoJSON data and draw it
        d3.json("/windmapData/custom.geo.json").then((geojsonData) => {
            this.offscreenContext.strokeStyle = "black"; // Border color
            this.offscreenContext.lineWidth = 0.75; // Border width

            // Draw each country
            geojsonData.features.forEach(feature => {
                this.offscreenContext.beginPath();
                pathGenerator(feature);
                this.offscreenContext.stroke();
            });
        });
    }

    static drawColorScale() {
        const colorScaleDiv = document.getElementById('colorScale');

        const scaleWidth = window.innerWidth - 75;
        const scaleHeight = colorScaleDiv.offsetHeight;

        colorScaleDiv.style.width = `${scaleWidth}px`;
        const canvas = document.createElement('canvas');
        canvas.width = scaleWidth;
        canvas.height = scaleHeight;

        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, scaleWidth, 0);

        this.colorLookup.forEach((color, index) => {
            const position = index / 100;
            gradient.addColorStop(position, color);
        });

        context.fillStyle = gradient;
        context.fillRect(0, 0, scaleWidth, scaleHeight);

        context.fillStyle = 'white';
        context.font = '14px Arial';

        context.textAlign = 'left';
        context.fillText('0 m/s', 5, scaleHeight - 5);
        context.textAlign = 'right';
        context.fillText(`${Math.round(VectorGrid.maxWindSpeed)} m/s`, scaleWidth - 5, scaleHeight - 5);

        colorScaleDiv.style.backgroundImage = `url(${canvas.toDataURL()})`;
    }



}
