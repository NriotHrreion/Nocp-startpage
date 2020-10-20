var vbtn = document.getElementById("voice-s");
var vinput = document.getElementById("s");
var vlang = window.navigator.language;

vbtn.onclick = function() {
    var speech = Uin({mode: "speech", conf: {lang: vlang}});
    speech.load(function(result) {
        vinput.focus();
        vinput.value = result;
    });
    speech.on("speechend", function() {
        console.log("Speech Stopped");
    });
};
