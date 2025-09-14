

const FileOperation = require('./FileOperation');
const UserInteraction = require('./UserInteraction');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**main process**/
UserInteraction.displayMenu();


