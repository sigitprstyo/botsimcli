const { processArg, validateArg, moveConditions, turnConditions } = require('./index');
const turnOrder = ["NORTH", "EAST", "SOUTH", "WEST"];

// processArg 
test('processArg to continue process on pass validation', () => {
    expect(processArg(['PLACE', 1, 1, 'NORTH'])).toBe(true);
});
test('processArg to stop process on failed validation', () => {
    expect(validateArg(['PLACE', '', 1, 'NORTH'])).toBe(false);
});

// validateArg, Validating first input argument
test('validateArg on X is a number validation', () => {
    expect(validateArg(['PLACE', 's', 1, 'NORTH'])).toBe(false);
});
test('validateArg on X is not more or less than dimensions validation', () => {
    expect(validateArg(['PLACE', 8, 1, 'NORTH'])).toBe(false);
});
test('validateArg on Y is a number validation', () => {
    expect(validateArg(['PLACE', 1, 'g', 'NORTH'])).toBe(false);
});
test('validateArg on Y is not more or less than dimensions validation', () => {
    expect(validateArg(['PLACE', 1, 9, 'NORTH'])).toBe(false);
});
test('validateArg on FACE is string', () => {
    expect(validateArg(['PLACE', 1, 2, 0])).toBe(false);
});
test('validateArg on FACE is one of the available FACE validation', () => {
    expect(validateArg(['PLACE', 1, 2, 'NORT'])).toBe(false);
});


// moveConditions, testing move conditions
test('moveConditions to move as expected', () => {
    const face = turnOrder[Math.floor(Math.random() * turnOrder.length)];
    let posX = 2;
    let posY = 2;
    switch (face) {
        case 'NORTH':
            posY += 1;
            break;
        case 'EAST':
            posX += 1;
            break;
        case 'SOUTH':
            posY -= 1;
            break;
        case 'WEST':
            posX -= 1;
            break;
    }
    expect(moveConditions(face)).toEqual([posX, posY]);
    
});

// turnConditions, testing turn conditions
test('turnConditions to move as expected', () => {
    let face = "NORTH";
    let id = turnOrder.findIndex((index) => {
        return index === face
    })

    const directions = ['LEFT', 'RIGHT'];
    const command = directions[Math.floor(Math.random() * directions.length)];
    switch (command) {
        case 'LEFT':
            id -= 1;
            if (id < 0) {
                id = 3;
            }
            break;
        case 'RIGHT':
            id += 1;
            if (id > 3) {
                id = 0;
            }
            break;
    }
    let curFace = turnOrder[id];
    expect(turnConditions(command)).toEqual(curFace);
    
});