(function(global) {

    "use strict";

    var throwError = function(err) {
        throw new Error("[uinblunx.js] "+ err);
    };

    var Uin = function(_conf) {
        Uin.prototype.mode = _conf.mode;
        Uin.prototype.config = _conf.conf;
        Uin.prototype.init();

        return Uin.prototype;
    };

    Uin.prototype = {
        init: function() {
            var mode = this.mode;
            var config = this.config;

            switch(mode) {
                case "media":
                    if(navigator.mediaDevices !== undefined) {
                        this.userMedia = navigator.mediaDevices.getUserMedia(config);
                    } else {
                        navigator.mediaDevices = function(constraints) {
                            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                            if(!getUserMedia) {
                                throwError("getUserMedia is not implemented in this browser.");
                                return Promise.reject(new Error("getUserMedia is not implemented in this browser."));
                            }

                            return new Promise(function(resolve, reject) {
                                getUserMedia.call(navigator, constraints, resolve, reject);
                            });
                        };

                        this.userMedia = navigator.mediaDevices.getUserMedia(this.config);
                    }
                    break;
                case "speech":
                    var recognition;
                    var recognitionGrammar;

                    if(typeof SpeechRecognition !== "undefined") {
                        recognition = new SpeechRecognition();
                        recognitionGrammar = new SpeechGrammarList();
                    } else {
                        recognition = new webkitSpeechRecognition();
                        recognitionGrammar = new webkitSpeechGrammarList();
                    }

                    if(config.grammar) {
                        recognitionGrammar.addFormString(config.grammar, 1);
                    }

                    recognition.continuous = config.continuous ? config.continuous : false;
                    recognition.interimResults = config.interimResults ? config.interimResults : false;
                    recognition.lang = config.lang ? config.lang : navigator.language;
                    recognition.maxAlternatives = 1;
                    recognition.grammar = recognitionGrammar;

                    this.recognition = recognition;
                    break;
            }
        },
        load: function(cb) {
            var mode = this.mode;

            try {
                switch(mode) {
                    case "media":
                        this.userMedia.then((stream) => {
                            cb(stream);
                        });
                        break;
                    case "speech":
                        var speech = this.recognition;

                        speech.start();
                        speech.onresult = (res) => {
                            var last = res.results.length - 1;

                            if(res.results && res.results[last][0]) {
                                if(res.results[last][0].isFinal) {
                                    speech.stop();
                                }
                                cb(res.results[last][0].transcript);
                            }
                        };
                }
            } catch {
                throwError("You must init Uinblunx.js");
            }
        },
        on: function(_event, cb) {
            if(this.mode == "speech") {
                _event = "on"+ _event;

                this.recognition[_event] = (e) => {
                    cb(e);
                };
            } else {
                throwError("The Listener just for speech mode");
            }
        }
    };

    if(typeof module !== "undefined" && module.exports) module.exports = Uin;
    if(typeof define === "function") define(function() { return Uin });

    global.Uin = Uin;

})(this);
