
/// General Set-up
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.style.cssText = "background-color:white;border:2px solid black;";

/// Global Variables
var canvasWidth = canvas.width, canvasHeight = canvas.height;

/// Initiallize objects (in global scope)
var present = [];
var house = [];

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
    // present = new Present();
    present.push(new Present());
    // house.push(new House(90, 500)); // house = new House(500, 100);

    /// Begin Game
    update();
}

var increments = 0;
function update() {
    increments += 1;
    if (increments >= 100) {
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
                newPresent();
            }
        }
     }

    houseLeavesScreen();

    /// Game Loop
    requestAnimationFrame(update);
}

/// Run Initiallization function which will begin the game
init();

function newPresent() {
    for (var p = 0; p < present.length; p++) {
        present.splice(0, 1);
        present.push(new Present());
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
