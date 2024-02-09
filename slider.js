const sliderUpdateSpeed = document.getElementById("updateSpeed");
const valueUpdateSpeed = document.getElementById("updateSpeedValue");
if(valueUpdateSpeed!=null){
valueUpdateSpeed.innerText = sliderUpdateSpeed.value;
}
const sliderSpawnSpeed = document.getElementById("spawnSpeed");
const valueSpawnSpeed = document.getElementById("spawnSpeedValue");
if(valueSpawnSpeed!=null){
valueSpawnSpeed.innerText = sliderSpawnSpeed.value;
}
const sliderSpreadX = document.getElementById("SpreadX");
const valueSliderSpreadX = document.getElementById("spreadXValue");
if (valueSliderSpreadX!=null){
    valueSliderSpreadX.innerText = sliderSpawnSpeed.value;
}


const sliderSpreadY = document.getElementById("SpreadY");
console.log(sliderSpreadY);
const valueSliderSpreadY = document.getElementById("spreadYValue");

if (valueSliderSpreadY!=null){
    valueSliderSpreadY.innerText = sliderSpawnSpeed.value;
}



if(sliderUpdateSpeed!=null){
    sliderUpdateSpeed.oninput = function() {
        clearInterval(intervalRendu); // Clear the previous interval
        intervalDic.t = parseInt(this.value);
        intervalRendu = setInterval(intervalDic.fun, intervalDic.t);
        valueUpdateSpeed.innerText = this.value;
    }
}
if(sliderSpawnSpeed!=null){
    sliderSpawnSpeed.oninput = function() {
        clearInterval(spawnSpeed); // Clear the previous interval
        spawnDir.t = parseInt(this.value);
        spawnSpeed = setInterval(spawnDir.fun,spawnDir.t);
        valueSpawnSpeed.innerText = this.value
    }
}

if (sliderSpreadX!=null){
    sliderSpreadX.oninput = function() {
        valueSliderSpreadX.innerText = this.value;
    }
}
if (sliderSpreadY!=null){
    sliderSpreadY.oninput = function() {
        valueSliderSpreadY.innerText = this.value;
    }
}



