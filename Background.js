class Map {

    img;
    pos;
    echelleX;
    echelleY;
    offsetX;
    offsetY;

    constructor(imgPath,echelleX,echelleY,offsetX,offsetY){
        this.img = new Image();
        this.img.src=imgPath;
        this.echelleX = echelleX;
        this.echelleY = echelleY;
        this.offsetX =offsetX;
        this.offsetY =offsetY;
    }

    draw(){
        CanvasManager.context.drawImage(this.img,0,0);
    }

    latlonToPoint(lat,lon){
        let x=(lon +this.offsetX) * this.echelleX
        let y=(this.offsetY-lat)* this.echelleY
        console.log("")
        return {
            "x":x,
            "y":y
        }  
    }

    getPointsFromCsvUrl(url){
        console.log("url");
        fetch(url)
            .then(response=>response.text())
            .then(csvi => {
                var lines = csvi.split('\n');
                var data = {};
                let offX = this.offsetX;
                let offY = this.offsetY;
                let echX = this.echelleX;
                let echY = this.echelleY;
                lines.forEach(function(line) {
                    var values = line.split(',');
                    let lat = values[4];
                    let lon = values[5];
                    data[values[0]]=[
                        ((parseFloat(lon)+offX)*echX),
                        ((offY-lat)* echY)
                    ];
                });
                this.pos = data;
                console.log(this.pos);
            })
    }

    getArrayPointsFromCsvUrl(url){
        fetch(url)
            .then(response=>response.text())
            .then(csvi => {
                var lines = csvi.split('\n');
                var data = [];
                let offX = this.offsetX;
                let offY = this.offsetY;
                let echX = this.echelleX;
                let echY = this.echelleY;
                lines.forEach(function(line) {
                    var values = line.split(',');
                    let lat = values[4];
                    let lon = values[5];
                    data.push([
                        ((parseFloat(lon)+offX)*echX),
                        ((offY-lat)* echY)
                    ]);
                });
                this.pos=data;
            })
    }

    getPos(){
        return this.pos;
    }


}