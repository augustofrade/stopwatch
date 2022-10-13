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


//#region PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

let deferredPrompt; // Allows to show the install prompt
const installButton = document.getElementById("install-button");

window.addEventListener("beforeinstallprompt", e => {
    console.log("beforeinstallprompt fired");
    // Prevent Chrome 76 and earlier from automatically showing a prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show the install button
    installButton.hidden = false;
    installButton.addEventListener("click", installApp);
});

function installApp() {
    console.log(deferredPrompt)
    // Show the prompt
    deferredPrompt.prompt();
    installButton.disabled = true;
  
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
            console.log("PWA setup accepted");
            installButton.hidden = true;
        } else {
            console.log("PWA setup rejected");
        }
        installButton.disabled = false;
        deferredPrompt = null;
    });
}

window.addEventListener("appinstalled", evt => {
    console.log("appinstalled fired", evt);
  });
//#endregion