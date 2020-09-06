"use strict";

var vbtn = document.getElementById("voice-s");
var vinput = document.getElementById("s");
var vlang = window.navigator.language;

var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.lang = vlang;

recognition.onresult = function(res) {
    if(res.results && res.results[0][0]) {
        if(res.results[0][0].isFinal) {
            recognition.stop();
        }
        
        vinput.focus();
        vinput.value = res.results[0][0].transcript;
    }
};

recognition.onspeechend = function() {
    console.log("Speech Stopped");
};

vbtn.onclick = function() {
    recognition.start();
};
