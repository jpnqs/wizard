let canvas = document.getElementById("magic-wand");
let ctx = canvas.getContext("2d");
let mouseDown = false;
let positions = [];

mouseUp();

function draw(ev) {

    if (!mouseDown) return;

    positions.push({
        x: ev.offsetX,
        y: ev.offsetY
    });

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = "purple";
    ctx.lineWidth = 15;

    if (positions.length > 1) {
        let start = positions[positions.length - 2]
        let end = positions[positions.length - 1]
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }

}

function mouseUp(ev) {
    mouseDown = false;
    let shape = determineShape(positions);
    
    redraw(positions, shape == "horizontal line" ? "blue" :  shape == "vertical line" ? "red" : "yellow");
    positions = [];

    setTimeout(clear, 200);
}

function redraw(pos, color) {

    clear();
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = 15;

    pos.forEach((el, i) => {
        if (i == 0) {
            ctx.moveTo(el.x, el.y);
        } else {
            ctx.lineTo(el.x, el.y);
        }
    });
    ctx.stroke();

}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}