const lineAccurancy = 50;
const maxLineFails = 10;

function determineShape(pos) {

    if (pos.length == 0) return;

    // get start and end position
    let pos1 = pos[0];
    let pos2 = pos[pos.length - 1];
    
    // check vertical line
    if (pos1.y > pos2.y) {
        let temp = pos2;
        pos2 = pos1;
        pos1 = temp;
    }

    if (pos2.y > pos1.y && (pos2.y - pos1.y) > lineAccurancy) {
        let left = pos1.x - lineAccurancy;
        let right = pos1.x + lineAccurancy;
        if (pos2.x > left && pos2.x < right) {
            let fail = 0;
            pos.forEach(el => {
                if (!(el.x > left && el.x < right)) {
                    fail++;
                }
            });
            if (fail < maxLineFails) {
                return "vertical line";
            }
        }
    }

    // check horizontal line
    if (pos1.x > pos2.x) {
        let temp = pos2;
        pos2 = pos1;
        pos1 = temp;
    }

    if (pos2.x > pos1.x && (pos2.x - pos1.x) > lineAccurancy) {
        let top = pos1.y - lineAccurancy;
        let bottom = pos1.y + lineAccurancy;
        if (pos2.y > top && pos2.y < bottom) {
            let fail = 0;
            pos.forEach(el => {
                if (!(el.y > top && el.y < bottom)) {
                    fail++;
                }
            });
            if (fail < maxLineFails) {
                return "horizontal line";
            }
        }
    }

    return "unkown shape";
}