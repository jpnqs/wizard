let canvas = document.getElementById("magic-wand");
let ctx = canvas.getContext("2d");
let mouseDown = false;
let positions = [];

mouseUp();

canvas.addEventListener("mousedown", ev => {
    mouseDown = true;
});

canvas.addEventListener("mousemove", ev => {

    if (!mouseDown) return;

    positions.push({
        x: ev.offsetX,
        y: ev.offsetY
    });

    ctx.beginPath();
    ctx.lineCap = "round";

    // ctx.strokeStyle = "purple";
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#2e0537');
    gradient.addColorStop(.5, '#5f0188');
    gradient.addColorStop(1, '#8312eb');


// Fill with gradient
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 15;

    positions.forEach((pos, i) => {
        if (i == 0) {
            ctx.moveTo(pos.x, pos.y);
        } else {
            ctx.lineTo(pos.x, pos.y);
        }
    });

    ctx.stroke();
});

canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mouseout", mouseUp);
canvas.addEventListener("mouseleave", mouseUp);
canvas.addEventListener("touchstart", ev => {
    let mouseEvent = new MouseEvent("mousedown", {});
    canvas.dispatchEvent(mouseEvent);
});
canvas.addEventListener("touchend", ev => {
    let mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
});
canvas.addEventListener("touchmove", ev => {
    var touch = ev.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
})

let counter = 1;
function mouseUp(ev) {
    mouseDown = false;
    setTimeout(() => {
        let shape = determineShape(positions);
        let out = document.getElementById("shape");
        if (out.innerText == shape) {
            counter++;
        } else {
            counter = 1;
            out.innerText = shape;
        }
        document.getElementById("count").innerText = counter;

        positions = [];
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, 250);
}