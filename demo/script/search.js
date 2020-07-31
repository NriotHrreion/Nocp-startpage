/**
 * Nocp Startpage
 * Copyright (c) NriotHrreion 2020
 *
 * Thank you for your use.
 * If the startpage has bug, please tell me on github, I'll fix it!
 *
 * License: Apache-2.0
 */

preload("https://api.misakal.xyz/Bing-Image");

// Edge
var ua = navigator.userAgent.toLocaleLowerCase();
var logobox = document.getElementById("lb");
if(ua.indexOf("edg") > -1) {
    var edgstyle = document.createElement("link");
    edgstyle.rel = "stylesheet";
    edgstyle.href = "../css/edg.css";
    document.head.appendChild(edgstyle);
    logobox.title = "Microsoft";
}

document.onkeydown = function (f) {
    var d = window.event || f;
    var c = d.keyCode || d.which || d.charCode;
    if (c == 13) {
        if (document.getElementById("s").value != "") {
            var a = document.getElementById("s").value;
            var b = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|[fF][tT][pP]:\/\/)+(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            if (!b.test(a)) {
                window.location.href = "https://google.com/search?safe=active&q="+ a +"&oq="+ a +"&sourceid=chrome&ie=utf-8";
            } else {
                window.location.href = a;
            }
        }
    }
};
document.querySelector(".background").style.opacity = "1";
document.querySelector(".background").style.backgroundImage = "url(../image/bg.jpg)";
var morestat = 0;
var more = document.getElementById("more-item");
document.getElementById("more").onclick = function () {
    consoleInfo("Event", this, "event", "no error");
    if (morestat == 0) {
        more.style.display = "block";
        morestat = 1
    } else {
        if (morestat == 1) {
            more.style.display = "none";
            morestat = 0
        }
    }
};
document.getElementById("account").onclick = function () {
    consoleInfo("Event", this, "event", "no error");
};
document.getElementById("s").onfocus = function() {
    this.placeholder = "";
}
document.getElementById("s").onblur = function() {
    this.placeholder = "在Google上搜索，或输入网址";
}

// voice search (annyang.js)
var voicestat = 0;
if(annyang) {
    var commands = {
        "*s": function(s) {
            document.getElementById("s").value = s;
            document.getElementById("s").focus();
        }
    }
}
document.getElementById("voice-s").onclick = function() {
    if(voicestat == 0) {
        annyang.addCommands(commands);
        annyang.setLanguage("zh-cn");
        annyang.start();
        voicestat++;
    } else {
        annyang.pause();
        voicestat--;
    }
}

function setOpacity(a, b) {
    if (a.filters) {
        a.style.filter = "alpha(opacity=" + b + ")"
    } else {
        a.style.opacity = b / 100
    }
}

new CustomEvent("A|startpage-by-nriothrreion", {});
document.addEventListener("A|startpage-by-nriothrreion", function() {});
