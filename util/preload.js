var preloadimages = new Array();
function preload() {
    for(var i = 0; i < arguments.length; i++) {
        preloadimages[i] = new Image();
        preloadimages[i].src = arguments[i];
    }
}
