/*
 * Reference:
 * Source: https://www.w3schools.com/nodejs/nodejs_readline.asp
 * Description: Adapted from w3schools solution to accept users input
 * Date: 2025-09-13
 */

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

module.exports = { askQuestion, rl };