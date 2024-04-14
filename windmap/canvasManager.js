class CanvasManager {
    static context;
    static canvas;
    static bgcolor;
    static speedAttenuationSpeed;

    static create(width, height, color, speedAttenuationSpee) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.bgcolor = color;
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.context.fillStyle = this.bgcolor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.speedAttenuationSpeed = speedAttenuationSpee;
    }

    static resetBackground() {
        CanvasManager.context.globalAlpha = 1.0;
        CanvasManager.context.drawImage(BackgroundCanvas.offscreenCanvas, 0, 0, CanvasManager.canvas.width, CanvasManager.canvas.height);
    }

    static updateAttenuationSpeed(vitesseAttenuationTrace) {
        this.speedAttenuationSpeed = vitesseAttenuationTrace;
    }
}
