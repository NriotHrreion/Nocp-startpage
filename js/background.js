chrome.browserAction.setBadgeText({text: "off"});
chrome.browserAction.setBadgeBackgroundColor({color: [192, 0, 0, 111]});
chrome.contextMenus.create({
    contexts: [
        "page",
        "frame",
        "image",
        "link",
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
