class CanvasManager {
    static context;
    static canvas;
    static bgcolor;
    static attenuationSpeed;
    static zoomScale = 1;
    static zoomStep = 0.1;
    static offsetX = 0;
    static offsetY = 0;
    static lastX = 0;
    static lastY = 0;
    static isDragging = false;

    static create(width, height, color, speedAttenuationSpee) {
        this.canvas = document.createElement("canvas");
        this.canvas.className = "simulation";
        this.context = this.canvas.getContext("2d");
        this.bgcolor = color;
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.attenuationSpeed = speedAttenuationSpee;

        this.canvas.addEventListener('mousedown', this.mouseDown);
        this.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvas.addEventListener('mouseup', this.mouseUp);
        this.canvas.addEventListener('mouseout', this.mouseUp);
        this.canvas.addEventListener('wheel', this.handleWheel, {passive: false});
    }

    static applyTransformations() {
        ParticleSystem.updateParticlePositions();
        CanvasManager.resetBackground();
    }

    static resetBackground() {
        CanvasManager.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        CanvasManager.context.globalAlpha = 1.0;
        const sourceX = -CanvasManager.offsetX / CanvasManager.zoomScale;
        const sourceY = -CanvasManager.offsetY / CanvasManager.zoomScale;
        const sourceWidth = CanvasManager.canvas.width / CanvasManager.zoomScale;
        const sourceHeight = CanvasManager.canvas.height / CanvasManager.zoomScale;

        CanvasManager.context.drawImage(
            BackgroundCanvas.offscreenCanvas,  // Image source
            sourceX, sourceY,                 // Coordonnées du coin supérieur gauche du sous-rectangle de la source
            sourceWidth, sourceHeight,        // Largeur et hauteur du sous-rectangle de la source
            0, 0,                             // Coordonnées du coin supérieur gauche de la destination
            CanvasManager.canvas.width, CanvasManager.canvas.height  // Largeur et hauteur de la destination
        );
    }


    static updateAttenuationSpeed(vitesseAttenuationTrace) {
        this.attenuationSpeed = vitesseAttenuationTrace;
    }



    static handleWheel(event) {
        Simulation.pause = true;
        if (event.deltaY < 0) {
            CanvasManager.zoomIn();
        } else {
            CanvasManager.zoomOut();
        }
        event.preventDefault();
        Simulation.pause = false;
    }


    static zoomIn() {
        const centerX = CanvasManager.canvas.width / 2;
        const centerY = CanvasManager.canvas.height / 2;
        const newZoomScale = CanvasManager.zoomScale * 1.1;
        CanvasManager.adjustOffsets(centerX, centerY, newZoomScale);
        CanvasManager.zoomScale = newZoomScale;
        CanvasManager.applyTransformations();
    }

    static zoomOut() {
        if (CanvasManager.zoomScale > 1) {
            const centerX = CanvasManager.canvas.width / 2;
            const centerY = CanvasManager.canvas.height / 2;
            const newZoomScale = Math.max(CanvasManager.zoomScale * 0.9, 1);
            CanvasManager.adjustOffsets(centerX, centerY, newZoomScale);
            CanvasManager.zoomScale = newZoomScale;
            CanvasManager.applyTransformations();
        }
    }

    static adjustOffsets(centerX, centerY, newZoomScale) {
        const zoomRatio = newZoomScale / CanvasManager.zoomScale;
        CanvasManager.offsetX = (CanvasManager.offsetX - centerX) * zoomRatio + centerX;
        CanvasManager.offsetY = (CanvasManager.offsetY - centerY) * zoomRatio + centerY;
    }

    static mouseDown(event) {
        CanvasManager.lastX = event.clientX;
        CanvasManager.lastY = event.clientY;
        CanvasManager.isDragging = true;
        Simulation.pause = true;
    }

    static mouseMove(event) {
        if (CanvasManager.isDragging) {
            const dx = event.clientX - CanvasManager.lastX;
            const dy = event.clientY - CanvasManager.lastY;

            CanvasManager.offsetX += dx;
            CanvasManager.offsetY += dy;

            CanvasManager.lastX = event.clientX;
            CanvasManager.lastY = event.clientY;

            CanvasManager.applyTransformations();
        }
    }

    static mouseUp() {
        CanvasManager.isDragging = false;
        Simulation.pause = false;
    }


    static getVisibleArea(){
        const topLeftCorner  = {
            x : 0,
            y : 0
        }
        const bottomRightCorner = {
            x : 0,
            y : 0
        }

        if(this.offsetX < 0) {
            topLeftCorner.x = -this.offsetX/this.zoomScale;

        }
        bottomRightCorner.x = Math.min((this.canvas.width-this.offsetX)/this.zoomScale, this.canvas.width);
        if(this.offsetY < 0) {
            topLeftCorner.y = -this.offsetY/this.zoomScale;
        }
        bottomRightCorner.y = Math.min((this.canvas.height-this.offsetY)/this.zoomScale, this.canvas.height);


        return {
            topLeftCorner,
            bottomRightCorner
        }
    }

}

