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


function isInstalled() {
    // For iOS
    if(window.navigator.standalone) return true
    
    // For Android
    if(window.matchMedia('(display-mode: standalone)').matches) return true
    
    // If neither is true, it's not installed
    return false
}

if(isInstalled())
    installButton.remove()