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

class Popup {
    constructor() {
        this.inputs = [
            {on: utils.$("on_1"), off: utils.$("off_1")},
            utils.$("search_selector")
        ];

        this.initPopup();
        this.initLocale();
    }

    initPopup() {
        chrome.storage.local.get({bgimg: false}, (data) => {
            if(data.bgimg == true) {
                this.inputs[0].on.style.display = "block";
                this.inputs[0].off.style.display = "none";
            } else if(data.bgimg == false) {
                this.inputs[0].on.style.display = "none";
                this.inputs[0].off.style.display = "block";
            }
        });

        this.inputs[0].on.onclick = () => {
            this.inputs[0].on.style.display = "none";
            this.inputs[0].off.style.display = "block";
            chrome.storage.local.set({bgimg: false});
            chrome.notifications.create({
                type: "basic",
                iconUrl: "../icon.png",
                title: "Info",
                message: chrome.i18n.getMessage("info_1")
            });
            location.href = "chrome://newtab";
        };
        this.inputs[0].off.onclick = () => {
            this.inputs[0].on.style.display = "block";
            this.inputs[0].off.style.display = "none";
            chrome.storage.local.set({bgimg: true});
            chrome.notifications.create({
                type: "basic",
                iconUrl: "../icon.png",
                title: "Info",
                message: chrome.i18n.getMessage("info_1")
            });
            location.href = "chrome://newtab";
        };

        chrome.storage.local.get({}, (data) => {
            if(data.isFirstSet != 1) {
                chrome.storage.local.set({searchEngine: "google", isFirstSet: 1});
            }
        });
        chrome.storage.local.get({searchEngine: "google"}, (data) => {
            if(typeof data.searchEngine === "string") {
                this.inputs[1].value = data.searchEngine;
            }
        });
        this.inputs[1].onchange = function() {
            chrome.storage.local.set({searchEngine: this.value, isFirstSet: 1});
            chrome.notifications.create({
                type: "basic",
                iconUrl: "../icon.png",
                title: "Info",
                message: "搜索引擎已切换为"+ this.value
            });
        };
    }

    initLocale() {
        utils.$("description").innerHTML = utils.locale("description");
        utils.$("opt_1").innerHTML = utils.locale("opt_1");
        utils.$("opt_2").innerHTML = utils.locale("opt_2");
        utils.$("opt_3").innerHTML = utils.locale("opt_3");
        utils.$("img_default").innerHTML = utils.locale("img_default");
        utils.$("img_upload").innerHTML = utils.locale("img_upload");
    }
}

new Popup();

utils.copy();

