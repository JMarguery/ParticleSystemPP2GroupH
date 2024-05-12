class MapElection {
    static latMax = 41.8719;
    static latMin = 51.2301;

    static offsetYMin;
    static offsetYMax;
    img;
    pos;
    echelleX;
    echelleY;
    offsetX;
    //offsetYMin;
    //offsetYMax;

    constructor(imgPath,echelleX,echelleY,offsetX,offsetYMin,offsetYMax){
        this.img = new Image();
        this.img.src=imgPath;
        this.img.onload = function () {
            (CanvasManager.context.drawImage(this,0,0));
        }
        this.echelleX = echelleX;
        this.echelleY = echelleY;
        this.offsetX =offsetX;
        MapElection.offsetYMin =offsetYMin;
        MapElection.offsetYMax =offsetYMax;
    }

    draw(){
        CanvasManager.context.drawImage(this.img,0,0);
    }

    latlonToPoint(lat,lon){
        let x=(lon +this.offsetX) * this.echelleX
        let y=(this.offsetY-lat)* this.echelleY
        return {
            "x":x,
            "y":y
        }
    }

    getPointsFromCsvUrl(url){
        fetch(url)
            .then(response=>response.text())
            .then(csvi => {
                var lines = csvi.split('\n');
                var data = {};
                let offX = this.offsetX;
                let echX = this.echelleX;
                let echY = this.echelleY;
                lines.forEach(function(line) {
                    var values = line.split(',');
                    let lat = values[4];
                    let offY = (MapElection.offsetYMin) + (MapElection.offsetYMax - MapElection.offsetYMin) * ((lat - MapElection.latMin) / (MapElection.latMax - MapElection.latMin));
                    let lon = values[5];
                    if(lon<2.34){
                        offY += 0.1534*(lon-2.34)/((-5.3737)-2.34);
                    }
                    data[values[0]]=[
                        ((parseFloat(lon)+offX)*echX),
                        ((offY-lat)* echY)
                    ];
                });
                this.pos = data;
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