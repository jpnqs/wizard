function determineShape(pos) {

    if (pos.length == 0) return;

    let pos1 = pos[0];
    
    let pos2 = pos[pos.length - 1];
    
    // check vertical line
    if (pos2.y > pos1.y && (pos2.y - pos1.y) > 50) {
        let left = pos1.x - 50;
        let right = pos1.x + 50;
        if (pos2.x > left && pos2.x < right) {
            return "vertical line";
        }
    }

    // check horizontal line
    if (pos2.x > pos1.x && (pos2.x - pos1.x) > 50) {
        let top = pos1.y - 50;
        let bottom = pos1.y + 50;
        if (pos2.y > top && pos2.y < bottom) {
            return "horizontal line";
        }
    }

    if (checkPosition(pos1.x, 20, pos2.x) && checkPosition(pos1.y, 20, pos2.y)) {
        return "rectangle";
    }

    return "unkown shape";
}

function checkPosition(x1, offset, x2) {
    let bound1 = x1 - offset;
    let bound2 = x1 + offset;
    return (x2 > bound1 && x2 < bound2);
}