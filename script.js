// ==UserScript==
// @name         Spotify Collapsible UI
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *://open.spotify.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=open.spotify.com
// @grant        none
// ==/UserScript==

let origWidth, channels, bottombar, overflowText, i, origHeight, playButton, libraryButton;

function displayText(e) {
    if (e) {
        overflowText[0].style.opacity = 1;
        overflowText[1].style.opacity = 1;
        libraryButton.style.opacity = 1;
    } else {
        overflowText[0].style.opacity = 0;
        overflowText[1].style.opacity = 0;
        libraryButton.style.opacity = 0;
    }
}

function displayControls(e) {
    if (e) {
        playButton.style.opacity = 1;
    } else {
        playButton.style.opacity = 0;
    }
}

function handleChannel(channel, e) {
    if (e == "w") {
        channels.style.transition = "width 0.2s";
        origWidth = channels.offsetWidth;
        channels.style.width = 0 + "px";
    } else if (e == "h") {
        channel.style.transition = "height 0.2s";
        origHeight = channel.offsetHeight;
        channel.style.height = 0 + "px";
    }
}

function initializeText() {
    overflowText = document.querySelectorAll(".bkjCej");
    overflowText[0].style.transition = "opacity 0.3s";
    overflowText[1].style.transition = "opacity 0.3s";
    libraryButton.style.transition = "opacity 0.3s";
}

function checkLibButton() {
    setTimeout(() => {
        overflowText = document.querySelectorAll(".bkjCej");
        if (overflowText[0].innerText == "Home") {
            console.log("detected");
            initializeText();
        }
    }, 100);
}

setTimeout(() => {
    libraryButton = document.querySelectorAll(".Button-sc-1dqy6lx-0")[0];
    libraryButton.onclick = checkLibButton;
    initializeText();
    displayText(false);
    playButton = document.querySelectorAll(".vnCew8qzJq3cVGlYFXRI")[0];
    playButton.style.transition = "opacity 0.3s";
    displayControls(false);

    channels = document.querySelectorAll(".BdcvqBAid96FaHAmPYw_")[0];
    handleChannel(channels, "w");

    bottombar = document.querySelectorAll(".JG5J9NWJkaUO9fiKECMA")[0];
    handleChannel(bottombar, "h");

    window.onmousemove = (event) => {
        if (event.pageX >= 0 && event.pageX <= 30) {
            channels.style.width = origWidth + "px";
            displayText(true);
        }
        if (event.pageY >= window.innerHeight - 30) {
            bottombar.style.height = origHeight + "px";
            displayControls(true);
        }
    };

    channels.onmouseleave = () => {
        channels.style.width = 0 + "px";
        displayText(false);
    };

    bottombar.onmouseleave = () => {
        bottombar.style.height = 0 + "px";
        displayControls(false);
    };
}, 5000);
