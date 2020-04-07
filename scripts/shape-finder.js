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

    // check arrow up 
    if (pos2.x > pos1.x && (pos2.x - pos1.x) > lineAccurancy) {
        let center = Math.floor( pos1.x + ( ( pos2.x - pos1.x ) / 2 ) );
        pos.sort(compareValues("y"));
        let left = center - 50;
        let right = center + 50;
        let low = pos[0];
        if (low.x > left && low.x < right) {
            return "arrow up";
        }
        let high = pos[pos.length - 1];
        if (high.x > left && high.x < right) {
            return "arrow down";
        }
    }

    return "unkown shape";
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }