/**
 * Nocp Startpage
 * Copyright (c) NriotHrreion 2020
 *
 * Thank you for your use.
 * If the startpage has bug, please tell me on github, I'll fix it!
 *
 * @author NriotHrreion
 * @license Apache-2.0
 */

/// <reference types="chrome">

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
        var flag = false;

        chrome.bookmarks.getTree(function(tree) {
            var bookmark = tree[0]["children"][0]["children"];

            for(let i in bookmark) {
                if(bookmark[i].url == result.url) {
                    flag = true;
                }
            }
        });

        setTimeout(() => {
            if(result.url == "chrome://newtab/") {
                check = false;
            }
    
            if(result.icon == "" || result.icon == undefined) {
                check = false;
            }
    
            for(let i in favicons) {
                if(isObjEqual(favicons[i], result)) {
                    check = false;
                }
            }
    
            if(check && flag) {
                favicons[favicons.length] = result;
                chrome.storage.local.set({favicons: favicons});
            }
        }, 50);
    });
});

utils.copy();
