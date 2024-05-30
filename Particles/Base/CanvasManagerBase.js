class CanvasManagerBase {
    static context;
    static canvas;
    static bgcolor;



    static create(width,height,color,parent) {
        this.canvas = document.createElement("canvas");
        this.canvas.className = "simulation";
        this.canvas.id = "simulation";
        this.context = this.canvas.getContext("2d");
        this.bgcolor = color;
        this.canvas.width = width;
        this.canvas.height = height;
        parent.appendChild(this.canvas);
        this.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    static resetBackground(){
        this.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

}