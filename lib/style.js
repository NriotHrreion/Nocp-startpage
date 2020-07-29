setTimeout(function() {
    var style = document.getElementById("less:css-"+ document.getElementById("stylejs").getAttribute("data-style"));
    var copy = 
`/**
 * Nocp Startpage
 * Copyright (c) NriotHrreion 2020
 *
 * Thank you for your use.
 * If the startpage has bug, please tell me on github, I'll fix it!
 * Errr... This is just a stylesheet, why do you see it?
 *
 * License: Apache-2.0
 */
`;
    var base64 = btoa(copy + css_compress(style.innerHTML));
    document.head.removeChild(style);
    var nstyle = document.createElement("link");
    nstyle.rel = "stylesheet";
    nstyle.type = "text/css";
    nstyle.href = "data:text/css;charset=utf-8;base64,"+ base64;
    document.head.appendChild(nstyle);
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
