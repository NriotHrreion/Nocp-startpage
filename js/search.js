/**
 * @author NriotHrreion
 * @license Apache-2.0
 */
/**
 * Locale
 */
document.title = chrome.i18n.getMessage("tab");
document.getElementById("s").placeholder = chrome.i18n.getMessage("searchbox");
document.getElementById("account").title = chrome.i18n.getMessage("title_2");
document.getElementById("more").title = chrome.i18n.getMessage("title_3");
document.getElementById("m-tit").innerHTML = chrome.i18n.getMessage("more");
document.getElementById("sbox").title = chrome.i18n.getMessage("title_1");


document.onkeydown = function(e) {
    var event = window.event || e;
    var code = event.keyCode || event.which || event.charCode;
    if(code == 13) {
        var search = document.getElementById("s").value;
        var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|[fF][tT][pP]:\/\/)+(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if(!reg.test(search)) {
            window.location.href = "https://baidu.com/s?wd="+ search;
        } else {
            window.location.href = search;
        }
    }
}

chrome.storage.local.get({bgimg: true}, function(data) {
    if(data.bgimg == true) {
        //data from https://cn.bing.com
        document.querySelector("body").style.backgroundImage = "url(https://api.misakal.xyz/Bing-Image)";
    } else if(data.bgimg == false) {
        document.querySelector("body").style.backgroundImage = "url(image/bg.jpg)";
    }
});

var morestat = 0;
var more = document.getElementById("more-item");
document.getElementById("more").onclick = function() {
    if(morestat == 0) {
        more.style.display = "block";
        up(more, 400);
        morestat = 1;
    } else if(morestat == 1) {
        // more.style.display = "none";
        down(more, 400);
        morestat = 0;
    }
}
document.addEventListener('visibilitychange',function(){
    var isHidden = document.hidden;   
    if(isHidden){
        chrome.browserAction.setBadgeText({text: "off"});
        chrome.browserAction.setBadgeBackgroundColor({color: [192, 0, 0, 111]});
        chrome.contextMenus.update("newpage", {
            visible: true
        });
    } else {
        chrome.browserAction.setBadgeText({text: "on"});
        chrome.browserAction.setBadgeBackgroundColor({color: [74, 111, 100, 34]});
        chrome.contextMenus.update("newpage", {
            visible: false
        });
    }
});
window.onbeforeunload = function() {
    chrome.browserAction.setBadgeText({text: "off"});
    chrome.browserAction.setBadgeBackgroundColor({color: [192, 0, 0, 111]});
    chrome.contextMenus.update("newpage", {
        visible: true
    });
}
chrome.browserAction.setBadgeText({text: "on"});
chrome.browserAction.setBadgeBackgroundColor({color: [74, 111, 100, 34]});
chrome.contextMenus.update("newpage", {
    visible: false
});

/**
 * 
 * @param {Object} elem 
 * @param {Number} level - Opacity level 
 */
function setOpacity(elem, level) {
    if(elem.filters) {
        elem.style.filter = "alpha(opacity="+ level +")";
    } else {
        elem.style.opacity = level / 100;
    }
}

/**
 * 
 * @param {Object} element
 * @param {Number} time - ms 
 */
function up(element, time) {
    var totalHeight = element.offsetHeight;
    element.style.height = "0px";
    var currentHeight = 0;
    var increment = totalHeight / (time/10);
    var timer = setInterval(function () {
        currentHeight = currentHeight + increment;
        element.style.height = currentHeight + "px";
        if (currentHeight >= totalHeight) {
            clearInterval(timer);
            element.style.height = totalHeight + "px";
        }
    }, 10);
}
function down(element, time) {
    var totalHeight = element.offsetHeight;
    var currentHeight = totalHeight;
    var decrement = totalHeight/ (time/10);
    var timer = setInterval(function() {
        currentHeight = currentHeight - decrement;
        element.style.height = currentHeight + "px";
        if (currentHeight <= 0) {
            clearInterval(timer);
            element.style.display = "none";
            element.style.height = totalHeight + "px";
        }
    }, 10);
}