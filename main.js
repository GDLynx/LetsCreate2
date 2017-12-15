
/// General Set-up
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.style.cssText = "background-color:white;border:2px solid black;";

/// Global Variables
var canvasWidth = canvas.width, canvasHeight = canvas.height;

/// Initiallize objects (in global scope)
var controller;
var house = [];
var present = [];

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

function init() {
    /// Check the device's orientation is accessible
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function(event)
        {
            /// Get Device Orientation (for Fish)
            for (var p = 0; p < present.length; p++) {
                present[p].getDeviceOrientation();
            }
        })
    };

    /// Create Object Instances (unsure if this should be here or in "update")
    controller = new Controller();
    // present = new Present();
    house.push(new House(0, 40));
    present.push(new Present());
    // house.push(new House(90, 500)); // house = new House(500, 100);

    /// Begin Game
    update();
}

var increments = 0;
function update() {
    increments += 1;
    if (increments >= 100 && house.length < 1) {
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
    controller.display();
    for (var p = 0; p < present.length; p++) {
        present[p].display();
    }
    //instancePerformBehavior(house, house.display);
    for (var h = 0; h < house.length; h++) {
        house[h].display();
    }
    // instancePerformBehavior(house, house.display);
    // instanceBehave(house, "display");

    /// Colision/s
    for (var h = 0; h < house.length; h++) {
        for (var p = 0; p < present.length; p++) {
            if (house[h].intersects(present[p])) {
                // alert("X: " + present[p].position.x + "Y: " + present[p].position.y);
                if (present[p].presentType == "explosive") {
                    controller.score += 1;
                } else {
                    controller.score -= 1;
                }
                newPresent();
            }
        }
     }

    houseLeavesScreen();

    /// Destroy explosive present after X (6) seconds - should be 6 though is currently 3
    for (var p = 0; p < present.length; p++) {
        if (present[p].presentType == "explosive") {
            if (increments % 3 === 2) {
                console.log(increments % 3); // for testing
                newPresent();
            }
        }
    }

    /// Game Loop
    requestAnimationFrame(update);
}

/// Run Initiallization function which will begin the game
init();

// var t = 0;
function newPresent() {
//    console.log(_t);
    var presentType = Math.floor(Math.random() * 4); // 1 = present 2 = explodingPresent
    console.log(presentType);
    for (var p = 0; p < present.length; p++) {
        present.splice(0, 1);

            console.log("New present");
            present.push(new Present());
            if (presentType < 2) {
                present[p].presentType = "regular";
            } else {
                present[p].presentType = "explosive";
            }
            console.log(present[p].presentType);
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
