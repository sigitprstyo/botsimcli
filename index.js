#!/usr/bin/env node

// GLOBAL VARIABLE
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const width = 5;
const height = 5;
let curX = 0;
let curY = 0;
let curFace = "NORTH";

const validateArg = (arg) => {
    // ARGUMENT 1 
    if (!Number(arg[1])) {
        console.log('validation failed on X value, 1', typeof arg[1], width);
        return false;
    }
    if (arg[1] > width) {
        console.log('validation failed on X value, 2', typeof arg[1], width);
        return false;
    }

    // ARGUMENT 2 
    if (!Number(arg[2])) {
        console.log('validation failed on Y value, 1', typeof arg[2], width);
        return false;
    }
    if (arg[2] > width) {
        console.log('validation failed on Y value, 2', typeof arg[2], width);
        return false;
    }

    // ARGUMENT 3 
    if (Number(arg[3])) {
        console.log('validation failed on FACE value, 1', arg[3]);
        return false;
    }

    let acceptedFace = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    if (!acceptedFace.includes(arg[3])) {
        console.log('validation failed on FACE value, 2', arg[3]);
        return false;
    }

    // console.log('validation passed', arg);
    return true;
}

const getArg = (arg) => {
    if (arg[0] === 'PLACE') {

        // Validate first
        let validate = validateArg(arg);
        if (validate) {
            console.log('Argument is validated')
        }
    } else {
        console.log('Please place bot position, by entering command <PLACE X Y FACE>');
    }
}

// Execution flow here
const run = async () => {
    let arrArg = process.argv;
    arrArg.splice(0, 2);
    await getArg(arrArg);
};

run();