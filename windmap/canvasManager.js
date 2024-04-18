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

    static resetBackground() {
        CanvasManager.context.globalAlpha = 1.0;
        CanvasManager.context.drawImage(BackgroundCanvas.offscreenCanvas, 0, 0, CanvasManager.canvas.width, CanvasManager.canvas.height);
    }

    static updateAttenuationSpeed(vitesseAttenuationTrace) {
        this.attenuationSpeed = vitesseAttenuationTrace;
    }

    static handleWheel(event) {
        if (event.deltaY < 0) {
            CanvasManager.zoomIn();
        } else {
            CanvasManager.zoomOut();
        }
        event.preventDefault();
    }


    static redraw() {
        const sourceX = -this.offsetX / this.zoomScale;
        const sourceY = -this.offsetY / this.zoomScale;
        const sourceWidth = this.canvas.width / this.zoomScale;
        const sourceHeight = this.canvas.height / this.zoomScale;

        this.context.drawImage(
            BackgroundCanvas.offscreenCanvas,  // Image source
            sourceX, sourceY,                 // Coordonnées du coin supérieur gauche du sous-rectangle de la source
            sourceWidth, sourceHeight,        // Largeur et hauteur du sous-rectangle de la source
            0, 0,                             // Coordonnées du coin supérieur gauche de la destination
            this.canvas.width, this.canvas.height  // Largeur et hauteur de la destination
        );
    }



    static zoomIn() {
        Simulation.pause = true;
        CanvasManager.zoomScale *= 1.1;
        CanvasManager.redraw();
        if (CanvasManager.lastTimeout) {
            clearTimeout(CanvasManager.lastTimeout);
        }
        CanvasManager.lastTimeout = setTimeout(() => {
            Simulation.pause = false;
        }, 500);
    }

    static zoomOut() {
        if (CanvasManager.zoomScale > 1) {
            Simulation.pause = true;
            CanvasManager.zoomScale = Math.max(CanvasManager.zoomScale - CanvasManager.zoomStep, 1);
            CanvasManager.redraw();
            if (CanvasManager.lastTimeout) {
                clearTimeout(CanvasManager.lastTimeout);
            }
            CanvasManager.lastTimeout = setTimeout(() => {
                Simulation.pause = false;
            }, 500);
        }
    }

    static mouseDown(event) {
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        this.isDragging = true;
        Simulation.pause = true;
    }

    static mouseMove(event) {
        if (this.isDragging) {
            const dx = event.clientX - this.lastX;
            const dy = event.clientY - this.lastY;
            this.offsetX += dx;
            this.offsetY += dy;
            CanvasManager.redraw();
            this.lastX = event.clientX;
            this.lastY = event.clientY;
        }
    }

    static mouseUp(event) {
        this.isDragging = false;
        Simulation.pause = false;
    }




}
