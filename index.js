#!/usr/bin/env node

// GLOBAL VARIABLE
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const chalk = require("chalk");

const width = 5;
const height = 5;
const turnOrder = ["NORTH", "EAST", "SOUTH", "WEST"];

let curX = 0;
let curY = 0;
let curFace = "NORTH";

const Dimensions = () => {
    let dimensions = [];
    for (let i = 0; i < width; i++) {
        dimensions[i] = [];
        for (let j = 0; j < height; j++) {
            dimensions[i][j] = "" + i + "," + j + "";
        }
    }
    dimensions.reverse()
    // console.log('dimensions\n', dimensions);
    return dimensions;

}

const turnConditions = (command) => {
    // Find index of the current face in turnOrder array
    let id = turnOrder.findIndex((index) => {
        return index === curFace
    })


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
    curFace = turnOrder[id];
}

const turnCmd = (command) => {
    turnConditions(command)
    console.log("TURN " + command + ": the bot moves to \nX: " + chalk.green.bold(curX) + ",\nY: " + chalk.green.bold(curY) + "\nfacing to the " + chalk.green.bold(curFace) + ", please input another command:");

}

const moveConditions = (face) => {
    let posX = parseInt(curX);
    let posY = parseInt(curY);
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

    let dimensions = Dimensions();
    let matchString = "" + posX + "," + posY + ""

    // Check if the position is available in our dimensions
    let validatePlace
    dimensions.forEach(function (array) {
        array.forEach(function (value) {
            if (value === matchString) {
                validatePlace = value
            }
        })
    })
    if (validatePlace == null) {
        console.log(chalk.red.bold("Movement is invalid"));
    } else {
        curX = posX
        curY = posY
    }
}


const moveCmd = () => {
    moveConditions(curFace)
    console.log("MOVE: the bot moves to \nX: " + chalk.green.bold(curX) + ", \nY: " + chalk.green.bold(curY) + "\nfacing to the " + chalk.green.bold(curFace) + ", please input another command:");

}

const reportCmd = () => {
    console.log("REPORT: the bot is placed on:\nX: " + chalk.green.bold(curX) + ", \nY: " + chalk.green.bold(curY) + "\nfacing to the " + chalk.green.bold(curFace) + ", please input another command:");
}

const processInput = (data) => {
    let isPlace = data;
    let input = data;

    // Check if another PLACE is entered
    let newPlaceArr = isPlace.split(' ');
    if (newPlaceArr[0] === 'PLACE') {
        // newPlaceArr[3] = newPlaceArr[3].substring(0, newPlaceArr[3].length - 1);
        input = 'PLACE';
    }


    if (input === 'exit') {
        console.log(chalk.yellow.bold("Goodbye!"));
        process.exit();
    }

    switch (input) {
        case 'MOVE':
            moveCmd(data)
            break;
        case 'REPORT':
            reportCmd(data)
            break;
        case 'LEFT':
            turnCmd('LEFT')
            break;
        case 'RIGHT':
            turnCmd('RIGHT')
            break;
        case 'PLACE':
            processArg(newPlaceArr)
            break;
        default:
            console.log(chalk.red.bold("Command not valid, the valid command is <MOVE> <RIGHT> <LEFT> <REPORT>"));
            break;
    }
    promptInput()
}

const promptInput = () => {
    readline.question('waiting for command... :', (command) => {
        processInput(command)

        readline.resume()
    })

}

const placeCmd = (arg) => {
    curX = arg[1];
    curY = arg[2];
    curFace = arg[3];
    console.log("the bot is placed on: \nX: " + chalk.green.bold(curX) + ", \nY: " + chalk.green.bold(curY) + "\nfacing to the " + chalk.green.bold(curFace) + ", please input another command:");

    promptInput();

}

const validateArg = (arg) => {

    // ARGUMENT 1 (X)
    // X is a number
    // X not more than total width of dimensions
    // X not less than 0
    if (!Number.isInteger(parseInt(arg[1]))) {
        console.log(chalk.red.bold("validation failed on X value, 1"), typeof arg[1], width);
        process.exit()
        return false
    }
    if (arg[1] > width) {
        console.log(chalk.red.bold("validation failed on X value, 2"), typeof arg[1], width);
        process.exit()
        return false
    }
    if (arg[1] < 0) {
        console.log(chalk.red.bold("validation failed on X value, 2"), typeof arg[1], width);
        process.exit()
        return false
    }

    // ARGUMENT 2 (Y)
    // Y is a number
    // Y not more than total width of dimensions
    // Y not less than 0
    if (!Number.isInteger(parseInt(arg[2]))) {
        console.log(chalk.red.bold("validation failed on Y value, 1"), typeof arg[2], width);
        process.exit()
        return false
    }
    if (arg[2] > width) {
        console.log(chalk.red.bold("validation failed on Y value, 2"), typeof arg[2], width);
        process.exit()
        return false
    }
    if (arg[2] < 0) {
        console.log(chalk.red.bold("validation failed on Y value, 2"), typeof arg[2], width);
        process.exit()
        return false
    }

    // ARGUMENT 3 (FACE)
    // FACE is a string
    // the string given is one of NORTH EAST SOUTH and WEST
    if (typeof arg[3] !== 'string') {
        console.log(chalk.red.bold("Validation failed on FACE value, 1"), typeof arg[3]);
        process.exit()
    }

    if (!turnOrder.includes(arg[3])) {
        console.log(chalk.red.bold("validation failed on FACE value, 2"), arg[3]);
        process.exit()
    }

    // console.log("validation passed', arg);
    return true;
}

const processArg = (arg) => {
    if (arg[0] === 'PLACE') {
        // First, validate given argument
        let validate = validateArg(arg);
        if (validate) {
            placeCmd(arg);
        }
    } else {
        console.log('Please place bot position, by entering command <PLACE X Y FACE>');
        process.exit()
    }
}

// ---------------------------------------------------------------------------------------------------------
const run = () => {
    // get first PLACE argument
    let arrArg = process.argv;
    arrArg.splice(0, 2);
    processArg(arrArg);
};

run();
