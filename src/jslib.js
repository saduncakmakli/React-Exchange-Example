
export function calculateSellPrice(p) {
    const parity = Object.assign({}, p);
    return (parity.buy -= parity.buy * parity.commission / 100)
}

export function calculateTranfer(objectDiv, containerDiv, movement, objectLocation) {
    if (movement.x > 0) {
        if (objectDiv.offsetLeft + objectDiv.offsetWidth < containerDiv.offsetWidth) {
            objectLocation.left += movement.x;
        }
    }
    else if (movement.x < 0) {
        if (objectDiv.offsetLeft > 0) {
            objectLocation.left += movement.x;
        }
    }
    if (movement.y > 0) {
        if (objectDiv.offsetTop + objectDiv.offsetHeight < containerDiv.offsetHeight) {
            objectLocation.top += movement.y;
        }
    }
    else if (movement.y < 0) {
        if (objectDiv.offsetTop > 0) {
            objectLocation.top += movement.y;
        }
    }
}

export function numberAddpx(number) { return (number + 'px') }