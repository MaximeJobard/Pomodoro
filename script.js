//HTML elements
let start = document.getElementById("start");
let reset = document.getElementById("reset");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let indicator = document.getElementById("indicator");
let setting = document.getElementById("setting");
let ok = document.getElementById("ok");
let infoWork = document.getElementById("infoWork");
let infoPause = document.getElementById("infoPause");
let minWork = document.getElementById("minWork");
let minPause = document.getElementById("minPause");
let timerDisplay = document.querySelector(".timer");
let mode = document.querySelector(".mode");

const url = new URLSearchParams(window.location.search);
let setWork = url.get('minWork');
let setPause = url.get('minPause');

// let monStockage = localStorage;
// let setWork = monStockage.getItem("setWork");
// let setPause = monStockage.getItem("setPause");

if(setWork == null){
    setWork = 25;
    setPause = 5;
}

if(parseInt(setWork) >= 10){
    minutes.textContent = setWork;
}else{
    minutes.textContent = "0" + setWork;
}


function timer(){
    if(parseInt(seconds.textContent) == 0){
        if(parseInt(minutes.textContent) > 0){
            minutes.textContent = parseInt(minutes.textContent) - 1;
            seconds.textContent = 60;
        }
        else{
            if(indicator.textContent == "Phase : Working"){
                minutes.textContent = setPause;
                seconds.textContent = "0";
                document.body.style.backgroundColor = 'green';
                timerDisplay.style.backgroundColor = "rgb(0, 150, 0)";
                mode.style.backgroundColor = "rgb(0, 150, 0)";
                indicator.textContent = "Phase : Break";
            }
            else{
                minutes.textContent = setWork;
                seconds.textContent = "0";
                document.body.style.backgroundColor = 'rgb(200, 0, 0)';
                timerDisplay.style.backgroundColor = "rgb(230, 0, 0)";
                mode.style.backgroundColor = "rgb(230, 0, 0)";
                indicator.textContent = "Phase : Working";
            }
        }
    }

    if(parseInt(seconds.textContent) > 0){
        seconds.textContent = parseInt(seconds.textContent) - 1;
    }

    if(parseInt(seconds.textContent) < 10){
        seconds.textContent = "0" + seconds.textContent;
    }

    if(parseInt(minutes.textContent) < 10){
        minutes.textContent = "0" + parseInt(minutes.textContent);
    }
}


start.addEventListener('click', () => {
    reset.style.display = 'block';
    start.style.display = 'none';
    setting.style.display = 'none';
    setInterval(timer, 1000);
});

reset.addEventListener('click', () => {
    if(confirm("Do you want reset the timer ?")){
        window.location.reload();
    }
});

setting.addEventListener('click', () => {
    start.style.display = 'none';
    setting.style.display = 'none';
    minWork.style.display = 'block';
    minPause.style.display = 'block';
    ok.style.display = 'block';
    infoWork.style.display = 'block';
    infoPause.style.display = 'block';
    minWork.setAttribute('value', setWork.toString());
    minPause.setAttribute('value', setPause.toString());
});

ok.addEventListener('click', () => {
    if(minWork.value >= 1 && minPause.value >= 1){
        if(parseInt(minWork.value) >= 10){
            minutes.textContent = minWork.value;
        }else{
            minutes.textContent = "0" + minWork.value;
        }

        start.style.display = 'block';
        setting.style.display = 'block';
        minWork.style.display = 'none';
        minPause.style.display = 'none';
        ok.style.display = 'none';
        infoWork.style.display = 'none';
        infoPause.style.display = 'none';
        
        setWork = parseInt(minWork.value);
        setPause = parseInt(minPause.value);
        minutes.textContent = parseInt(minWork.value);

        // monStockage.setItem("setWork");
        // monStockage.setItem("setPause");
    }
    else{
        alert("Values ​​must be positive")
    }
});