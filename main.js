
/// General Set-up
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.style.cssText = "background-color:cyan;border:2px solid black;";

/// Global Variables
var canvasWidth = canvas.width, canvasHeight = canvas.height;

/// Initiallize objects (in global scope)
var controller;
var house = [];
var present = [];
var snow = [];

/// Ensure the correct request is made for Animation Frame
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function frameRequestCallback */ callback, /*DOMElement Element */  element) {
            window.setTimeout(callback, 1000 / 60);
        }
    })();
}
var onMobile;

function init() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //alert("Mobile");
        onMobile = true;
        alert("Use your device by tilting it (in any direction) to control the present (white square) and attempt to land it down the chimneys");
    } else {
        //alert("Desktop");
        onMobile = false;
        alert("Use your mouse to control the present (white square) and attempt to land it down the chimneys");
    }

    /// Check the device's orientation is accessible
    if (window.DeviceOrientationEvent && onMobile) {
        window.addEventListener("deviceorientation", function(event)
        {
            /// Get Device Orientation (for Fish)
            for (var p = 0; p < present.length; p++) {
                present[p].getDeviceOrientation();
            }
        })
    };

    if (!onMobile) {
        window.addEventListener("mousemove", function(e) {
            for (var p = 0; p < present.length; p++) {
                // present[p].desktopInput(e);
                present[p].position.y = e.clientY;
                present[p].position.x = e.clientX;
            }
        });
    }

    /// Create Object Instances (unsure if this should be here or in "update")
    controller = new Controller();
    // present = new Present();
    house.push(new House(0, 40));
    present.push(new Present());
    // house.push(new House(90, 500)); // house = new House(500, 100);

    /// Begin Game
    update();
}

var reindeerImageInstance;
reindeerImageInstance = new Image();
var increments = 0;
var increments2 = 0;
function update() {
    if (snow.length < 400) {
        snow.push(new Snow());
    }
    increments += 1;
    increments2 += 1; 
    if (increments >= 30 && house.length < 1) {
        increments = 0;
        if (Math.floor(Math.random() * 10) > 5) {
            house.push(new House(600, 40));
        } else {
            house.push(new House(0, 40)); // house = new House(500, 100);
        }
    }
    /// Move / Update / Trigger Behavior for Object/s
    for (var p = 0; p < present.length; p++) {
        present[p].move();
    }

    //instancePerformBehavior(house, house.move);
    for (var h = 0; h < house.length; h++) {
        house[h].move();
    }

    /// Clear canvas + draw (to an empty canvas)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var p = 0; p < present.length; p++) {
        present[p].display();
    }
    if (increments2 % 120 === 0 && reindeerImageInstance == "./imagesreindeersleigh1.png") {
        reindeerAndSleigh("./images/reindeersleigh2.png");
        increments2 = 0;
    } else {
        reindeerAndSleigh("./images/reindeersleigh1.png");
    }
    for (var s = 0; s < snow.length; s++) {
        snow[s].display();
        if (snow[s].y > canvasHeight - 50) {
            snow[s].y = 0;
            snow[s].x = Math.random() * canvasWidth;
            //snow.slice(0, 1);
        }
    }
    controller.display();
    //instancePerformBehavior(house, house.display);
    for (var h = 0; h < house.length; h++) {
        house[h].display();
    }
    displayGround();
    // instancePerformBehavior(house, house.display);
    // instanceBehave(house, "display");

    /// Colision/s
    for (var h = 0; h < house.length; h++) {
        for (var p = 0; p < present.length; p++) {
            if (house[h].intersects(present[p])) {
                // alert("X: " + present[p].position.x + "Y: " + present[p].position.y);
                if (present[p].presentType == "explosive") {
                    controller.score -= 1;
                } else {
                    controller.score += 1;
                }
                newPresent();
            }
        }
     }

    houseLeavesScreen();

    /// Destroy explosive present after X (6) seconds - should be 6 though is currently 3
    for (var p = 0; p < present.length; p++) {
        if (present[p].presentType == "explosive" && increments % 120 === 0) {
            //alert(increments);
            //console.log(increments % 6); // for testing
            newPresent();
        }
    }

    /// Game Loop
    //console.log(reindeerImage);
    requestAnimationFrame(update);
}
reindeerAndSleigh("./images/reindeersleigh1.png");

/// Run Initiallization function which will begin the game
init();

// var t = 0;
function newPresent() {
//    console.log(_t);
    var randType = Math.floor(Math.random() * 4); // 1 = present 2 = explodingPresent
    //console.log(presentType);
    for (var p = 0; p < present.length; p++) {
        present.splice(0, 1);
            //console.log("New present");
            present.push(new Present());
            if (randType < 2) {
                present[p].presentType = "regular";
            } else {
                present[p].presentType = "explosive";
            }
            // console.log(present[p].presentType);
    }
}

/*
function instanceBehave(objArray, functionName) {
    for (var i = 0; i < objArray.length; i++) {
        console.log("InstanceBehave called");
        const func = objArray[i][functionName];
        func();
    }
}

/*
function instancePerformBehavior(object, behavior) {
    for (var i = 0; i < object.length; i++) {
        object[i].behavior(); // object.behavior();
        console.log("Instance: " + object[i] + " Behavior " + behavior );
    }
}
/*
function instancePerformBehavior(object, instanceAndBehavior) {
    for (var i = 0; i < object.length; i++) {
        instanceAndBehavior; // object.behavior();
        console.log("Instance: " + object + " Behavior " + instanceAndBehavior);
    }
}
*/

function reindeerAndSleigh(imageSrc) {
    // var image = new Image();
    reindeerImageInstance.src = imageSrc;
    ctx.drawImage(reindeerImageInstance, canvasWidth/2-90, 300);
    ctx.globalCompositeOperation="destination-over";
}
function Snow() {
    this.x = Math.random() * canvasWidth;
    this.y = 0;

    this.display = function() {
        this.y += 1;
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, 5,0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}
function displayGround() {
    console.log("Ground");
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 60, canvasWidth, canvasHeight);
    ctx.fill();
    ctx.closePath();
}
