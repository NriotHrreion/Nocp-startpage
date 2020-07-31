var uploader = document.getElementById("uploader");
uploader.onchange = function() {
    var file = uploader.files[0];
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function() {
        var filename = uploader.value;
        filename = filename.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi, "$1");

        chrome.storage.local.set({imgurl: this.result});
        chrome.notifications.create({
            type: "basic",
            iconUrl: "../icon.png",
            title: "Info",
            message: "背景图片已设置为"+ filename
        });
    };
};

document.getElementById("img_default").onclick = function() {
    chrome.storage.local.set({imgurl: "image/bg.jpg"});
    chrome.notifications.create({
        type: "basic",
        iconUrl: "../icon.png",
        title: "Info",
        message: "背景图片已设置为 默认"
    });
};