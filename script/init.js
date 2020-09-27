class Init {
    constructor() {
        this.firstTime();
        // this.init();
    }

    firstTime() {
        chrome.storage.local.get({initStatus: false}, (data) => {
            if(!data.initStatus) {
                this.firstTimeItems();
                chrome.storage.local.set({initStatus: true});
                window.location.reload();
            }
        });
    }

    firstTimeItems() {
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

    init() {
        var widget = window.frames["app-widget"];
        widget.window = undefined;
    }
}
