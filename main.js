
/// General Set-up
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.style.cssText = "background-color:white;border:2px solid black;";

/// Global Variables
var canvasWidth = canvas.width, canvasHeight = canvas.height;

/// Initiallize objects (in global scope)
var present = [];
var house;

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
            present.getDeviceOrientation();
        })
    };

    /// Create Object Instances (unsure if this should be here or in "update")
    present = new Present();

    /// Begin Game
    update();
}

function update() {

    /// Move / Update / Trigger Behavior for Object/s
    present.move();

    /// Clear canvas + draw (to an empty canvas)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    present.display();

    /// Colision/s 

    /// Game Loop
    requestAnimationFrame(update);
}

/// Run Initiallization function which will begin the game
init();
