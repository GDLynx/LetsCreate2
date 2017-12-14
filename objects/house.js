/// House

/*
var startX = 10; // Math.floor(Math.random() * 1000);
var startY = 100;
*/
function House(startX, startY) {
    this.position = {
        x: startX, y: startY
    };
    this.width = 50/2;
    this.height = 50/2;
    this.speed = 0.2; // 2;

    // console.log(this.position.x + " " + this.position.y + " " + startX + " " + startY);
    /// Move Object
    this.move = function() { // should collision / intersection checking occur here?
        this.position.y += this.speed;
        //this.position.x -= this.speed;
        this.width += 1/3;
        this.height = this.width;
        //console.log("moving" + this.position.y);
        if (this.position.x <= 200) { // canvasWidth/2
            this.position.x += this.speed;
        } else {
            this.position.x -= this.speed * 2;
        }
    }

    /// Collision with present
    this.intersects = function(other) {
        if (this.position.x >= 120) {
            // this.position.x + this.width-20, this.position.y + 4
            if (this.position.x+10 < other.position.x + other.width &&
                    this.position.x + this.width > other.position.x &&
                    this.position.y < other.position.y + other.height &&
                    this.height + this.position.y > other.position.y) {
                // alert("Collected");
                console.log("Collision");
                return true;
            }
        } else {
            // this.position.x + this.width-20, this.position.y + 4
            if (this.position.x < other.position.x + other.width &&
                    this.position.x + this.width-40 > other.position.x &&
                    this.position.y < other.position.y + other.height &&
                    this.height - 160 + this.position.y > other.position.y) {
                // alert("Collected");
                console.log("Collision");
                return true;
            }
        }
    }

    /// Display
    var image = new Image();
    if (this.position.x <= 100) { // canvasWidth/2
        image.src = "./images/house.png";
    } else {
        image.src = "./images/house2.png";
    }
    this.display = function() {
        if (this.position.x <= 120) {
            ctx.fillRect(this.position.x + this.width-20, this.position.y + 4, 20, 20);
            ctx.fillStyle = "green";
        } else {
            ctx.fillRect(this.position.x, this.position.y + 4, 20, 20);
            ctx.fillStyle = "green";
        }
        ctx.drawImage(image, this.position.x, this.position.y, this.width, this.height);
        ctx.globalCompositeOperation="destination-over";
        // console.log("Displaying");
        /*
        if (this.position.x < canvasWidth/2) {
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
        }
        */
    }
}

function houseLeavesScreen() {
    for (var h = 0; h < house.length; h++) {
        if (house[h].position.y >= 150) { // canvasHeight - house[h].height) {  // canvasHeight - house.height) {
            house.splice(0, 1);
            console.log("Deleted");
        }
    }
}
