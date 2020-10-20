console.log("%cCopyright (c) NriotHrreion 2020", "color: darkred");

chrome.browserAction.setBadgeText({text: "off"});
chrome.browserAction.setBadgeBackgroundColor({color: [192, 0, 0, 111]});

Array.prototype.indexOf = function(val) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] == val) {
            return i;
        }
    }
    return -1;
};
Array.prototype.remove = function(item) {
    var index = this.indexOf(item);
    if(index > -1) {
        this.splice(index, 1);
    }
};
function isObjEqual(o1, o2) {
    var props1 = Object.getOwnPropertyNames(o1);
    var props2 = Object.getOwnPropertyNames(o2);

    if(props1.length != props2.length) {
        return false;
    }

    for(var i = 0; i < props1.length; i++) {
        var propName = props1[i];
        if(o1[propName] !== o2[propName]) {
            return false;
        }
    }

    return true;
}

chrome.contextMenus.create({
    contexts: [
        "page",
        "frame",
        "image",
        "video",
        "audio"
    ],
    id: "newpage",
    title: chrome.i18n.getMessage("context_1"),
    visible: true,
    onclick: function() {
        chrome.tabs.create({
            url: "chrome://newtab"
        });
    }
});

chrome.tabs.onUpdated.addListener(function(id, info, tab) {
    chrome.storage.local.get({favicons: []}, function(data) {
        var favicons = data.favicons;
        var result = {
            url: tab.url,
            icon: tab.favIconUrl
        };
        var check = true;

        if(result.icon == "" || result.icon == undefined) {
            check = false;
        }

        for(let i in favicons) {
            if(isObjEqual(favicons[i], result)) {
                check = false;
            }
        }

        if(check) {
            favicons[favicons.length] = result;
            chrome.storage.local.set({favicons: favicons});
        }
    });
});

new CustomEvent("startpage-by-nriothrreion", {});
document.addEventListener("startpage-by-nriothrreion", function() {});
