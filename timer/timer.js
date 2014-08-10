var Timer = (function() {

    var timer = {
        time: new Date().getTime(),
        events: {},
        init: function() {
            setInterval(updateTime.bind(this));
        },
        subscribe: function(eventName, handler) {
            if (!this.__supportedEvents__[eventName]) {
                throw "Event not supported";
            } else if (!this.events[eventName]) {
                this.events[eventName] = [];
            }
            var index = this.events[eventName].push(handler) - 1;
            return {
                remove: function() {
                    delete this.events[eventName][index];
                }
            };
        },
        publish: function(eventName, eventObject) {
            if (!this.__supportedEvents__[eventName]) {
                throw "Event not supported";
            } else if (this.events[eventName]) {
                this.events[eventName].forEach(function(handler) {
                    handler(eventObject || {});
                });
            }
        },
        displayTime: function(divId) {
            var div = document.getElementById(divId);
            setInterval(updateDisplay.bind(this, div));
        }
    }

    Object.defineProperty(timer, "__supportedEvents__", {
        value: {
            "onchange": true
        },
        enumerable: false,
        configurable: false,
        writable: false
    });


    function updateTime() {
        var currentTime = new Date().getTime();
        if (currentTime != this.time) {
            this.publish("onchange");
            this.time = new Date().getTime();
        }
    }

    function updateDisplay(div) {
        div.innerHTML = new Date(this.time).toString();
    }

    return timer;

})();

var StopWatch = (function() {

    var stopwatch = {
        create: function(div) {
            div.style.border = "2px solid black";
            var watchDiv = document.createElement("div");
            watchDiv.style.height = "30px";
            watchDiv.innerHTML = "0:0:0:0";
            div.appendChild(watchDiv);
            var startBtn = document.createElement("button");
            startBtn.innerHTML = "Start";
            div.appendChild(startBtn);
            var stopBtn = document.createElement("button");
            stopBtn.innerHTML = "Stop";
            div.appendChild(stopBtn);
            disableButton(stopBtn);
            startBtn.addEventListener("click", start.bind(this, startBtn, watchDiv, stopBtn));
        }
    };

    function start(startBtn, watchDiv, stopBtn) {
        disableButton(startBtn);
        enableButton(stopBtn);
        var startTime = new Date().getTime();
        var intervalId = setInterval(updateTime.bind(this, watchDiv, startTime));
        stopBtn.addEventListener("click", stop.bind(stopBtn, startBtn, intervalId));
    }

    function stop(startBtn, intervalId) {
        clearInterval(intervalId);
        disableButton(this);
        enableButton(startBtn);
    }

    function enableButton(btn) {
        btn.removeAttribute("disabled");
    }

    function disableButton(btn) {
        btn.setAttribute("disabled", "true");
    }

    function updateTime(watchDiv, startTime) {
    	watchDiv.innerHTML = getWatchString(startTime, new Date().getTime());
    }

    function getWatchString(startTime, currentTime) {
        var timeInMs = currentTime - startTime;
        var ms = sec = min = hr = 0;
        if (timeInMs > 999) {
            ms = timeInMs % 1000;
            var timeInSec = (timeInMs - ms) / 1000;
            if (timeInSec > 59) {
                sec = timeInSec % 60;
                var timeInMin = (timeInSec - sec) / 60;
                if (timeInMin > 59) {
                    min = timeInMin % 60;
                    hr = (timeInMin - min) / 60;
                } else {
                    min = timeInMin;
                }
            } else {
                sec = timeInSec;
            }
        } else {
            ms = timeInMs;
        }
        return hr + ":" + min + ":" + sec + ":" + ms;
    }

    return stopwatch;

})();