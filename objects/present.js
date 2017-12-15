/// Present
/* Notes:
(it may be only one instance of the present should exist at a time )
*/

// var startX = 200, startY = 200;
function Present() {
    this.presentType = "regular";
    this.velocity = {
        x:0, y:0
    };
    this.position = {
        // x: 100, y: 100// x: 280, y: 160
        x: canvasWidth/2, y: 350
        // x: 10 + Math.floor(Math.random() * 300), y: 300 + Math.random() * 100
    };
    this.width = 30;
    this.height = 30;

    /// Get Device Orientation
    this.getDeviceOrientation = function() {
            this.velocity.y = Math.round(event.beta) * 2;
            this.velocity.x = Math.round(event.gamma) * 2;
    }
    this.desktopInput = function() {
        this.velocity.y = e.clientY;
        this.velocity.x = e.clientX;
    }

    /// Move Object
    this.move = function() { // should collision / intersection checking occur here?
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    /// Display
    var image = new Image();
    this.display = function() {
        //console.log("Display ");
        if (this.presentType === "explosive") {
            image.src = "./images/explodingPresent.png";
            //console.log("Exploding");
        } else {
            image.src = "./images/present.png";
            //console.log("reg");
        }
        ctx.drawImage(image, this.position.x, this.position.y, this.width, this.height);
    }
}
