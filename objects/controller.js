
/// Score
function Controller() {
    this.score = 0;

    this.display = function() {
        ctx.font = "40px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("Score: "+this.score, canvasWidth/2-70, 100);
    }
}
