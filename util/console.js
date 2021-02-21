consoleInfo(" INFO ", "Nocp Startpage\nCopyright (c) NriotHrreion 2020\n\nThank you for your use.\nIf the startpage has bug, please tell me on github, I'll fix it!\nAnd those icons are from https://iconfont.cn\n\nBackground Image API: https://cn.bing.com/HPImageArchive.aspx?format=js&idx=$daysAgo&n=1\nGithub: https://github.com/NriotHrreion/Nocp-startpage\nLicense: Apache-2.0");

function consoleInfo(head, info, type, other) {
    console.group("%c"+ head, "background-color:#099ef5;font-weight:bold;color:#fff;");
    if(!type) {
        console.log("%c"+ info, "background-color:transparent;font-weight:auto;");
    } else {
        console.log("%c"+ info +" %c"+ type +"%c "+ other, "background-color:transparent;font-weight:auto;", "color:darkblue;font-style:italic;", "background-color:transparent;font-weight:auto;cursor:pointer;");
    }
    console.groupEnd();
    return;
}