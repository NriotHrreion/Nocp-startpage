setTimeout(function() {
    var style = document.getElementById("less:css-"+ document.getElementById("stylejs").getAttribute("data-style"));
    style.innerHTML = css_compress(style.innerHTML) +"\n/* Copyright (c) NriotHrreion 2020 */";
    document.head.removeChild(document.getElementById("stylejs"));
}, 100);

/**
 * 
 * @author NriotHrreion
 * @param {String} content
 */
function css_compress(content) {
    content = content.replace(/\/\*{1,2}[\s\S]*?\*\//g, "");
    content = content.replace(/(\s*){/g, "{");
    content = content.replace(/{(\s*)/g, "{");
    content = content.replace(/}(\s*)/g, "}");
    content = content.replace(/(\s*)}/g, "}");
    content = content.replace(/:(\s*)/g, ":");
    content = content.replace(/,(\s*)/g, ",");
    content = content.replace(/(\n*)/g, "");
    content = content.replace(/    /g, "");
    content = content.replace(/   /g, "");
    content = content.replace(/  /g, "");
    return content;
}
