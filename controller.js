
/// Score
function Controller() {
    this.score = 0;

    this.display = function() {
        ctx.font = "40px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: "+this.score, canvasWidth/2, 100);
    } 
}
