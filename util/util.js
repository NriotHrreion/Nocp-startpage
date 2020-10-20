(function(window) {
    window.utils = {
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
        }
    };
})(window);
