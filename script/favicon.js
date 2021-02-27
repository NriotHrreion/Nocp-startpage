/// <reference types="chrome">

var url = window.location.search;

if(url != "" && navigator.onLine) {
    url = url.replace("?url=", "");
    chrome.storage.local.get({favicons: []}, function(data) {
        var favicons = data.favicons;

        for(let i in favicons) {
            if(favicons[i].url == url && favicons[i].icon != undefined) {
                document.querySelector("img").src = favicons[i].icon;
            }
        }
    });
}
