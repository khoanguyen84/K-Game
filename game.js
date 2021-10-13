const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const oparator = ['+', 'x'];
let operands = [];
let results = [];
let game = [];
let number_min = 1;
let number_max = 9;
let oparator_min = 1;
let oparator_max = 2;
let size = 8;
let aHalf = size * size / 2;
let game_matrix = [];
let select = 1;
let process = [];
var message = '';

class Position {
    constructor(x, y, value) {
        this.x = x,
            this.y = y,
            this.value = value;
    }
}

function ramdonOperand() {
    let number1 = number[ramdom(number_min, number_max) - 1];
    let number2 = number[ramdom(number_min, number_max) - 1];
    let operand = oparator[ramdom(oparator_min, oparator_max) - 1];
    operands.push(`${number1}${operand}${number2}`);
    results.push(cals(number1, number2, operand));
}

function ramdom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + 1);
}

function cals(n1, n2, operand) {
    let result = 0;
    switch (operand) {
        case oparator[0]: {
            result = n1 + n2;
            break;
        }
        case oparator[1]: {
            result = n1 * n2;
            break;
        }
    }
    return result;
}

function initGame() {
    for (let i = 0; i < size; i++) {
        game_matrix[i] = new Array(size).fill(0);
    }
}

function buildGame() {
    let row = 0;
    let col = 0;
    let count = 0;

    while (hasEmptyValue()) {
        row = ramdom(1, size) - 1;
        col = ramdom(1, size) - 1;

        if (hasNoValue(row, col)) {
            if (count < aHalf) {
                game_matrix[row][col] = operands[count];
            }
            else {
                game_matrix[row][col] = results[count - aHalf];
            }
            count++;
        }
    }
}

function drawGame() {
    // let game_str = '<table>';
    let game_str = '';
    for (let i = 0; i < size; i++) {
        game_str += '<tr>';
        for (let j = 0; j < size; j++) {
            game_str += `<td id='td_${i}_${j}' class='${game_matrix[i][j] == 0 ? 'done' : ''} ' onclick=play(${i},${j})>
                            ${game_matrix[i][j] != 0 ? game_matrix[i][j] : ''}
                        </td>`;
        }
        game_str += '</tr>';
    }
    // game_str += '</table>';
    // document.getElementsByClassName('game-area')[0].innerHTML = game_str;
    document.getElementById('tbData').innerHTML = game_str;
}
function hasEmptyValue() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (game_matrix[i][j] == 0)
                return true;
        }
    }
    return false;
}

function hasNoValue(row, col) {
    return game_matrix[row][col] == 0;
}
function play(i, j) {

    if (select == 1) {
        document.getElementById(`td_${i}_${j}`).classList.add('selected');
        process.push(new Position(i, j, game_matrix[i][j]));
        select++;
    }
    else {
        document.getElementById(`td_${i}_${j}`).classList.add('selected');
        process.push(new Position(i, j, game_matrix[i][j]));
        if (isCorrect()) {
            select = 1;
            let pos1 = process[0];
            let pos2 = process[1];
            game_matrix[pos1.x][pos1.y] = 0;
            game_matrix[pos2.x][pos2.y] = 0;
            drawGame();
            process = [];
        }
        else {
            process.pop();
            message = 'not match!';
        }
        showMessage(message);
        autoCloseMessage();
    }
    if (isComplete()) {
        showMessage('Congratulation!');
    }

}

function isCorrect() {
    let statement;
    let result;
    if (Number.isInteger(process[0].value)) {
        statement = process[1].value;
        result = process[0].value;
    }
    else {
        statement = process[0].value;
        result = process[1].value;
    }
    message = `${statement}=${result}`;
    statement = statement.replace('x', '*');
    return eval(statement) == result;
}

function showMessage(msg) {
    document.getElementById('message').classList.remove('d-none');
    document.getElementById('message').innerText = msg;
}

function autoCloseMessage() {
    setTimeout(() => {
        document.getElementById('message').classList.add('d-none');
    }, 1 * 1000);
}

function isComplete() {
    let complete = true;
    game_matrix.forEach(function (arr, index) {
        arr.forEach(function (value, index) {
            if (value != 0) {
                complete = false;
            }
        })
    });
    return complete;
}

function main() {
    for (let i = 0; i < aHalf; i++) {
        ramdonOperand();
    }
    buildGame();
    drawGame();
}

function start() {
    document.getElementsByClassName('start-game')[0].classList.add('d-none');
    initGame();
    main();
}