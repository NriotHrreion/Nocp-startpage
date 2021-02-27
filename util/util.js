/// <reference types="chrome">

(function(window) {

    window.utils = {
        _: function(){},
        $: function(type, elem) {
            if(arguments[0] || arguments[1]) {
                switch(type) {
                    case "id":
                        return document.getElementById(elem);
                        break;
                    case "cls":
                        return document.getElementsByClassName(elem);
                        break;
                    case "qs":
                        return document.querySelector(elem);
                        break;
                    default:
                        return document.getElementById(arguments[0]);
                        break;
                }
            }
        },
        $new: function(elem) {
            return document.createElement(elem);
        },
        locale: function(locale) {
            return chrome.i18n.getMessage(locale);
        },
        copy: function() {
            new CustomEvent("A|startpage-by-nriothrreion", {});
            document.addEventListener("A|startpage-by-nriothrreion", function() {});
        },
        global: function(variable, varName) {
            window[varName] = variable;
        },
        getBingImage: function(callback) {
            var xhrBing = new XMLHttpRequest();
            var url = chrome.i18n.getUILanguage() == "en" ? "https://bing.com/HPImageArchive.aspx?format=js&idx=$daysAgo&n=1" : "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=$daysAgo&n=1";

            xhrBing.open("get", url);
            xhrBing.send(null);
            xhrBing.onload = function(e) {
                var data = JSON.parse(this.responseText);
                callback({
                    url: "https://cn.bing.com"+ data.images[0].url,
                    cr: data.images[0].copyright,
                    link: data.images[0].copyrightlink
                });
            };
        }
    };

    var xhrManifest = new XMLHttpRequest();
    xhrManifest.open("get", "../manifest.json");
    xhrManifest.send(null);
    xhrManifest.onload = function() {
        window.utils.manifest = JSON.parse(this.responseText);
    };

})(window);
