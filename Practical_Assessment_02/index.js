/*
 * Reference:
 * Source: https://www.w3schools.com/nodejs/nodejs_readline.asp
 * Description: Adapted from w3schools solution to work with my files
 * Date: 2025-09-13
 */
const FileOperation = require('./fileOperation');
const Ask = require('./ask')


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
            const choice = await Ask.askQuestion('Please enter your choice:');
            //react based on user's input
            switch (choice.trim()) {
                case '1':
                    const chosenFileName = await Ask.askQuestion('Please enter your file name: ');
                    await FileOperation.readContent(chosenFileName);
                    break;
                case '2':
                    const fileName = await Ask.askQuestion('Please enter your file name:');
                    await FileOperation.writeContent(fileName);
                    break;
                case '3':
                    console.log('Program Exited.');
                    Ask.rl.close(); 
                    return false;
                default:
                    console.log('Invalid choice. Please enter 1, 2, or 3.');
                    break;
            }
        } catch (error) {
            console.error('Error', error)
        }
    }
}


/**main process**/
displayMenu();
