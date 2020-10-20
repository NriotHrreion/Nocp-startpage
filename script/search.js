/**
 * Nocp Startpage
 * Copyright (c) NriotHrreion 2020
 *
 * Thank you for your use.
 * If the startpage has bug, please tell me on github, I'll fix it!
 *
 * License: Apache-2.0
 */

/**
 * Background Page Window Object
 * 
 * @type {Window}
 */
var background = chrome.extension.getBackgroundPage();

class Main {
    constructor() {
        /** @enum */
        this.elements = {
            /** @type {HTMLDivElement} */
            BACKGROUND: utils.$("cls", "background")[0],
            /** @type {HTMLInputElement} */
            SEARCH: utils.$("s"),
            /** @type {HTMLDivElement} */
            MORE: utils.$("more-item"),
            /** @type {HTMLInputElement} */
            NOTE_NEWBOX: utils.$("n-write"),
            /** @type {HTMLButtonElement} */
            NOTE_NEWSUB: utils.$("n-submit"),
            /** @type {HTMLDivElement} */
            NOTE_BODY: utils.$("n-body"),
            /** @type {HTMLImageElement} */
            APPS: utils.$("apps"),
            /** @type {HTMLDivElement} */
            APPS_CONTAINER: utils.$("app-container"),
            /** @type {HTMLSpanElement} */
            APPS_TIMEFORM: utils.$("app-timeform"),
            /** @type {HTMLDivElement} */
            APPS_BODY: utils.$("app-body"),
            /** @type {HTMLDivElement} */
            APPS_BACK: utils.$("app-backhome")
        };

        this.engine = "";
        this.moreBoxStat = 0;
        this.appsBoxStat = 0;

        this.init();
        this.initLocale();
        preload("https://api.misakal.xyz/Bing-Image");
        this.initPage();
    }

    init() {
        chrome.storage.onChanged.addListener((data) => {
            for(var i in data) {
                if(i == "bgimg") {
                    location.reload();
                } else if(i == "notes") {
                    this.listNotes();
                }
            }
        });

        document.addEventListener("visibilitychange", () => {
            var isHidden = document.hidden;
            if(isHidden) {
                this.setBadge(true);
            } else {
                this.setBadge(false);
            }
        });
        window.onbeforeunload = () => {
            this.setBadge(true);
        };
        this.setBadge(false);
    }

    initPage() {

        // Background Image
        this.backgroundImageSet();

        // Edge Theme
        this.edgeThemeSet();

        // Search Engine
        this.searchEngineSet();

        // Search Box
        this.searchBoxSet();

        // Note Box
        this.noteBoxSet();

        // Apps Box
        this.appsBoxSet();
    }

    initLocale() {
        document.title = utils.locale("tab");
        utils.$("account").title = utils.locale("title_2");
        utils.$("more").title = utils.locale("title_3");
        utils.$("n-tit").innerHTML = utils.locale("note");
        utils.$("n-write").placeholder = utils.locale("note_newbox");
        utils.$("n-submit").innerHTML = utils.locale("note_newsub");
        utils.$("s").title = utils.locale("title_1");
        utils.$("voice-s").title = utils.locale("voice_search");
        utils.$("a-tit").innerHTML = utils.locale("apps");
        utils.$("apps").title = utils.locale("apps");
    }

    backgroundImageSet() {
        setTimeout(() => {
            this.elements.BACKGROUND.style.opacity = "1";
        }, 2);

        chrome.storage.local.get({bgimg: false, imgurl: "image/bg.jpg"}, (data) => {
            if(data.bgimg) {
                this.elements.BACKGROUND.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(https://api.misakal.xyz/Bing-Image)";
            } else if(!data.bgimg) {
                var bgstyle = 
`.background{
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${data.imgurl});
}
`;
                var blob = new Blob([bgstyle], {type: "text/css;charset=utf-8"});
                var fr = new FileReader();
                fr.readAsDataURL(blob);
                fr.onload = function() {
                    var importStyle = utils.$new("link");
                    importStyle.rel = "stylesheet";
                    importStyle.type = "text/css";
                    importStyle.href = this.result;
                    document.head.appendChild(importStyle);
                };
            }
        });
    }

    edgeThemeSet() {
        var ua = navigator.userAgent.toLocaleLowerCase();
        var logobox = utils.$("lb");
        if(ua.indexOf("edg") > -1) {
            // stylesheet
            var edgstyle = utils.$new("link");
            edgstyle.rel = "stylesheet";
            edgstyle.href = "./css/edg.css";
            document.head.appendChild(edgstyle);
            logobox.title = "Microsoft";

            // light / dark favicon
            var favicon = utils.$new("link");
            favicon.rel = "icon";
            favicon.id = "favicon-link";
            if(window.matchMedia("(prefers-color-scheme: light)").matches) {
                favicon.href = "image/favicon-light-edg.svg";
            } else {
                favicon.href = "image/favicon-dark-edg.svg";
            }
            document.head.appendChild(favicon);

            window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function(e) {
                utils.$("favicon-link").href = e.matches ? "image/favicon-light-edg.svg" : "image/favicon-dark-edg.svg";
            });
        }
    }

    searchEngineSet() {
        chrome.storage.local.get({searchEngine: "google"}, (data) => {
            if(data.searchEngine == "google") {
                this.engine = utils.locale("searchbox_google");
                this.elements.SEARCH.placeholder = utils.locale("searchbox_google");
            } else if(data.searchEngine == "baidu") {
                this.engine = utils.locale("searchbox_baidu");
                this.elements.SEARCH.placeholder = utils.locale("searchbox_baidu");
            } else if(data.searchEngine == "bing") {
                this.engine = utils.locale("searchbox_bing");
                this.elements.SEARCH.placeholder = utils.locale("searchbox_bing");
            } else if(data.searchEngine == "sogou") {
                this.engine = utils.locale("searchbox_sogou");
                this.elements.SEARCH.placeholder = utils.locale("searchbox_sogou");
            } else {
                this.engine = utils.locale("searchbox_google");
                this.elements.SEARCH.placeholder = utils.locale("searchbox_google");
            }
        });
        this.elements.SEARCH.onfocus = () => {
            this.elements.SEARCH.placeholder = "";
        };
        this.elements.SEARCH.onblur = () => {
            this.elements.SEARCH.placeholder = this.engine;
        };
    }

    searchBoxSet() {
        document.onkeydown = (e) => {
            var eve = window.event || e;
            var key = eve.keyCode || eve.which || eve.charCode;
            if(key == 13) {
                if(this.elements.SEARCH.value != "") {
                    var content = this.elements.SEARCH.value;
                    var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|[fF][tT][pP]:\/\/)+(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
                    if (!reg.test(content)) {
                        chrome.storage.local.get({searchEngine: "google"}, (data) => {
                            switch(data.searchEngine) {
                                case "google":
                                    window.location.href = "https://google.com/search?safe=active&q="+ content +"&oq="+ content +"&sourceid=chrome&ie=utf-8";
                                    break;
                                case "baidu":
                                    window.location.href = "https://baidu.com/s?wd="+ content +"&ie=utf-8";
                                    break;
                                case "bing":
                                    window.location.href = "https://bing.com/search?q="+ content +"&qs=n";
                                    break;
                                case "sogou":
                                    window.location.href = "https://sogou.com/web?query="+ content +"&_asf=www.sogou.com";
                                    break;
                            }
                        });
                    } else {
                        window.location.href = content;
                    }
                }
            }
        };
    }

    noteBoxSet() {
        var isScroll = false;

        utils.$("more").onclick = () => {
            if(this.moreBoxStat == 0) {
                this.elements.MORE.style.width = "310px";
                this.elements.NOTE_NEWBOX.focus();
                this.moreBoxStat = 1;
            } else if(this.moreBoxStat == 1) {
                this.elements.MORE.style.width = "0";
                this.moreBoxStat = 0;
            }
        };
        this.elements.NOTE_NEWSUB.onclick = () => {
            if(this.elements.NOTE_NEWBOX.value !== "") {
                chrome.storage.local.get({notes: []}, (data) => {
                    var note = data.notes;
                    var time = new Date().getFullYear() +"-"+ (new Date().getMonth() + 1) +"-"+ new Date().getDate() +" "+ new Date().getHours() +":"+ new Date().getMinutes();
                    var content = this.elements.NOTE_NEWBOX.value;
    
                    note[note.length] = {
                        time: time,
                        content: content
                    };
    
                    chrome.storage.local.set({notes: note});
                });
            }
        };
        this.listNotes();
    }

    appsBoxSet() {
        this.elements.APPS.onclick = () => {
            if(this.appsBoxStat == 0) {
                this.elements.APPS_CONTAINER.style.height = "100%";
                utils.$("apps").style.display = "none";
                utils.$("account").style.display = "none";
                utils.$("more").style.display = "none";
                this.appsBoxStat = 1;
            }
        };
        this.elements.APPS_BACK.onclick = () => {
            if(this.appsBoxStat == 1) {
                this.elements.APPS_CONTAINER.style.height = "0";
                utils.$("apps").style.display = "block";
                utils.$("account").style.display = "block";
                utils.$("more").style.display = "block";
                this.appsBoxStat = 0;
            }
        };
        setInterval(() => {
            var hour = new Date().getHours();
            var min = new Date().getMinutes();

            if(hour < 10) {
                hour = "0"+ new Date().getHours();
            }
            if(min < 10) {
                min = "0"+ new Date().getMinutes();
            }

            this.elements.APPS_TIMEFORM.innerText = hour +":"+ min;
        }, 1000);
        chrome.bookmarks.onCreated.addListener(() => this.listApps());
        chrome.bookmarks.onRemoved.addListener(() => this.listApps());
        chrome.bookmarks.onChanged.addListener(() => this.listApps());
        chrome.bookmarks.onMoved.addListener(() => this.listApps());
        this.listApps();
    }

    setBadge(status) {
        if(!status) {
            chrome.browserAction.setBadgeText({
                text: "on"
            });
            chrome.browserAction.setBadgeBackgroundColor({
                color: [74, 111, 100, 34]
            });
            chrome.contextMenus.update("newpage", {
                visible: false
            })
        } else {
            chrome.browserAction.setBadgeText({
                text: "off"
            });
            chrome.browserAction.setBadgeBackgroundColor({
                color: [192, 0, 0, 111]
            });
            chrome.contextMenus.update("newpage", {
                visible: true
            });
        }
    }

    listNotes() {
        this.elements.NOTE_BODY.innerHTML = "";
        this.elements.NOTE_NEWBOX.value = "";
        this.elements.NOTE_NEWBOX.blur();

        chrome.storage.local.get({notes: []}, (data) => {
            var note = data.notes;

            for(let i in note) {
                var time = note[i].time;
                var content = note[i].content;

                var card = utils.$new("div");
                card.className = "note-card";
                var timeform = utils.$new("span");
                timeform.innerHTML = time;
                card.appendChild(timeform);
                var main = utils.$new("p");
                main.innerHTML = content;
                card.appendChild(main);
                this.elements.NOTE_BODY.appendChild(card);
            }
        });
    }

    listApps() {
        this.elements.APPS_BODY.innerHTML = "";

        chrome.bookmarks.getTree((tree) => {
            var bookmark = tree[0]["children"][0]["children"];
            for(let i in bookmark) {
                var name = bookmark[i].title;
                var url = bookmark[i].url;
                var icon = "./favicon.html?url="+ url;

                var app_card = utils.$new("div");
                app_card.className = "apps-l";
                app_card.title = name;
                app_card.setAttribute("l-url", url);
                app_card.onclick = function() {window.location.href = this.getAttribute("l-url")};
                var app_icon = utils.$new("div");
                app_icon.className = "apps-icon";
                var app_icon_img = utils.$new("iframe");
                app_icon_img.src = icon;
                app_icon_img.setAttribute("frameBorder", 0);
                app_icon.appendChild(app_icon_img);
                app_card.appendChild(app_icon);
                var app_name = utils.$new("div");
                app_name.className = "apps-name";
                var app_name_p = utils.$new("p");
                if(name != "") {
                    app_name_p.innerText = name;
                } else {
                    app_name_p.innerHTML = "&nbsp;";
                }
                app_name.appendChild(app_name_p);
                app_card.appendChild(app_name);
                this.elements.APPS_BODY.appendChild(app_card);

                if(i == 6) {
                    this.elements.APPS_BODY.appendChild(utils.$new("br"));
                }
            }
        });
    }
}

new Main();

utils.copy();
