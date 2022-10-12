import { TimerStatus } from "./enum.js";
import Timer from "./Timer.js";

"use strict";

//#region HTML Elements
const timerDisplay = document.getElementById("timer");
const mainButton = document.getElementById("button__primary");
const auxiliarButton = document.getElementById("button__secondary");
const lapList = document.getElementById("lap__list");
//#endregion

//#region Event Listeners
const timer = new Timer().reset();

mainButton.addEventListener("click", function (e) {
    if(timer.status === TimerStatus.RUNNING) {
        // pause
        timer.pause();
        mainButton.classList.remove("button__stop");
        mainButton.innerText = "Resume";
        auxiliarButton.innerText = "Reset";
    } else {
        // running
        timer.start(timerDisplay);
        mainButton.classList.add("button__stop");
        mainButton.innerText = "Stop";
        auxiliarButton.innerText = "Lap";
    }
    auxiliarButton.removeAttribute("disabled");
});

auxiliarButton.addEventListener("click", function(e) {
    if(timer.status === TimerStatus.PAUSED) {
        // reset
        timer.reset();
        timer.display(timerDisplay);
        mainButton.innerText = "Start";
        auxiliarButton.innerText = "Lap";
        auxiliarButton.disabled = true;
        lapList.innerHTML = "";
        timerDisplay.parentElement.classList.remove("lap");
    } else {
        // create lap
        timerDisplay.parentElement.classList.add("lap");
        timer.createLap(lapList);
    }
});
//#endregion