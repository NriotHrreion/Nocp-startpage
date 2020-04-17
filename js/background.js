console.log("%cCopyright (c) NriotHrreion 2020", "color: darkred");

chrome.browserAction.setBadgeText({text: "off"});
chrome.browserAction.setBadgeBackgroundColor({color: [192, 0, 0, 111]});
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
chrome.contextMenus.create({
    contexts: [
        "selection"
    ],
    id: "searchtool",
    title: chrome.i18n.getMessage("context_2"),
    onclick: function(param) {
        chrome.tabs.create({
            url: "https://baidu.com/s?wd="+ encodeURI(param.selectionText)
        });
    }
});
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    if(!text) {
        return;
    } else if(text.indexOf("bingimg") > -1) {
        suggest([
            {content: "bingimg on", description: "bingimg on"},
            {content: "bingimg off", description: "bingimg off"}
        ]);
    }
});
chrome.omnibox.onInputEntered.addListener(function(text) {
    if(!text) {
        return;
    } else if(text.indexOf("bingimg") > -1) {
        if(text == "bingimg on") {
            chrome.storage.local.set({bgimg: true});
            chrome.notifications.create({
                type: "basic",
                iconUrl: "../icon.png",
                title: "Info",
                message: chrome.i18n.getMessage("info_1")
            });
        } else if(text == "bingimg off") {
            chrome.storage.local.set({bgimg: false});
            chrome.notifications.create({
                type: "basic",
                iconUrl: "../icon.png",
                title: "Info",
                message: chrome.i18n.getMessage("info_1")
            });
        }
    }
});
