/**
 * Nocp Startpage
 * Copyright (c) NriotHrreion 2020
 *
 * Thank you for your use.
 * If the startpage has bug, please tell me on github, I'll fix it!
 *
 * License: Apache-2.0
 */
document.title = chrome.i18n.getMessage("tab");
document.getElementById("account").title = chrome.i18n.getMessage("title_2");
document.getElementById("more").title = chrome.i18n.getMessage("title_3");
document.getElementById("m-tit").innerHTML = chrome.i18n.getMessage("more");
document.getElementById("sbox").title = chrome.i18n.getMessage("title_1");

preload("https://api.misakal.xyz/Bing-Image");

// Edge
var ua = navigator.userAgent.toLocaleLowerCase();
var logobox = document.getElementById("lb");
if(ua.indexOf("edg") > -1) {
    var edgstyle = document.createElement("link");
    edgstyle.rel = "stylesheet";
    edgstyle.href = "./css/edg.css";
    document.head.appendChild(edgstyle);
    logobox.title = "Microsoft";
}

// Search Engine
var engine;

chrome.storage.local.get({searchEngine: "google"}, function(data) {
    if(data.searchEngine == "google") {
        engine = chrome.i18n.getMessage("searchbox_google");
        document.getElementById("s").placeholder = chrome.i18n.getMessage("searchbox_google");
    } else if(data.searchEngine == "baidu") {
        engine = chrome.i18n.getMessage("searchbox_baidu");
        document.getElementById("s").placeholder = chrome.i18n.getMessage("searchbox_baidu");
    } else if(data.searchEngine == "bing") {
        engine = chrome.i18n.getMessage("searchbox_bing");
        document.getElementById("s").placeholder = chrome.i18n.getMessage("searchbox_bing");
    } else if(data.searchEngine == "sogou") {
        engine = chrome.i18n.getMessage("searchbox_sogou");
        document.getElementById("s").placeholder = chrome.i18n.getMessage("searchbox_sogou");
    } else {
        engine = chrome.i18n.getMessage("searchbox_google");
        document.getElementById("s").placeholder = chrome.i18n.getMessage("searchbox_google");
    }
});

document.onkeydown = function (f) {
    var d = window.event || f;
    var c = d.keyCode || d.which || d.charCode;
    if (c == 13) {
        if (document.getElementById("s").value != "") {
            var a = document.getElementById("s").value;
            var b = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|[fF][tT][pP]:\/\/)+(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            if (!b.test(a)) {
                chrome.storage.local.get({searchEngine: "google"}, function(data) {
                    switch(data.searchEngine) {
                        case "google":
                            window.location.href = "https://google.com/search?safe=active&q="+ a +"&oq="+ a +"&sourceid=chrome&ie=utf-8";
                            break;
                        case "baidu":
                            window.location.href = "https://baidu.com/s?wd="+ a +"&ie=utf-8";
                            break;
                        case "bing":
                            window.location.href = "https://bing.com/search?q="+ a +"&qs=n";
                            break;
                        case "sogou":
                            window.location.href = "https://sogou.com/web?query="+ a +"&_asf=www.sogou.com";
                            break;
                    }
                });
            } else {
                window.location.href = a;
            }
        }
    }
};
document.querySelector(".background").style.opacity = "1";
chrome.storage.local.get({bgimg: true, imgurl: "image/bg.jpg"}, function (a) {
    if (a.bgimg == true) {
        document.querySelector(".background").style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(https://api.misakal.xyz/Bing-Image)";
    } else if(a.bgimg == false) {
        var bgstyle = 
`.background{
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${a.imgurl});
}`;
        var blob = new Blob([bgstyle], {type: "text/css;charset=utf-8"});
        var fr = new FileReader();
        fr.readAsDataURL(blob);
        fr.onload = function() {
            var importstyle = document.createElement("link");
            importstyle.rel = "stylesheet";
            importstyle.type = "text/css";
            importstyle.href = this.result;
            document.head.appendChild(importstyle);
        };
    }
});
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
document.addEventListener("visibilitychange", function () {
    var a = document.hidden;
    if (a) {
        chrome.browserAction.setBadgeText({
            text: "off"
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: [192, 0, 0, 111]
        });
        chrome.contextMenus.update("newpage", {
            visible: true
        })
    } else {
        chrome.browserAction.setBadgeText({
            text: "on"
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: [74, 111, 100, 34]
        });
        chrome.contextMenus.update("newpage", {
            visible: false
        })
    }
});
window.onbeforeunload = function () {
    chrome.browserAction.setBadgeText({
        text: "off"
    });
    chrome.browserAction.setBadgeBackgroundColor({
        color: [192, 0, 0, 111]
    });
    chrome.contextMenus.update("newpage", {
        visible: true
    })
};
chrome.browserAction.setBadgeText({
    text: "on"
});
chrome.browserAction.setBadgeBackgroundColor({
    color: [74, 111, 100, 34]
});
chrome.contextMenus.update("newpage", {
    visible: false
});
document.getElementById("s").onfocus = function() {
    this.placeholder = "";
}
document.getElementById("s").onblur = function() {
    this.placeholder = engine;
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
