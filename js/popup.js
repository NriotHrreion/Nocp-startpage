/**
 * Locale
 */
document.getElementById("description").innerHTML = chrome.i18n.getMessage("description");
document.getElementById("opt_1").innerHTML = chrome.i18n.getMessage("opt_1");


var on = document.getElementById("on");
var off = document.getElementById("off");
chrome.storage.local.get({bgimg: true}, function(data) {
    if(data.bgimg == true) {
        on.style.display = "block";
        off.style.display = "none";
    } else if(data.bgimg == false) {
        on.style.display = "none";
        off.style.display = "block";
    }
});
on.onclick = function() {
    on.style.display = "none";
    off.style.display = "block";
    chrome.storage.local.set({bgimg: false});
    chrome.notifications.create({
        type: "basic",
        iconUrl: "../icon.png",
        title: "Info",
        message: chrome.i18n.getMessage("info_1")
    });
}
off.onclick = function() {
    on.style.display = "block";
    off.style.display = "none";
    chrome.storage.local.set({bgimg: true});
    chrome.notifications.create({
        type: "basic",
        iconUrl: "../icon.png",
        title: "Info",
        message: chrome.i18n.getMessage("info_1")
    });
}
