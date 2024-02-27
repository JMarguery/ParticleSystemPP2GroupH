class Background {

    img;

    constructor(imgPath){
        this.img = new Image();
        this.img.src=imgPath
    }

    draw(){
        CanvasManager.context.drawImage(this.img,0,0);
    }
}