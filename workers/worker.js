self.addEventListener("message", function(cmd) {
    switch (cmd) {
        case "start":
            for (var i = 1;; i++) {
                self.postMessage(i);
            }
            break;
        case "stop":
        	self.close();
        	break;
    }

});
