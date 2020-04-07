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
    let oldPositions = [...positions];
    let shape = determineShape(positions);
    
    positions = [];
    redraw(oldPositions, shape == "horizontal line" ? "blue" :  shape == "vertical line" ? "red" : shape == "arrow up" ? "green" : shape == "arrow down" ? "yellow" : "white");

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