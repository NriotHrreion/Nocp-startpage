/**
 * Locale
 */
document.getElementById("description").innerHTML = chrome.i18n.getMessage("description");
document.getElementById("opt_1").innerHTML = chrome.i18n.getMessage("opt_1");
document.getElementById("opt_2").innerHTML = chrome.i18n.getMessage("opt_2");
document.getElementById("opt_3").innerHTML = chrome.i18n.getMessage("opt_3");
document.getElementById("img_default").innerHTML = chrome.i18n.getMessage("img_default");
document.getElementById("img_upload").innerHTML = chrome.i18n.getMessage("img_upload");


var on1 = document.getElementById("on_1");
var off1 = document.getElementById("off_1");

chrome.storage.local.get({bgimg: true}, function(data) {
    if(data.bgimg == true) {
        on1.style.display = "block";
        off1.style.display = "none";
    } else if(data.bgimg == false) {
        on1.style.display = "none";
        off1.style.display = "block";
    }
});

on1.onclick = function() {
    on1.style.display = "none";
    off1.style.display = "block";
    chrome.storage.local.set({bgimg: false});
    chrome.notifications.create({
        type: "basic",
        iconUrl: "../icon.png",
        title: "Info",
        message: chrome.i18n.getMessage("info_1")
    });
    location.href = "chrome://newtab";
};
off1.onclick = function() {
    on1.style.display = "block";
    off1.style.display = "none";
    chrome.storage.local.set({bgimg: true});
    chrome.notifications.create({
        type: "basic",
        iconUrl: "../icon.png",
        title: "Info",
        message: chrome.i18n.getMessage("info_1")
    });
    location.href = "chrome://newtab";
};

var s_selector = document.getElementById("search_selector");

chrome.storage.local.get({}, function(data) {
    if(data.isFirstSet != 1) {
        chrome.storage.local.set({searchEngine: "google", isFirstSet: 1});
    }
});
chrome.storage.local.get({searchEngine: "google"}, function(data) {
    if(typeof data.searchEngine === "string") {
        s_selector.value = data.searchEngine;
    }
});
s_selector.onchange = function() {
    chrome.storage.local.set({searchEngine: this.value, isFirstSet: 1});
    chrome.notifications.create({
        type: "basic",
        iconUrl: "../icon.png",
        title: "Info",
        message: "搜索引擎已切换为"+ this.value
    });
};

new CustomEvent("startpage-by-nriothrreion", {});
document.addEventListener("startpage-by-nriothrreion", function() {});

