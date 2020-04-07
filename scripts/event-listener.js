// event listener
canvas.addEventListener("mousedown", ev => {
    mouseDown = true;
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mouseout", mouseUp);
canvas.addEventListener("mouseleave", mouseUp);
// touch event are simply mapped to mouse events
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
});