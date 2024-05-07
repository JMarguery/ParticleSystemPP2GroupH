class CanvasManager {
    static context;
    static canvas;
    static bgcolor;
    static zoomScale = 1;
    static zoomStep = 0.1;
    static offsetX = 0;
    static offsetY = 0;
    static lastX = 0;
    static lastY = 0;
    static isDragging = false;
    static visibleTopLeftCorner;
    static visibleBottomRightCorner;


    static create(width, height, color,parent) {
        this.canvas = document.createElement("canvas");
        this.canvas.className = "simulation";
        this.canvas.id = "simulation";
        this.context = this.canvas.getContext("2d");
        this.bgcolor = color;
        this.canvas.width = width;
        this.canvas.height = height;
        parent.appendChild(this.canvas);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.visibleTopLeftCorner = {x: 0, y:0};
        this.visibleBottomRightCorner = {x: width, y:height};

        this.mouseDown = this.mouseDown.bind(this);
        this.canvas.addEventListener('mousedown', this.mouseDown);
        this.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvas.addEventListener('mouseup', this.mouseUp);
        this.canvas.addEventListener('mouseout', this.mouseUp);
        this.canvas.addEventListener('contextmenu', this.preventContextMenu);
        this.canvas.addEventListener('wheel', this.handleWheel, {passive: false});
    }


    static drawCross(x, y) {
        CanvasManager.context.beginPath();
        CanvasManager.context.moveTo(x - 10, y);
        CanvasManager.context.lineTo(x + 10, y);
        CanvasManager.context.moveTo(x, y - 10);
        CanvasManager.context.lineTo(x, y + 10);
        CanvasManager.context.stroke();
    }

    static applyTransformations() {
        CanvasManager.getVisibleArea();
        Simulation.updateParticlePositions();
        CanvasManager.resetBackground();
    }

    static resetBackground() {
        CanvasManager.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        CanvasManager.context.globalAlpha = 1.0;
        CanvasManager.drawMovedBackground();
    }

    static drawMovedBackground(){
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

    static drawAttenuatedBackground(){
        CanvasManager.context.globalAlpha = Simulation.attenuationSpeed;
        CanvasManager.drawMovedBackground();
        CanvasManager.context.globalAlpha = 1.0;
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
        const newZoomScale = CanvasManager.zoomScale * (1+CanvasManager.zoomStep);
        CanvasManager.adjustOffsets(centerX, centerY, newZoomScale);
        CanvasManager.zoomScale = newZoomScale;
        CanvasManager.applyTransformations();
    }

    static zoomOut() {
        if (CanvasManager.zoomScale > 0.4) {
            const centerX = CanvasManager.canvas.width / 2;
            const centerY = CanvasManager.canvas.height / 2;
            const newZoomScale = Math.max(CanvasManager.zoomScale *(1-CanvasManager.zoomStep), 0.4);
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
        const canvas = document.querySelector('canvas');
        const rect = canvas.getBoundingClientRect();

        const realWidth = rect.width;
        const realHeight = rect.height;

        const internalWidth = canvas.width;
        const internalHeight = canvas.height;

        const scaleX = internalWidth / realWidth;
        const scaleY = internalHeight / realHeight;

        let mouseX = (event.clientX - rect.left) * scaleX;
        let mouseY = (event.clientY - rect.top) * scaleY ;

        if (event.button === 0) {
            CanvasManager.lastX = mouseX;
            CanvasManager.lastY = mouseY;
            CanvasManager.isDragging = true;
            Simulation.pause = true;
        } else if (event.button === 2) {
            CanvasManager.getVisibleArea();
            console.log(mouseX);
            console.log(mouseY);

            CanvasManager.preventContextMenu(event);
            if (mouseX > CanvasManager.visibleTopLeftCorner.x && mouseX < CanvasManager.visibleBottomRightCorner.x) {
                if (mouseY > CanvasManager.visibleTopLeftCorner.y && mouseY < CanvasManager.visibleBottomRightCorner.y) {
                    const vecteurVent = VectorGrid.getVecteurWithInterpolation(mouseX, mouseY);
                    CanvasManager.drawCross(mouseX, mouseY);
                    displaySpeedOnScale(Math.sqrt(vecteurVent.x**2 + vecteurVent.y**2));
                }
            }
        }
    }

    static mouseMove(event) {
        if (CanvasManager.isDragging) {
            const canvas = document.querySelector('canvas');
            const rect = canvas.getBoundingClientRect();

            const realWidth = rect.width;
            const realHeight = rect.height;

            const internalWidth = canvas.width;
            const internalHeight = canvas.height;

            const scaleX = internalWidth / realWidth;
            const scaleY = internalHeight / realHeight;

            let mouseX = (event.clientX - rect.left) * scaleX;
            let mouseY = (event.clientY - rect.top) * scaleY;

            const dx = mouseX - CanvasManager.lastX;
            const dy = mouseY - CanvasManager.lastY;

            CanvasManager.offsetX += dx;
            CanvasManager.offsetY += dy;

            CanvasManager.lastX = mouseX;
            CanvasManager.lastY = mouseY;

            CanvasManager.applyTransformations();
        }
    }


    static mouseUp() {
        CanvasManager.isDragging = false;
        Simulation.pause = false;
    }


    static getVisibleArea(){
        const visibleTopLeftCorner  = {
            x : 0,
            y : 0
        }
        const visibleBottomRightCorner = {
            x : 0,
            y : 0
        }

        if(this.offsetX < 0) {
            visibleTopLeftCorner.x = -this.offsetX/this.zoomScale;
        }
        visibleBottomRightCorner.x = Math.min((this.canvas.width-this.offsetX)/this.zoomScale, this.canvas.width);
        if(this.offsetY < 0) {
            visibleTopLeftCorner.y = -this.offsetY/this.zoomScale;
        }
        visibleBottomRightCorner.y = Math.min((this.canvas.height-this.offsetY)/this.zoomScale, this.canvas.height);

        visibleTopLeftCorner.x = (visibleTopLeftCorner.x* CanvasManager.zoomScale) + CanvasManager.offsetX;
        visibleTopLeftCorner.y = (visibleTopLeftCorner.y* CanvasManager.zoomScale) + CanvasManager.offsetY;
        visibleBottomRightCorner.x = (visibleBottomRightCorner.x* CanvasManager.zoomScale) + CanvasManager.offsetX;
        visibleBottomRightCorner.y = (visibleBottomRightCorner.y* CanvasManager.zoomScale) + CanvasManager.offsetY;


        this.visibleTopLeftCorner = visibleTopLeftCorner;
        this.visibleBottomRightCorner = visibleBottomRightCorner;

    }

    static preventContextMenu(event) {
        event.preventDefault();
    }

}
