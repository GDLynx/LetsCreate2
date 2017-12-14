/// Present
/* Notes:
(it may be only one instance of the present should exist at a time )
*/

// var startX = 200, startY = 200;
function Present() {
    this.velocity = {
        x:0, y:0
    };
    this.position = {
        // x: 200, y: 200
        x: 600 + Math.random() * 100, y: 300 + Math.random() * 100  
    };
    this.width = 30;
    this.height = 30;

    /// Get Device Orientation
    this.getDeviceOrientation = function() {
            this.velocity.y = Math.round(event.beta);
            this.velocity.x = Math.round(event.gamma);
    }

    /// Move Object
    this.move = function() { // should collision / intersection checking occur here?
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    /// Display
    var image = new Image();
    image.src = "./images/present.png";
    this.display = function() {
        ctx.drawImage(image, this.position.x, this.position.y, this.width, this.height);
    }
}
