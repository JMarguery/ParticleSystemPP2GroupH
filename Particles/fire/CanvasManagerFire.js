class CanvasManager {
    static context;
    static canvas;
    static bgcolor;

    static isRightMouseDown = false;
    static startX = 0;
    static startY = 0;
    static endX =0;
    static endY =0;

    static create(width,height,color,parent) {
        this.canvas = document.createElement("canvas");
        this.canvas.className = "simulation";
        this.canvas.id = "simulation";
        this.context = this.canvas.getContext("2d");
        this.bgcolor = color;
        this.canvas.width = width;
        this.canvas.height = height;
        parent.appendChild(this.canvas);
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.canvas.addEventListener('mousedown', CanvasManager.handleRightMouseDown);
        this.canvas.addEventListener('mouseup', CanvasManager.handleMouseUp);
        this.canvas.addEventListener('mousemove', CanvasManager.handleMouseMove);
        document.addEventListener('contextmenu', CanvasManager.handleContextMenu);
    }

    static resetBackground(){
        this.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    static handleRightMouseDown(event) {
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

        if (event.button === 2) {
            event.preventDefault();
            CanvasManager.isRightMouseDown = true;
            CanvasManager.startX = mouseX;
            CanvasManager.startY = mouseY;
        }
    }

    static handleMouseUp(event) {
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

        if (CanvasManager.isRightMouseDown && event.button === 2) {
            CanvasManager.endX = mouseX;
            CanvasManager.endY = mouseY;
            CanvasManager.isRightMouseDown = false;

            SimulationFire.updateParticlesPosition(CanvasManager.startX,CanvasManager.startY,CanvasManager.endX,CanvasManager.endY);
        }
        event.preventDefault();
    }

    static handleMouseMove(event) {
        if (CanvasManager.isRightMouseDown) {
            event.preventDefault();
        }
    }

    static handleContextMenu(event) {
        event.preventDefault();
    }


    static

}