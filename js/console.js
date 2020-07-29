consoleInfo("INFO", "\nNocp Startpage\nCopyright (c) NriotHrreion 2020\n\nThank you for your use.\nIf the startpage has bug, please tell me on github, I'll fix it!\nAnd those icons are from https://iconfont.cn\n\nBingImage API: https://github.com/jinzhijie/Bing-Api\nGithub: https://github.com/NriotHrreion/Nocp-startpage\nLicense: Apache-2.0");

function consoleInfo(head, info, type, other) {
    if(!type) {
        console.log("%c "+ head +" %c "+ info, "background-color:#099ef5;font-weight:bold;color:#fff;", "background-color:transparent;font-weight:auto;");
    } else {
        console.log("%c "+ head +" %c "+ info +" %c"+ type +"%c "+ other, "background-color:#099ef5;font-weight:bold;color:#fff;", "background-color:transparent;font-weight:auto;", "color:darkblue;font-style:italic;", "background-color:transparent;font-weight:auto;cursor:pointer;");
    }
    return;
}