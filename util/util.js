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
        manifest: function(callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("get", "../manifest.json");
            xhr.send(null);
            xhr.onload = function() {
                callback(JSON.parse(this.responseText));
            };
        },
        getBingImage: function(callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("get", "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=$daysAgo&n=1");
            xhr.send(null);
            xhr.onload = function() {
                var data = JSON.parse(this.responseText);
                callback("https://cn.bing.com"+ data.images[0].url);
            };
        }
    };
})(window);
