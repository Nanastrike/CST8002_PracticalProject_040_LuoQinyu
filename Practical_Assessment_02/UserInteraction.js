/*
 * Reference:
 * Source: https://www.w3schools.com/nodejs/nodejs_readline.asp
 * Description: Adapted from w3schools solution to work with my files
 * Date: 2025-09-13
 */
const FileOperation = require('./FileOperation');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

//display the menu and collect the answers
async function displayMenu() {
    while (true) {
        console.log('\n=================================');
        console.log('Author: Qinyu Luo');
        console.log('=================================');
        console.log('1. Read a file');
        console.log('2. Write a file');
        console.log('3. Exit');
        console.log('=================================');
        try {
            const choice = await askQuestion('Please enter your choice:');
            //react based on user's input
            switch (choice.trim()) {
                case '1':
                    const chosenFileName = await askQuestion('Please enter your file name: ');
                    //if the file name is null, display the menu again
                    if (!chosenFileName) {
                        console.log('This file does not exist, returning to the menu now...');
                    } else {
                        await readContent(chosenFileName);
                    }
                    break;
                case '2':
                    const fileName = await askQuestion('Please enter your file name:');
                    if (!fileName) {
                        //if the file does not exist
                        const answer1 = await askQuestion('This file does not exist, create a new file? (y/n)');
                        //if the user chooses not to create a new file, display the menu again
                        if (answer1 === 'n' || answer1 === 'N') {
                            console.log('returning to the menu now...');
                            //if the user chooses to create a new file, collect the file content
                        } else if (answer1 === 'y' || answer1 === 'Y') {
                            const fileContent = await askQuestion('Please enter your file content: ');
                            FileOperation.writeContent(fileName, fileContent);
                        } else {
                            //if the user inputs a random answer
                            console.log('Please enter a valid input, returning to the menu now...')
                        }
                    } else {
                        //if the file already exists
                        const answer2 = await askQuestion('This file already exists, do you want to overwrite it? (y/n)');
                        if (answer2 === 'y' || answer2 === 'Y') {
                            //if user wanna overwrite the file
                            const fileContent = await askQuestion('Please enter your file content: ');
                            FileOperation.writeContent(fileName, fileContent);
                        } else if (answer2 === 'n' || answer2 === 'N') {
                            //if user chooses not to overwrite it
                            console.log('Returning to the menu now...')
                        } else {
                            console.log('Please enter a valid input, returning to the menu now...')
                        }
                    }
                    break;
                case '3':
                    console.log('Program Exited.');
                    return;
                default:
                    console.log('Invalid choice. Please enter 1, 2, or 3.');
            }
        } catch (error) {
            console.error('Error', error)
        }


    }
}

module.exports = { displayMenu, askQuestion };
