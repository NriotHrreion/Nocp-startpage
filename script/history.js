var list = document.getElementById("history-list");
var searchbox = document.getElementById("sbox");
var search = document.getElementById("s");

search.addEventListener("focus", function() {
    searchbox.style.borderBottomLeftRadius = "0";
    searchbox.style.borderBottomRightRadius = "0";
    list.style.display = "block";
});

search.addEventListener("blur", function() {
    searchbox.focus();
});

searchbox.addEventListener("blur", function() {
    searchbox.style.borderBottomLeftRadius = "2em";
    searchbox.style.borderBottomRightRadius = "2em";
    list.style.display = "none";
});

search.addEventListener("keydown", function(e) {
    var eve = window.event || e;
    var key = eve.keyCode || eve.which || eve.charCode;
    if(key == 13 && search.value != "") {
        chrome.storage.local.get({history: [{text: "百度", url: "https://baidu.com"}], searchEngine: "google"}, function(data) {
            var history_list = data.history;
            switch(data.searchEngine) {
                case "google":
                    history_list[history_list.length] = {text: search.value, url:"https://google.com/search?safe=active&q="+ search.value +"&oq="+ search.value +"&sourceid=chrome&ie=utf-8"};
                    break;
                case "baidu":
                    history_list[history_list.length] = {text: search.value, url:"https://baidu.com/s?wd="+ search.value +"&ie=utf-8"};
                    break;
                case "bing":
                    history_list[history_list.length] = {text: search.value, url:"https://bing.com/search?q="+ search.value +"&qs=n"};
                    break;
                case "sogou":
                    history_list[history_list.length] = {text: search.value, url:"https://sogou.com/web?query="+ search.value +"&_asf=www.sogou.com"};
                    break;
            }
            chrome.storage.local.set({history: history_list});
        });
    }
});

chrome.storage.local.get({history: [{text: "百度", url: "https://baidu.com"}]}, function(data) {
    for(let i = data.history.length - 1; i >= data.history.length - 4; i--) {
        var item = document.createElement("a");
        item.title = data.history[i].text;
        item.href = data.history[i].url;
        item.className = "history-item";
        var text = document.createElement("div");
        text.innerHTML = data.history[i].text;
        text.className = "history-text";
        item.appendChild(text);
        list.appendChild(item);
    }
    list.style.height = "175px";
});
