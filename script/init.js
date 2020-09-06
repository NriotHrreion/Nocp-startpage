(function(window) {
    chrome.storage.local.get({initStatus: false}, function(data) {
        if(!data.initStatus) {
            init();
            chrome.storage.local.set({initStatus: true});
            window.location.reload();
        }
    });

    function init() {
        chrome.storage.local.set({searchEngine: "google"});
        chrome.storage.local.set({
            history: [
                {text: "Google", url: "https://google.com"},
                {text: "Youtube", url: "https://youtube.com"},
                {text: "Facebook", url: "https://facebook.com"},
                {text: "Instagram", url: "https://instagram.com"}
            ]
        });
    }
})(window);
